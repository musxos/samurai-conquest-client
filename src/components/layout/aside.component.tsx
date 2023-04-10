import classNames from 'classnames';
import Link from 'next/link';
import { useState } from 'react';

export function Aside() {
  const [modal, setModal] = useState(false);

  function handleModal() {
    setModal(!modal);
  }

  return (
    <>
      <aside className="sticky top-0 z-50 flex h-screen w-16 flex-col items-center border-r border-r-violet-500/20 bg-neutral-950/10 px-4 py-6 text-neutral-600 backdrop-blur-lg">
        <Link
          active-class="!text-violet-500"
          href="/"
          className="flex h-12 w-12 items-center justify-center rounded-full hover:bg-neutral-800"
        >
          <i className="ri-gamepad-line text-2xl"></i>
        </Link>
        <Link
          active-class="!text-violet-500"
          href="/marketplace"
          className="flex h-12 w-12 items-center justify-center rounded-full hover:bg-neutral-800"
        >
          <i className="ri-store-2-line text-2xl"></i>
        </Link>
        <Link
          active-class="!text-violet-500"
          href="/inventory"
          className="flex h-12 w-12 items-center justify-center rounded-full hover:bg-neutral-800"
        >
          <i className="ri-briefcase-3-line text-2xl"></i>
        </Link>
        <Link
          href="/profile"
          active-class="!text-violet-500"
          className="flex h-12 w-12 items-center justify-center rounded-full hover:bg-neutral-800"
        >
          <i className="ri-user-line text-2xl"></i>
        </Link>
        <Link
          href="/reference"
          active-class="!text-violet-500"
          className="flex h-12 w-12 items-center justify-center rounded-full hover:bg-neutral-800"
        >
          <i className="ri-shining-line text-2xl"></i>
        </Link>
        <button
          onClick={handleModal}
          className="flex h-12 w-12 items-center justify-center rounded-full hover:bg-neutral-800"
        >
          <i className="ri-indent-increase text-2xl"></i>
        </button>
        <button className="mt-auto flex h-12 w-12 items-center justify-center rounded-full hover:bg-neutral-800">
          <i className="ri-question-mark text-2xl text-violet-500"></i>
        </button>
      </aside>
      {modal && (
        <div
          className={classNames(
            'absolute right-0 top-0 z-50 h-full transform transition-all',
            {
              'translate-x-0': modal,
              'translate-x-full': !modal,
            },
          )}
        >
          <div className="h-full min-w-[332px] border-l border-indigo-500/20 bg-neutral-900 px-6 py-8">
            <h1 className="text-2xl font-semibold text-neutral-300">
              COLLECTIONS
            </h1>
            <p className="font-medium text-neutral-600">CHECK IT OUT</p>

            <div className="mt-4 flex flex-col gap-4">
              <button className="overflow-hidden rounded-2xl border-2 border-violet-500/50">
                <img
                  className="h-24 w-full object-cover opacity-50"
                  src="/29.png"
                  alt=""
                />
              </button>
              <button className="overflow-hidden rounded-2xl border-2 border-violet-500/50">
                <img
                  className="h-24 w-full object-cover opacity-50"
                  src="/30.png"
                  alt=""
                />
              </button>
              <button className="overflow-hidden rounded-2xl border-2 border-violet-500/50">
                <img
                  className="h-24 w-full object-cover opacity-50"
                  src="/31.png"
                  alt=""
                />
              </button>
              <button className="overflow-hidden rounded-2xl border-2 border-violet-500/50">
                <img
                  className="h-24 w-full object-cover opacity-50"
                  src="/32.png"
                  alt=""
                />
              </button>
            </div>
          </div>
        </div>
      )}{' '}
    </>
  );
}
