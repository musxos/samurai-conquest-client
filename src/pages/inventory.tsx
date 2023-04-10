import { AgentCard } from '@/components/inventory/agent.card';
import { useLayout } from '@/hooks/useLayout';
import { DefaultLayout } from '@/layouts/default.layout';
import { useEffect, useState } from 'react';

type InventoryItem = {
  number: number;
  name: string;
  image: string;
  assign: boolean;
};

export default function Inventory() {
  const [inventory, setInventory] = useState(
    new Array(30).fill(0).map((_, i) => {
      return {
        number: i + 1,
        name: 'Green Eyes Samurai',
        image: `/${i + 1}.png`,
        assign: false,
      };
    }),
  );

  const [active, setActive] = useState<InventoryItem | null>(null);

  const show = (index: number) => {
    setActive(inventory[index]);
  };

  const assign = () => {
    setActive({ ...active, assign: true });
  };

  const unassign = () => {
    setActive({ ...active, assign: false });
  };

  const { update: updateLayout } = useLayout();

  useEffect(() => {
    updateLayout({
      messages: true,
      notifications: true,
      profile: true,
      wallet: true,
      search: true,
    });
  }, []);

  return (
    <div className="h-full gap-x-12 flex px-8 py-12 mt-24">
      <div className="w-2/3 inventory-left-in">
        <h1 className="text-2xl font-semibold text-white">Inventory</h1>
        <p className="w-2/3 text-neutral-300 text-sm mt-2">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Nam quaerat
          dolore veniam maxime laudantium modi quos debitis commodi architecto
          inventore distinctio esse itaque nostrum tempora, deserunt, sed
          possimus? Cumque, mollitia.
        </p>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-16">
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
      <div className="w-1/3 text-white inventory-right-in">
        {active && (
          <div className="sticky top-5 flex flex-col">
            <img className="rounded-2xl" src={active.image} alt="" />
            <div className="flex items-end justify-between">
              <h1 className="mt-8 text-2xl">{active.name}</h1>
              <span className="text-sm">#{active.number}</span>
            </div>
            <p className="mt-2 text-sm text-neutral-400">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum
              quam deserunt, soluta delectus veritatis impedit animi. Ad maiores
              veritatis, quo, laudantium beatae et minus quaerat aperiam ipsum
              numquam fuga reprehenderit?
            </p>

            {!active.assign && (
              <button
                onClick={() => assign()}
                className="bg-violet-500 px-8 py-3 rounded-full ml-auto mt-24"
              >
                Assign
              </button>
            )}
            {active.assign && (
              <button
                onClick={() => unassign()}
                className="bg-violet-500 px-8 py-3 rounded-full ml-auto mt-24"
              >
                Unassign
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

Inventory.getLayout = (page: JSX.Element) => {
  return <DefaultLayout>{page}</DefaultLayout>;
};
