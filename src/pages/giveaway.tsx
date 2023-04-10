import { useLayout } from '@/hooks/useLayout';
import { DefaultLayout } from '@/layouts/default.layout';
import { useEffect, useState } from 'react';

import { Player } from '@lottiefiles/react-lottie-player';
import Gift from '@/assets/lottie/gift.json';
import { Task } from '@/components/giveaway/task.component';

export default function Giveaway() {
  const layout = useLayout();

  useEffect(() => {
    layout.update({
      messages: false,
      notifications: false,
      profile: true,
      search: false,
      wallet: true,
    });
  }, []);

  const [tasks, setTasks] = useState([
    {
      name: 'Monster Hunter',
      tasks: [
        {
          name: 'Kill 10 monster',
          done: true,
        },
        {
          name: 'Kill 100 monster',
          done: true,
        },
        {
          name: 'Kill 1000 monster',
          done: true,
        },
      ],
      completed: true,
    },
    {
      name: 'Monster Hunter',
      tasks: [
        {
          name: 'Kill 10 monster',
          done: true,
        },
        {
          name: 'Kill 100 monster',
          done: false,
        },
        {
          name: 'Kill 1000 monster',
          done: false,
        },
      ],
      completed: false,
    },
    {
      name: 'Monster Hunter',
      tasks: [
        {
          name: 'Kill 10 monster',
          done: true,
        },
        {
          name: 'Kill 100 monster',
          done: false,
        },
        {
          name: 'Kill 1000 monster',
          done: false,
        },
      ],
      completed: false,
    },
  ]);

  return (
    <div className="mt-24 flex flex-col gap-8 px-8 py-6">
      <div className="relative mx-auto flex w-full max-w-screen-md flex-col rounded-xl border border-violet-500/10 bg-neutral-900/10 backdrop-blur-lg">
        <div className="grid grid-cols-3">
          <div className="col-span-1 flex flex-col items-center justify-center border-b-2 border-b-red-500 px-4 py-4">
            <h3 className="text-xl font-bold">25</h3>
            <p>Your Entries</p>
          </div>
          <div className="col-span-1 flex flex-col items-center justify-center border-b-2 border-b-blue-500 px-4 py-4">
            <h3 className="text-xl font-bold">595</h3>
            <p>Total Entries</p>
          </div>
          <div className="col-span-1 flex flex-col items-center justify-center border-b-2 border-b-purple-500 px-4 py-4">
            <h3 className="text-xl font-bold">3</h3>
            <p>Days left</p>
          </div>
        </div>

        <div className="relative flex flex-col px-6 py-8 ">
          <div className="flex flex-col items-center text-center">
            <h3 className="mb-4 text-2xl font-semibold">
              Samurai Conquest Legendary Agen Win
            </h3>
            <p className="max-w-screen-sm">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Labore
              aut consequatur, libero necessitatibus, error recusandae quaerat
              cum eos minus veniam dignissimos vel alias pariatur aspernatur
              tempore placeat itaque reiciendis. Sunt!
            </p>
          </div>

          <div className="mt-12 flex flex-col items-center">
            <ul className="w-full">
              <li className="flex w-full items-center gap-2 px-4 py-4 text-center hover:bg-neutral-900/50">
                <i className="ri-youtube-line text-2xl"></i>
                <span>Subscribe to our Youtube channel</span>
                <i className="ri-check-line ml-auto text-2xl"></i>
              </li>
              <li className="flex w-full items-center gap-2 px-4 py-4 text-center hover:bg-neutral-900/50">
                <i className="ri-youtube-line text-2xl"></i>
                <span>Subscribe to our Youtube channel</span>
                <i className="ri-check-line ml-auto text-2xl"></i>
              </li>
              <li className="flex w-full items-center gap-2 px-4 py-4 text-center hover:bg-neutral-900/50">
                <i className="ri-youtube-line text-2xl"></i>
                <span>Subscribe to our Youtube channel</span>
                <i className="ri-close-line ml-auto text-2xl"></i>
              </li>
              <li className="flex w-full items-center gap-2 px-4 py-4 text-center hover:bg-neutral-900/50">
                <i className="ri-youtube-line text-2xl"></i>
                <span>Subscribe to our Youtube channel</span>
                <i className="ri-close-line ml-auto text-2xl"></i>
              </li>
              <li className="flex w-full items-center gap-2 px-4 py-4 text-center hover:bg-neutral-900/50">
                <i className="ri-youtube-line text-2xl"></i>
                <span>Subscribe to our Youtube channel</span>
                <i className="ri-close-line ml-auto text-2xl"></i>
              </li>
              <li className="flex w-full items-center gap-2 px-4 py-4 text-center hover:bg-neutral-900/50">
                <i className="ri-youtube-line text-2xl"></i>
                <span>Subscribe to our Youtube channel</span>
                <i className="ri-close-line ml-auto text-2xl"></i>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

Giveaway.getLayout = function getLayout(page) {
  return <DefaultLayout>{page}</DefaultLayout>;
};
