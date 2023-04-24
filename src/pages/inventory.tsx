import { AgentCard } from '@/components/inventory/agent.card';
import { useLayout } from '@/hooks/useLayout';
import useOutsideAlerter from '@/layouts/useOutsideAlerter';
import { DefaultLayout } from '@/layouts/default.layout';
import { useEffect, useRef, useState } from 'react';

import HealthPotion from '../assets/health_potion.png';
import Image from 'next/image';
import { useAccount } from 'wagmi';
import useAPI from '@/hooks/useAPI';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

export default function Inventory() {
  const MySwal = withReactContent(Swal)

  const account = useAccount();
  const { alchemy } = useAPI();

  const [inventory, setInventory] = useState([]);

  const modal = useRef(null);

  const [active, setActive] = useState<any>(null);

  const outsideClick = () => {
    if (active) {
      setActive(null);
    }
  };

  useOutsideAlerter(modal, outsideClick);

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

    getInventory();
  }, []);

  async function getInventory() {
    const _inventory = await alchemy.getNftsForOwner(account.address);

    setInventory(_inventory.ownedNfts.filter(x => x.rawMetadata.attributes.some(x => x.trait_type != 'Agility' && x.value != 0)).map(x => ({
      tokenId: x.tokenId,
      title: x.title,
      name: x.rawMetadata.name,
      description: x.rawMetadata.description,
      attack: x.rawMetadata.attributes[0].value,
      defence: x.rawMetadata.attributes[1].value,
      chakra: x.rawMetadata.attributes[2].value,
      agility: x.rawMetadata.attributes[3].value,
    })));
  }

  const handleChangeNickname = async (e: any) => {
    e.preventDefault();

    MySwal.fire({
      title: 'Change nickname',
      input: 'text',
      inputAttributes: {
        autocapitalize: 'off'
      },
      showCancelButton: true,
      confirmButtonText: 'Change',
      showLoaderOnConfirm: true,
      preConfirm: (nickname) => {
        return true;
      },
      allowOutsideClick: () => !Swal.isLoading()
    }).then((result) => {
      MySwal.fire({
        title: 'Nickname changed!',
        icon: 'success',
        timer: 2000,
        showConfirmButton: false,
        timerProgressBar: true,
      })
    })
  }

  return (
    <div className="mt-24 flex h-full flex-col gap-x-12 px-8 py-12 lg:flex-row">
      <div className="flex w-full flex-col lg:w-2/3">
        <div className="inventory-left-in">
          <h1 className="text-2xl font-semibold text-white">Consumables</h1>
          <p className="mt-2 w-full text-sm text-neutral-300 lg:w-2/3">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Nam quaerat
            dolore veniam maxime laudantium modi quos debitis commodi architecto
            inventore distinctio esse itaque nostrum tempora, deserunt, sed
            possimus? Cumque, mollitia.
          </p>

          <div className="my-12 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
            <div className="relative h-40 w-40 rounded-md border border-violet-500/10 bg-neutral-950/30 backdrop-blur-3xl">
              <Image src={HealthPotion} alt="asd" />

              <div className="absolute right-3 top-3">+400</div>
            </div>
          </div>
        </div>

        <div className="inventory-left-in">
          <h1 className="text-2xl font-semibold text-white">Inventory</h1>
          <p className="mt-2 w-full text-sm text-neutral-300 lg:w-2/3">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Nam quaerat
            dolore veniam maxime laudantium modi quos debitis commodi architecto
            inventore distinctio esse itaque nostrum tempora, deserunt, sed
            possimus? Cumque, mollitia.
          </p>

          <div className="mt-12 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {inventory.map((item, i) => (
              <AgentCard
                image={'/art/' + item.tokenId + '.png'}
                id={item.tokenId}
                name={item.title}
                attack={item.attack}
                defence={item.defence}
                chakra={item.chakra}
                agility={item.agility}
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
                <Image
                  height={512}
                  width={512}
                  className="h-full w-full rounded-2xl"
                  src={'/art/' + active.tokenId + '.png'}
                  alt=""
                />
                <div className="flex items-end justify-between">
                  <h1 className="mt-8 text-2xl">{active.name}</h1>
                  <span className="text-sm">#{active.tokenId}</span>
                </div>
                <p className="mt-2 text-sm text-neutral-400">
                  {active.description}
                </p>

                <div className="mt-24 flex w-full flex-row  items-center">
                  <button className="flex h-16 w-16 items-center justify-center rounded-full bg-neutral-950/50 hover:bg-neutral-900">
                    <Image className="h-14 w-14" src={HealthPotion} alt="asd" />
                  </button>
                  <button
                    onClick={handleChangeNickname}
                    className="ml-auto h-14 rounded-full bg-violet-500 px-8 py-3"
                  >
                    Change Nickname
                  </button>
                </div>
              </div>
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
