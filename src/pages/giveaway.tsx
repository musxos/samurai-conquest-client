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
      <div className="flex flex-col">
        <h1 className="text-3xl font-medium">Giveaway</h1>
        <p className="mt-2 max-w-2xl text-white/80">
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. A magni
          reprehenderit alias molestiae maiores non minus, placeat, fuga quo
          assumenda, perspiciatis eaque quod et? Ullam dignissimos nobis neque
          nam ipsam!
        </p>
      </div>

      <div className="relative flex flex-col rounded-xl border border-violet-500/10 bg-neutral-900/10 px-6 py-8 backdrop-blur-lg">
        <h1 className="text-3xl font-medium">Progress</h1>
        <ul className="mb-8 mt-8">
          <li className="flex items-center gap-2">
            <i className="ri-check-line text-xl"></i>
            <span>Task #1</span>
          </li>
          <li className="flex items-center gap-2">
            <i className="ri-check-line text-xl"></i>
            <span>Task #2</span>
          </li>
          <li className="flex items-center gap-2">
            <i className="ri-close-line text-xl"></i>
            <span>Task #3</span>
          </li>
          <li className="flex items-center gap-2">
            <i className="ri-close-line text-xl"></i>
            <span>Task #4</span>
          </li>
          <li className="flex items-center gap-2">
            <i className="ri-close-line text-xl"></i>
            <span>Task #5</span>
          </li>
        </ul>
        <div className="flex flex-col">
          <div className="mx-auto h-8 w-full rounded-full bg-neutral-800">
            <div className="relative flex h-8 w-1/2 items-center justify-center rounded-full border border-violet-500/50 bg-violet-500/20 backdrop-blur-lg">
              50%
            </div>
          </div>
        </div>

        <div className="absolute right-5 top-5">
          <Player className="h-48 w-48" autoplay loop src={Gift}></Player>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-8">
        {tasks.map((task, index) => (
          <Task
            name={task.name}
            completed={task.completed}
            tasks={task.tasks}
            key={index}
          ></Task>
        ))}
      </div>
    </div>
  );
}

Giveaway.getLayout = function getLayout(page) {
  return <DefaultLayout>{page}</DefaultLayout>;
};
