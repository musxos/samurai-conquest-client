import { AgentCard } from '@/components/inventory/agent.card';
import { useLayout } from '@/hooks/useLayout';
import useOutsideAlerter from '@/hooks/useOutsideAlerter';
import { DefaultLayout } from '@/layouts/default.layout';
import { useEffect, useRef, useState } from 'react';
import OutsideClickHandler from 'react-outside-click-handler';

type InventoryItem = {
  number: number;
  name: string;
  image: string;
  assign: boolean;
};

export default function Inventory ()
{
  const [ inventory, setInventory ] = useState(
    new Array(30).fill(0).map((_, i) =>
    {
      return {
        number: i + 1,
        name: 'Green Eyes Samurai',
        image: `/${i + 1}.png`,
        assign: false,
      };
    }),
  );

  const modal = useRef(null);

  const [ active, setActive ] = useState<InventoryItem | null>(null);

  const outsideClick = () =>
  {
    if (active)
    {
      setActive(null);
    }
  };

  useOutsideAlerter(modal, outsideClick);

  const show = (index: number) =>
  {
    setActive(inventory[ index ]);
  };

  const assign = () =>
  {
    setActive({ ...active, assign: true });
  };

  const unassign = () =>
  {
    setActive({ ...active, assign: false });
  };

  const { update: updateLayout } = useLayout();

  useEffect(() =>
  {
    updateLayout({
      messages: true,
      notifications: true,
      profile: true,
      wallet: true,
      search: true,
    });
  }, []);

  return (
    <div className="mt-24 flex h-full flex-col gap-x-12 px-8 py-12 lg:flex-row">
      <div className='flex flex-col w-full lg:w-2/3'>
        <div className="inventory-left-in">
          <h1 className="text-2xl font-semibold text-white">Inventory</h1>
          <p className="mt-2 w-full text-sm text-neutral-300 lg:w-2/3">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Nam quaerat
            dolore veniam maxime laudantium modi quos debitis commodi architecto
            inventore distinctio esse itaque nostrum tempora, deserunt, sed
            possimus? Cumque, mollitia.
          </p>
        </div>
        
        <div className="inventory-left-in">
          <h1 className="text-2xl font-semibold text-white">Inventory</h1>
          <p className="mt-2 w-full text-sm text-neutral-300 lg:w-2/3">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Nam quaerat
            dolore veniam maxime laudantium modi quos debitis commodi architecto
            inventore distinctio esse itaque nostrum tempora, deserunt, sed
            possimus? Cumque, mollitia.
          </p>

          <div className="mt-16 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {inventory.map((item, i) => (
              <AgentCard
                assign={item.assign}
                image={item.image}
                name={item.name}
                number={item.number}
                onClick={() => show(i)}
                key={i}
              ></AgentCard>
            ))}
          </div>
        </div>
      </div>
      <div
        className={`fixed right-0 top-0 h-full w-2/3 lg:sticky lg:w-1/3 ${active ? 'pointer-events-auto' : 'pointer-events-none'
          }`}
        ref={modal}
      >
        {active && (
          <div className="inventory-right-in h-full border-l border-violet-500/50 bg-neutral-950/50 px-6 py-4 text-white backdrop-blur-3xl lg:border-none lg:bg-transparent">
            {active && (
              <div className="flex flex-col lg:sticky lg:top-5">
                <img className="rounded-2xl" src={active.image} alt="" />
                <div className="flex items-end justify-between">
                  <h1 className="mt-8 text-2xl">{active.name}</h1>
                  <span className="text-sm">#{active.number}</span>
                </div>
                <p className="mt-2 text-sm text-neutral-400">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum
                  quam deserunt, soluta delectus veritatis impedit animi. Ad
                  maiores veritatis, quo, laudantium beatae et minus quaerat
                  aperiam ipsum numquam fuga reprehenderit?
                </p>

                {!active.assign && (
                  <button
                    onClick={() => assign()}
                    className="ml-auto mt-24 rounded-full bg-violet-500 px-8 py-3"
                  >
                    Assign
                  </button>
                )}
                {active.assign && (
                  <button
                    onClick={() => unassign()}
                    className="ml-auto mt-24 rounded-full bg-violet-500 px-8 py-3"
                  >
                    Unassign
                  </button>
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

Inventory.getLayout = (page: JSX.Element) =>
{
  return <DefaultLayout>{page}</DefaultLayout>;
};
