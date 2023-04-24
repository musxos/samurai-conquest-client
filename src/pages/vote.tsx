import useSubmitProposalCommand from "@/features/commands/submit-proposal";
import useVoteCommand from "@/features/commands/vote.command";
import useAPI from "@/hooks/useAPI";
import { DefaultLayout } from "@/layouts/default.layout";
import { BigNumber } from "alchemy-sdk";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { useAccount } from "wagmi";

function ProposalCard({ title, status, voters, description, id }) {
    const account = useAccount();
    const voteCommand = useVoteCommand();

    const sendVote = async (payload) => {
        const result = await voteCommand.writeAsync?.({
            recklesslySetUnpreparedArgs: [
                payload.id,
                payload.vote
            ]
        });

        await result.wait();

        Swal.fire({
            title: 'Success',
            text: 'Your vote has been submitted',
            icon: 'success',
        });
    }

    const prepareHandleVote = async (e, _vote) => {
        e.preventDefault();

        if (!account.isConnected) {
            Swal.fire({
                title: 'Error',
                text: 'You need to connect your wallet first',
                icon: 'error',
            });

            return;
        }

        const payload = {
            id: BigNumber.from(id),
            vote: _vote
        };

        if (!voteCommand.writeAsync) {
            await voteCommand.refetch();
        }

        sendVote(payload);
    }


    return <div className="border border-white/20 rounded-xl">
        <div className="flex items-center justify-between px-4 py-4">
            <div>
                <h1 className="font-semibold text-lg mb-1">{title}</h1>
                <p className="my-2 text-sm text-white/80">{description}</p>
                <p className="text-white/50 text-sm">{status ? 'Voting Contiune' : 'Vote ended'}</p>
            </div>
        </div>

        <hr className="border-white/20" />

        <div className="grid grid-cols-1 gap-8 px-4 py-4">
            <div className="relative flex flex-col w-full">
                <div className="flex justify-between w-full">
                    <div className="flex flex-col">
                        <h2>Yes Votes</h2>
                        <p className="text-sm mt-1"><b>{voters.filter(x => x.vote).length}</b> <span className="text-xs text-gray-100/50">{voters.filter(x => x.vote).length / voters.length * 100}%</span></p>
                    </div>
                    <div className="flex flex-col">
                        <h2>No Votes</h2>
                        <p className="text-sm mt-1"><b>{voters.filter(x => !x.vote).length}</b> <span className="text-xs text-gray-100/50">{voters.filter(x => !x.vote).length / voters.length * 100}%</span></p>
                    </div>
                </div>
                <div className="relative mt-2 rounded-full bg-cyan-500 h-2 w-full">
                    <div style={{
                        width: `${voters.filter(x => x.vote).length / voters.length * 100}%`
                    }} className="absolute top-0 left-0 bg-cyan-500 rounded-full z-20 h-2"></div>
                    <div className="absolute top-0 right-0 h-2 w-full bg-white rounded-full z-10"> </div>
                </div>
                <div className="flex items-center gap-2 mt-6">
                    <button onClick={(e) => prepareHandleVote(e, true)}>
                        <i className="ri-thumb-up-line text-xl text-white/50 mr-2"></i>
                    </button>
                    <button onClick={(e) => prepareHandleVote(e, false)}>
                        <i className="ri-thumb-down-line text-xl text-white/50"></i>
                    </button>
                </div>
            </div>
        </div>
    </div>;
}

export default function Vote() {
    const account = useAccount({
        onConnect: () => {
            getProposals();
            getSize();
        }
    });
    const { proposal, alchemy } = useAPI();
    const [proposals, setProposals] = useState<any[]>([]);
    const [modal, setModal] = useState({
        active: false,
        title: '',
        description: '',
    });

    const [size, setSize] = useState(0);

    useEffect(() => {
        getSize();
    }, [])

    const getSize = async () => {
        if (!account.isConnected) {
            return;
        }

        const result: any = await alchemy.getNftsForOwner(account.address);

        if (!result) {
            return;
        }

        setSize(result.totalCount);
    }

    const submitProposalCommand = useSubmitProposalCommand();

    const handleModal = (e, payload: any) => {
        e.preventDefault();

        setModal({
            ...modal,
            ...payload
        })
    }

    const sendProposal = async () => {
        if (modal.title.length < 3) {
            return Swal.fire({

                title: 'Error',
                text: 'Title must be at least 3 characters',
                icon: 'error',
            });
        }

        if (modal.description.length < 3) {
            return Swal.fire({
                title: 'Error',
                text: 'Description must be at least 3 characters',
                icon: 'error',
            });
        }

        if (!submitProposalCommand.writeAsync) {
            const result = await submitProposalCommand.refetch();

            if (result.isError) {
                return Swal.fire({
                    title: 'Error',
                    text: 'Something went wrong',
                    icon: 'error',
                });
            }
        }

        console.log(modal);

        const result = await submitProposalCommand.writeAsync?.({
            recklesslySetUnpreparedArgs: [
                modal.title,
                modal.description
            ]
        });

        await result.wait();

        Swal.fire({
            title: 'Success',
            text: 'Your proposal has been submitted',
            icon: 'success',
        });
    }

    useEffect(() => {
        getProposals();
    }, []);

    const getProposals = async () => {
        const data = await proposal.getProposals();
        data.sort((a, b) => b.id - a.id);
        setProposals(data);
    }

    return <div className="mx-auto mb-8 mt-32 flex max-w-screen-2xl flex-col items-center px-8">
        <div className="grid grid-cols-6 gap-4 w-full">
            <div className="flex flex-col col-span-4 rounded-md bg-neutral-950/50 backdrop-blur-2xl px-6 py-8">
                <div className="flex justify-between items-start">
                    <div className="flex items-center">
                        <div className="w-8 h-8 rounded bg-violet-950/50 mr-4">
                        </div>

                        <span className="text-xl">Samurai Conquest</span>
                    </div>
                </div>
                <div className="flex flex-col">
                    <div className="h-96 mt-12 w-full">
                        <img src="https://media.discordapp.net/attachments/1097614586724765806/1097712113134358609/debb3221-7bc4-471b-8df2-0671285fb344.jpg" alt="Samurai Conquest" className="w-full h-full object-cover rounded-md" />
                    </div>
                </div>
                <div className="mt-6 w-full">
                    <div className="flex justify-between">
                        <div className="text-sm text-neutral-100/50">
                            {proposals.length} Proposals
                        </div>
                        <div className="flex items-center">
                            <button className="flex gap-2 items-center">
                                <div className="flex items-center justify-center w-6 h-6 border border-green-500/50 rounded-full">
                                    <i className="ri-add-line text-green-500/50"></i>
                                </div>
                                <span onClick={(e) => handleModal(e, { active: true })} className="text-green-500/50">New Proposal</span>
                            </button>
                        </div>
                    </div>
                    <div className="flex flex-col gap-y-4 w-full mt-4">
                        {proposals.map((x, i) => (<ProposalCard id={x.id} title={x.title_} description={x.proposal} status={x.status} voters={x.voters} key={i}></ProposalCard>))}
                    </div>
                </div>
            </div>
            <div className="col-span-2 flex flex-col gap-4">
                <div className="rounded-md bg-neutral-950/50 backdrop-blur-2xl px-6 py-6">
                    <div className="flex items-center">
                        <h1 className="text-lg font-medium">My governance power</h1>
                        <a href={`https://mumbai.polygonscan.com/address/${account.address}`} className="flex items-center ml-auto text-white/50">
                            View On Mumbaiscan
                            <i className="ri-arrow-right-s-line text-sm ml-1 text-white/50"></i>
                        </a>
                    </div>
                    <p className="mt-8 text-white/50 text-sm">
                        Your NFTs = <span className="text-lg">{size}</span>
                    </p>
                </div>
                <div className="rounded-md bg-neutral-950/50 backdrop-blur-2xl px-6 py-6">
                    <div className="flex items-center">
                        <h1 className="text-lg font-medium">DAO Wallets & Assets</h1>
                        <span className="flex items-center ml-auto text-white/50">
                            View
                            <i className="ri-arrow-right-s-line text-sm ml-1 text-white/50"></i>
                        </span>
                    </div>
                    <div className="flex flex-col w-full rounded-lg bg-neutral-950 mt-6 px-4 py-3">
                        <h3>Treasury Balance</h3>
                        <span className="text-2xl mt-1">$96,433,926</span>
                    </div>
                    <div className="flex flex-col gap-4 mt-6">
                        <div className="flex items-center p-4 rounded-lg border border-neutral-100/20">
                            <img className="w-9 h-9 object-contain" src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/05/Ethereum_logo_2014.svg/1257px-Ethereum_logo_2014.svg.png" />
                            <div className="flex flex-col">
                                <h3 className="text-sm">Ethereum</h3>
                                <span className="text-xs text-white/50">0.000000 ETH</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        {modal.active && <div className="min-h-screen h-full fixed right-0 top-0 bg-neutral-950/50 backdrop-blur-2xl max-w-screen-sm w-full">
            <div className="flex flex-col px-6 py-4">
                <h1 className="mt-4 text-2xl font-medium">New Proposal</h1>
                <div className="mt-6 w-full">
                    <input onChange={(e) => handleModal(e, { title: e.target.value })} value={modal.title} className="px-4 py-3 rounded-md bg-neutral-950 border border-white/50 w-full" placeholder="Title" type="text" />
                    <div className="mt-4">
                        <textarea onChange={(e) => handleModal(e, { description: e.target.value })} value={modal.description} placeholder="Proposal description..." className="px-4 py-3 rounded-md bg-neutral-950 border border-white/50 w-full"></textarea>
                    </div>
                </div>

                <div className="flex gap-4 ml-auto">
                    <button onClick={(e) => handleModal(e, { active: false })} className="bg-neutral-900/90 rounded-md text-white mt-12 px-6 py-3">Cancel</button>
                    <button onClick={sendProposal} className="bg-white rounded-md text-black mt-12 px-6 py-3">Submit</button>
                </div>
            </div>
        </div>}
    </div >
}

Vote.getLayout = function getLayout(page) {
    return <DefaultLayout>{page}</DefaultLayout>;
};
