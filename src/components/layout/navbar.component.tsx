import { useLayout } from '@/hooks/useLayout';

export type NavbarProps = {
  className?: string;
};

export function Navbar({ className }: NavbarProps) {
  const { layout } = useLayout();

  return (
    <nav className={`flex h-14 max-w-full justify-between ${className}`}>
      {layout.search && (
        <div className="backdrop-filter-xl flex items-center rounded-xl border border-violet-500/10 bg-neutral-900/10 px-4 lg:px-6">
          <i className="ri-search-line mr-3 text-lg"></i>
          <input
            className="w-44 bg-transparent py-3 outline-none lg:w-96"
            placeholder="Search for transaction, item, etc"
            type="text"
          />
        </div>
      )}

      <div className="flex gap-2 ml-auto">
        {layout.wallet && (
          <div className="backdrop-filter-xl flex h-14 items-center rounded-xl border border-violet-500/10 bg-neutral-900/10 px-4 lg:px-6">
            <i className="ri-wallet-line mr-2 text-lg text-neutral-400"></i>
            <span className="font-semibold text-neutral-400">9.994 ETH</span>
          </div>
        )}
        {layout.notifications && (
          <button className="backdrop-filter-xl h-14 w-14 rounded-xl border border-violet-500/10 bg-neutral-900/10 transition">
            <i className="ri-notification-3-line text-lg"></i>
          </button>
        )}
        {layout.messages && (
          <button className="backdrop-filter-xl h-14 w-14 rounded-xl border border-violet-500/10 bg-neutral-900/10 transition">
            <i className="ri-message-3-line text-lg"></i>
          </button>
        )}
        {layout.profile && (
          <button className="backdrop-filter-xl hidden h-14 rounded-xl border border-violet-500/10 bg-neutral-900/10 px-6 py-3 transition lg:block">
            ChainMasterTR
          </button>
        )}
      </div>
    </nav>
  );
}
