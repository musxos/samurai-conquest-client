import Image from "next/image";

export function AgentCard ({ index })
{
    return <div className="relative flex flex-col px-6 py-4 bg-neutral-800 rounded-2xl group hover:bg-neutral-700/80 transition">
        <img loading="lazy" className="rounded-2xl" src={`/${index}.png`} alt="" />
        <div className="flex items-center justify-between mt-4">
            <h3 className="font-medium font-inter text-neutral-200">Green Eyes Samurai</h3>
            <span className="text-sm text-neutral-400 font-light">#01</span>
        </div>

        <div className="flex flex-col gap-4 mt-4">
            <div className="flex flex-col">
                <span className="flex items-center text-red-500 mb-1"
                ><i className="ri-sword-fill mr-1"></i> <span className="text-sm">32</span></span>
                <div className="h-2 rounded-full bg-neutral-700">
                    <div className="h-2 rounded-full bg-red-500 stats" style={{ maxWidth: "72%" }}></div>
                </div>
            </div>
            <div className="flex flex-col">
                <span className="flex items-center text-blue-500 mb-1"
                ><i className="ri-shield-fill mr-1"></i> <span className="text-sm">55</span></span>
                <div className="h-2 rounded-full bg-neutral-700">
                    <div className="h-2 rounded-full bg-blue-500 stats" style={{ maxWidth: "72%" }}></div>
                </div>
            </div>
            <div className="flex flex-col">
                <span className="flex items-center text-yellow-500 mb-1"
                ><i className="ri-sword-fill mr-1"></i> <span className="text-sm">72</span></span>
                <div className="h-2 rounded-full bg-neutral-700">
                    <div className="h-2 rounded-full bg-yellow-500 stats" style={{ maxWidth: "72%" }}></div>
                </div>
            </div >
            <div className="flex flex-col">
                <span className="flex items-center text-green-500 mb-1"
                ><i className="ri-sword-fill mr-1"></i> <span className="text-sm">72</span></span>
                <div className="h-2 rounded-full bg-neutral-700">
                    <div className="h-2 rounded-full bg-green-500 stats" style={{ maxWidth: "72%" }}></div>
                </div>
            </div>
        </div >

        <div className="flex justify-between mt-4">
            <div className="flex flex-col">
                <span className="text-neutral-500 group-hover:text-violet-500">Current Bid</span>
                <span className="text-neutral-300 font-semibold">5.54 Eth</span>
            </div>
            <div className="flex flex-col">
                <span className="text-neutral-500 group-hover:text-violet-500">Ending In</span>
                <span className="text-neutral-300 font-semibold">08h 11m</span>
            </div>
        </div>

        <div className="flex items-center justify-between mt-6">
            <div className="cursor-pointer">
                <i className="ri-heart-3-line text-2xl text-red-500"></i>
            </div>

            <button className="ml-auto px-6 py-2 bg-violet-500 hover:bg-violet-600 rounded-xl">Buy Now</button>
        </div>
    </div >
}