import { useLayout } from "@/hooks/useLayout";

export type NavbarProps = {
    className?: string;
}

export function Navbar ({ className }: NavbarProps)
{
    const { layout } = useLayout();

    return <nav className={`flex justify-between max-w-full h-14 ${className}`}>
        {layout.search && <div className="flex items-center rounded-xl bg-neutral-800 px-6">
            <i className="ri-search-line text-lg mr-3"></i>
            <input
                className="bg-transparent w-96 py-3 outline-none"
                placeholder="Search for transaction, item, etc"
                type="text"
            />
        </div>}

        <div className="flex gap-2">
            {layout.wallet && <div className="h-14 px-6 flex items-center bg-neutral-800 rounded-xl">
                <i className="ri-wallet-line text-lg mr-2 text-neutral-400"></i>
                <span className="font-semibold text-neutral-400">9.994 ETH</span>
            </div>}
            {layout.notifications && <button className="h-14 w-14 bg-neutral-800 hover:bg-neutral-700 rounded-xl transition">
                <i className="ri-notification-3-line text-lg"></i>
            </button>}
            {layout.messages && <button className="h-14 w-14 bg-neutral-800 hover:bg-neutral-700 rounded-xl transition">
                <i className="ri-message-3-line text-lg"></i>
            </button>}
            {layout.profile && <button className="px-6 py-3 h-14 bg-neutral-800 hover:bg-neutral-700 rounded-xl transition">
                ChainMasterTR
            </button>}
        </div>
    </nav>
}