import { DefaultLayout } from '@/layouts/default.layout';
import { useState } from 'react';
import Image from 'next/image';
import Sword from '@/assets/pngegg_5.png';

export function CrateCard() {
  return (
    <button className="crate-inital-animation flex h-[26rem] w-64 items-center justify-center">
      <div className="crate-front">
        <div className="text flex h-full w-full items-center justify-center rounded-md p-4">
          <Image
            className="h-72 w-48 object-contain grayscale-[100%]"
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
  return (
    <div className="fixed inset-0 left-0 top-0 flex items-center justify-center gap-12">
      <CrateCard></CrateCard>
      <CrateCard></CrateCard>
      <CrateCard></CrateCard>
    </div>
  );
}

export default function Crate() {
  const [open, setOpen] = useState(false);

  const openCase = () => {
    setOpen(true);
  };

  return (
    <section className="mx-auto mb-8 mt-32 flex max-w-screen-2xl flex-col items-center px-8">
      {!open && <button onClick={() => openCase()}>Open Case</button>}

      <CrateWrapper />
    </section>
  );
}

Crate.getLayout = function getLayout(page) {
  return <DefaultLayout>{page}</DefaultLayout>;
};
