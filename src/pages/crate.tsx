import { DefaultLayout } from '@/layouts/default.layout';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import Sword from '@/assets/pngegg_5.png';
import classNames from 'classnames';
import { useLayout } from '@/hooks/useLayout';

export function CrateCard({ minted, setMint, id }: any) {
  const { setColor } = useLayout();

  const classStyle = classNames(
    'crate-inital-animation flex h-[26rem] w-64 items-center justify-center',
    {
      active: minted == id,
      '': minted != id,
      'exit-animation': minted != id && minted != 0,
    },
  );

  function handleClick() {
    setMint(id);
  }

  useEffect(() => {
    if (minted == id) {
      const element = document.getElementById(`crate-card-${id}`);
      const inventory = document.getElementById(`inventory`);

      if (element && inventory) {
        element.style.transition = 'all 0.5s ease-in-out';
        element.style.position = 'fixed';
        element.style.top = `${element.offsetTop}px`;
        element.style.left = `${element.offsetLeft}px`;
        setColor('red');
      }

      setTimeout(() => {
        element.style.top = `${inventory.clientTop}px`;
        element.style.left = `${inventory.clientLeft}px`;
        element.style.transform = 'translate(-50%, -50%)';
        element.style.scale = '0.1';
        element.style.opacity = '0';
        setColor('violet');
      }, 5000);
    }
  }, [minted]);

  return (
    <button
      id={`crate-card-${id}`}
      data-delay={`${id}s`}
      onClick={() => handleClick()}
      className={classStyle}
    >
      <div className="crate-front">
        <div className="text flex h-full w-full items-center justify-center rounded-md p-4">
          <Image
            className="h-72 w-48 object-contain grayscale-[100%]"
            alt="test"
            src={Sword}
          />
        </div>
      </div>
      <div className="crate-back">
        <div className="h-full w-full rounded-md bg-neutral-950 p-4">
          <img
            className="h-54 w-full rounded-md object-cover"
            src="/art/1.png"
            alt=""
          />
          <h1 className="mb-2 mt-4 w-full text-center text-2xl font-semibold">
            Yasuo
          </h1>

          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col">
              <span className="mb-1 flex items-center text-red-500">
                <i className="ri-sword-fill mr-1"></i>{' '}
                <span className="text-sm">32</span>
              </span>
              <div className="h-2 rounded-full bg-neutral-800">
                <div
                  className="stats h-2 rounded-full bg-red-500"
                  style={{ maxWidth: '72%' }}
                ></div>
              </div>
            </div>
            <div className="flex flex-col">
              <span className="mb-1 flex items-center text-blue-500">
                <i className="ri-shield-fill mr-1"></i>{' '}
                <span className="text-sm">55</span>
              </span>
              <div className="h-2 rounded-full bg-neutral-800">
                <div
                  className="stats h-2 rounded-full bg-blue-500"
                  style={{ maxWidth: '72%' }}
                ></div>
              </div>
            </div>
            <div className="flex flex-col">
              <span className="mb-1 flex items-center text-yellow-500">
                <i className="ri-sword-fill mr-1"></i>{' '}
                <span className="text-sm">72</span>
              </span>
              <div className="h-2 rounded-full bg-neutral-800">
                <div
                  className="stats h-2 rounded-full bg-yellow-500"
                  style={{ maxWidth: '72%' }}
                ></div>
              </div>
            </div>
            <div className="flex flex-col">
              <span className="mb-1 flex items-center text-green-500">
                <i className="ri-sword-fill mr-1"></i>{' '}
                <span className="text-sm">72</span>
              </span>
              <div className="h-2 rounded-full bg-neutral-800">
                <div
                  className="stats h-2 rounded-full bg-green-500"
                  style={{ maxWidth: '72%' }}
                ></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </button>
  );
}

export function CrateWrapper() {
  const [minted, setMinted] = useState(false);
  const list = [1, 2, 3, 4];

  return (
    <div className="fixed inset-0 left-0 top-0 flex items-center justify-center gap-12">
      {list.map((x) => {
        return (
          <CrateCard
            key={x}
            minted={minted}
            setMint={setMinted}
            id={x}
          ></CrateCard>
        );
      })}
    </div>
  );
}

export default function Crate() {
  return (
    <section className="mx-auto mb-8 mt-32 flex max-w-screen-2xl flex-col items-center px-8">
      <CrateWrapper />
    </section>
  );
}

Crate.getLayout = function getLayout(page) {
  return <DefaultLayout>{page}</DefaultLayout>;
};
