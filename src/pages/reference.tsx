import { useLayout } from '@/hooks/useLayout';
import { DefaultLayout } from '@/layouts/default.layout';
import { useEffect } from 'react';

import { Player } from '@lottiefiles/react-lottie-player';
import Comment from "@/assets/lottie/Comment.json";

export default function Reference ()
{
  const layout = useLayout();

  useEffect(() =>
  {
    layout.update({
      messages: false,
      notifications: false,
      profile: true,
      search: false,
      wallet: true,
    });
  }, []);

  return (
    <div className="mt-24 flex flex-col gap-8 px-8 py-6">
      <div className="flex flex-col">
        <h1 className="text-3xl font-medium">Reference</h1>
        <p className="mt-2 max-w-2xl text-white/80">
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. A magni
          reprehenderit alias molestiae maiores non minus, placeat, fuga quo
          assumenda, perspiciatis eaque quod et? Ullam dignissimos nobis neque
          nam ipsam!
        </p>
      </div>

      <div className="relative flex flex-col rounded-xl border border-violet-500/10 backdrop-blur-lg bg-neutral-900/10 px-6 py-8">
        <h1 className="text-3xl font-medium">Progress</h1>
        <ul className='mt-8 mb-8'>
          <li className='flex gap-2 items-center'>
            <i className='ri-check-line text-xl'></i>
            <span>Invite 10 friend</span>
          </li>
          <li className='flex gap-2 items-center'>
            <i className='ri-check-line text-xl'></i>
            <span>Invite 100 friend</span>
          </li>
          <li className='flex gap-2 items-center'>
            <i className='ri-close-line text-xl'></i>
            <span>Invite 1000 friend</span>
          </li>
          <li className='flex gap-2 items-center'>
            <i className='ri-close-line text-xl'></i>
            <span>Invite 10000 friend</span>
          </li>
          <li className='flex gap-2 items-center'>
            <i className='ri-close-line text-xl'></i>
            <span>Invite 100000 friend</span>
          </li>
        </ul>
        <div className="flex flex-col">
          <div className="mx-auto h-8 w-full rounded-full bg-neutral-800">
            <div className="relative flex items-center justify-center h-8 w-1/2 rounded-full bg-violet-500/20 border border-violet-500/50 backdrop-blur-lg">
              50%
            </div>
          </div>
        </div>

        <div className='absolute top-5 right-5'>
          <Player className='w-48 h-48' autoplay loop src={Comment}></Player>
        </div>
      </div>


      <div className="flex flex-col rounded-xl border border-violet-500/10 backdrop-blur-3xl bg-neutral-900/10 px-6 py-8 mt-12">
        <h2>Get Reference Code</h2>

        <div className="flex flex-col gap-4 mt-8">
          <input className="px-6 py-4 rounded-xl border border-violet-500/10 bg-transparent w-96 outline-none" disabled placeholder='Click to get reference code' type="text" />
        </div>
      </div>
    </div>
  );
}

Reference.getLayout = function getLayout (page)
{
  return <DefaultLayout>{page}</DefaultLayout>;
};
