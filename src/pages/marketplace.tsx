import { AgentCard } from "@/components/marketplace/agent.card"
import { DefaultLayout } from "@/layouts/default.layout"

export default function Marketplace ()
{
    return (<div className="px-8 py-6 text-white">
        <div className="flex flex-col mt-24">
            <h1 className="font-inter text-2xl font-semibold marketplace-animate-left">Top Collection</h1>
            <div className="flex items-center justify-between mt-6">
                <div className="flex gap-4 marketplace-animate-left">
                    <button className="px-5 py-3 h-12 min-w-[6rem] rounded-full bg-violet-500 font-inter">
                        Female
                    </button>
                    <button
                        className="px-5 py-3 h-12 min-w-[6rem] rounded-full bg-neutral-800 hover:bg-violet-500 font-medium transition font-inter"
                    >
                        Male
                    </button>
                    <button
                        className="px-5 py-3 h-12 min-w-[6rem] rounded-full bg-neutral-800 hover:bg-violet-500 font-medium transition font-inter"
                    >
                        Super Hero
                    </button>
                    <button
                        className="px-5 py-3 h-12 min-w-[6rem] rounded-full bg-neutral-800 hover:bg-violet-500 font-medium transition font-inter"
                    >
                        Legendary
                    </button>
                </div>
                <button
                    className="marketplace-animate-right px-6 py-3 h-12 min-w-[6rem] rounded-full bg-neutral-800 hover:bg-violet-500 font-medium transition font-inter"
                >
                    View All
                </button>
            </div>

            <div className="grid sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-5 gap-5 mt-12 marketplace-fade-in">
                {new Array(99).fill(0).map((_, i) => <AgentCard index={i + 1} key={i}></AgentCard>)}
            </div>
        </div>
    </div>)
}

Marketplace.getLayout = (page: JSX.Element) =>
{
    return <DefaultLayout>{page}</DefaultLayout>
}
