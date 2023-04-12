import { useLayout } from '@/hooks/useLayout';
import { DefaultLayout } from '@/layouts/default.layout';
import { useEffect, useState } from 'react';

export function Card ({ className }: { className?: string })
{
  return <div className={`flex flex-col ${className}`}>
    <div className='flex flex-col items-center justify-center mb-4'>
      <div className='relative w-28 h-28 rounded-3xl'>
        <div className='absolute h-full w-full flex items-center justify-center'>
          <div className='w-44 h-44 blur-[100px] rounded-full bg-yellow-500/30'>
          </div>
        </div>
        <div className='z-20'>
          <img className='w-28 h-28 rounded-3xl !z-20 backdrop-blur-3xl' src="/1.png" />
        </div>
      </div>
      <h4 className='text-xl mt-4 font-medium'>ChainMaster</h4>
    </div>
    <div className='w-72 h-6 top-path bg-gradient-to-b from-white/5 to-neutral-950/10'>
    </div>
    <div className='flex flex-col items-center px-4 py-2 w-72 h-44 bg-gradient-to-b from-white/5 via-neutral-950/50 to-neutral-950/0 backdrop-blur-2xl'>
      <div className='w-10 h-10 rounded bg-white/80 -mt-6 flex items-center justify-center'>
        <i className='ri-award-fill text-black/50 text-lg'></i>
      </div>
      <h4 className='text-sm mt-3'>Earn 500 coins</h4>
      <div className='h-0.5 w-full bg-neutral-900 mt-5'></div>

      <div className='mt-4'>
        <div className='flex items-center gap-2'>
          <i className='ri-vip-diamond-fill text-blue-400 text-lg'></i>
          <span className='text-lg font-medium'>5.000</span>
        </div>
        <div className='mt-1 text-center text-sm'>Prize</div>
      </div>
    </div>
  </div>
}

export default function Top ()
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
    <div className="mt-24 max-w-screen-2xl flex flex-col items-center mx-auto mb-8">
      <div className='p-2 bg-neutral-950/30 backdrop-blur-2xl rounded-2xl mx-auto mb-12'>
        <button className='px-12 py-3 bg-neutral-950/50 backdrop-blur-2xl rounded-2xl'>Players</button>
        <button className='px-12 py-3 hover:bg-neutral-950/50 rounded-2xl'>Empires</button>
      </div>

      <div className='flex gap-8'>
        <Card className='mt-12'></Card>
        <Card></Card>
        <Card className='mt-12'></Card>
      </div>

      <div className='mt-12 rounded-3xl bg-neutral-950/40 backdrop-blur-3xl px-6 py-4 max-w-2xl'>
        You earned <span><i className='ri-vip-diamond-fill text-blue-400 text-lg'></i> <span><b>50</b></span></span> today and are ranked - out of <b>13.000 users</b>
      </div>

      <div className='w-full max-w-screen-xl mt-24'>
        <div className='flex flex-col'>
          <div className='grid grid-cols-4 mb-4 px-6 py-4'>
            <div className='col-span-1'>
              Place
            </div>
            <div className='col-span-1'>
              Username
            </div>
            <div className='col-span-1'>
              Points
            </div>
            <div className='col-span-1 text-right'>
              Prize
            </div>
          </div>

          <ul className='w-full flex flex-col gap-y-4'>
            <li className='grid grid-cols-4 px-6 py-4 rounded-xl bg-neutral-900/40 backdrop-blur-3xl'>
              <div className='col-span-1 flex items-center gap-1'>
                <i className="ri-arrow-up-double-fill text-2xl"></i>
                <span className='text-sm'>4</span>
              </div>
              <div className='col-span-1 flex items-center gap-1'>
                ChainMaster
              </div>
              <div className='col-span-1 flex items-center gap-1'>
                156
              </div>
              <div className='col-span-1 flex items-center gap-1'>
                <div className='ml-auto flex gap-1 px-2 py-1'>
                  <i className='ri-vip-diamond-fill text-blue-400 text-lg'></i>
                  <span className='text-lg font-medium'>5.000</span>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

Top.getLayout = function getLayout (page)
{
  return <DefaultLayout>{page}</DefaultLayout>;
};
