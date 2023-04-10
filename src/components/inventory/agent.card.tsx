import classNames from "classnames"

export type AgentCardProps = {
    image: string
    name: string
    number: number
    assign: boolean
    onClick?: () => void
}

export function AgentCard ({ image, name, number, assign, onClick }: AgentCardProps)
{
    const style = classNames("relative flex flex-col px-6 py-4 bg-neutral-900/20 backdrop-blur-xl border border-violet-500/10 rounded-2xl group hover:bg-neutral-800/80 transition cursor-pointer", {
        "bg-violet-800": assign,
        "bg-neutral-800": !assign,
    })

    return <div
        onClick={onClick}
        className={style}
    >
        <img className="rounded-2xl" src={image} alt="" />
        <div className="flex items-center justify-between mt-4">
            <h3 className="font-medium font-inter text-neutral-200">{name}</h3>
            <span className="text-sm text-neutral-400 font-light">#{number}</span>
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
                    <div className="h-2 rounded-full bg-blue-500 stats" style={{ maxWidth: "55%" }}></div>
                </div>
            </div>
            <div className="flex flex-col">
                <span className="flex items-center text-yellow-500 mb-1"
                ><i className="ri-sword-fill mr-1"></i> <span className="text-sm">72</span></span>
                <div className="h-2 rounded-full bg-neutral-700">
                    <div className="h-2 rounded-full bg-yellow-500 stats" style={{ maxWidth: "72%" }}></div>
                </div>
            </div>
            <div className="flex flex-col">
                <span className="flex items-center text-green-500 mb-1"
                ><i className="ri-sword-fill mr-1"></i> <span className="text-sm">72</span></span>
                <div className="h-2 rounded-full bg-neutral-700">
                    <div className="h-2 rounded-full bg-green-500 stats" style={{ maxWidth: "72%" }}></div>
                </div>
            </div>
        </div>
    </div>

}