import { DefaultLayout } from "@/layouts/default.layout";

export default function Vote ()
{
    return <div className="mx-auto mb-8 mt-32 flex max-w-screen-2xl flex-col items-center px-8">
        <div className="grid grid-cols-6 gap-4 w-full">
            <div className="flex flex-col col-span-4 rounded-md bg-neutral-950/50 backdrop-blur-2xl px-6 py-8">
                <div className="flex justify-between items-start">
                    <div className="flex items-center">
                        <div className="w-8 h-8 rounded bg-violet-950/50 mr-4">
                        </div>

                        <span className="text-xl">Samurai Conquest</span>
                    </div>
                    <div className="flex items-center text-sm gap-4">
                        <button className="flex items-center text-sm">
                            <i className="ri-heart-line text-2xl text-white/50 mr-1"></i>
                            <span className="font-medium">MNGO stats</span>
                        </button>
                        <button className="flex items-center text-sm">
                            <i className="ri-vip-diamond-fill text-2xl text-blue-400 mr-1"></i>
                            <span className="font-medium">5.000</span>
                        </button>
                    </div>
                </div>
                <div className="flex flex-col">
                    <div className="h-96 mt-12 w-full">
                        <img src="https://media.discordapp.net/attachments/1097614586724765806/1097712113134358609/debb3221-7bc4-471b-8df2-0671285fb344.jpg" alt="Samurai Conquest" className="w-full h-full object-cover rounded-md" />
                    </div>
                </div>
                <div className="flex flex-col mt-12 w-full">
                    <div className="flex items-center gap-2 w-full">
                        <div className="flex border border-white/20 rounded h-full w-full">
                            <i className="ri-search-line text-2xl text-white/50 p-2"></i>
                            <input placeholder="Search Proposals..." className="h-full grow bg-transparent outline-none" type="text" />
                        </div>
                        <div className="flex items-center gap-x-2 h-full">
                            <button className="border rounded border-white/20 h-full px-5 text-sm">
                                Filter
                            </button>
                            <button className="border border-white/20 rounded h-full px-5 text-sm">
                                Sorting
                            </button>
                        </div>
                    </div>
                </div>
                <div className="mt-6 w-full">
                    <div className="flex justify-between">
                        <div className="text-sm text-neutral-100/50">
                            344 Proposals
                        </div>
                        <div className="flex items-center">
                            <button className="flex gap-2 items-center">
                                <div className="flex items-center justify-center w-6 h-6 border border-green-500/50 rounded-full">
                                    <i className="ri-add-line text-green-500/50"></i>
                                </div>
                                <span className="text-green-500/50">New Proposal</span>
                            </button>
                        </div>
                    </div>
                    <div className="flex flex-col gap-y-4 w-full mt-4">
                        <div className="border border-white/20 rounded-xl">
                            <div className="flex items-center justify-between px-4 py-4">
                                <div>
                                    <h1 className="font-semibold text-lg mb-1">Upgrade SC game to v18.0.0</h1>
                                    <p className="text-white/50 text-sm">Voting contiune</p>
                                </div>
                            </div>

                            <hr className="border-white/20" />

                            <div className="grid grid-cols-1 gap-8 px-4 py-4">
                                <div className="relative flex flex-col w-full">
                                    <div className="flex justify-between w-full">
                                        <div className="flex flex-col">
                                            <h2>Yes Votes</h2>
                                            <p className="text-sm mt-1"><b>140,906,921</b> <span className="text-xs text-gray-100/50">100.0%</span></p>
                                        </div>
                                        <div className="flex flex-col">
                                            <h2>No Votes</h2>
                                            <p className="text-sm mt-1"><b>0</b> <span className="text-xs text-gray-100/50">0.0%</span></p>
                                        </div>
                                    </div>
                                    <div className="relative mt-2 rounded-full bg-cyan-500 h-2 w-full">
                                        <div className="absolute top-0 left-0 bg-cyan-500 rounded-full z-20 h-2 w-1/2"></div>
                                        <div className="absolute top-0 right-0 h-2 w-full bg-white rounded-full z-10"> </div>
                                    </div>
                                    <div className="flex items-center gap-2 mt-6">
                                        <button>
                                            <i className="ri-thumb-up-line text-xl text-white/50 mr-2"></i>
                                        </button>
                                        <button>
                                            <i className="ri-thumb-down-line text-xl text-white/50"></i>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="col-span-2 flex flex-col gap-4">
                <div className="rounded-md bg-neutral-950/50 backdrop-blur-2xl px-6 py-6">
                    <div className="flex items-center">
                        <h1 className="text-lg font-medium">My governance power</h1>
                        <span className="flex items-center ml-auto text-white/50">
                            View
                            <i className="ri-arrow-right-s-line text-sm ml-1 text-white/50"></i>
                        </span>
                    </div>

                    <p className="mt-8 text-white/50 text-sm">Connect your wallet to see governance power</p>
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
    </div >
}

Vote.getLayout = function getLayout (page)
{
    return <DefaultLayout>{page}</DefaultLayout>;
};
