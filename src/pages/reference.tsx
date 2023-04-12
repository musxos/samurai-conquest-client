import { useLayout } from '@/hooks/useLayout';
import { DefaultLayout } from '@/layouts/default.layout';
import { useEffect } from 'react';

import { Player } from '@lottiefiles/react-lottie-player';
import Comment from '@/assets/lottie/Comment.json';

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
    <div className="mx-auto mt-24 flex max-w-screen-2xl flex-col gap-8 px-8 py-6">
      <div className="grid grid-cols-9 gap-8 min-h-full">
        <div className="col-span-3 h-full">
          <div className='flex flex-col gap-4 rounded-md bg-neutral-950/30 backdrop-blur-2xl px-6 py-4 h-full'>
            <h2 className='text-xl font-medium mb-2'>Your Account</h2>
            <p>
              In order to track your ZETA points, you must verify your wallet and
              Twitter.
            </p>

            <div className="flex flex-col mt-12">
              <button className="rounded px-6 py-3 font-medium bg-violet-500/50 backdrop-blur-2xl">
                Connect Wallet
              </button>
            </div>

            <div className="my-auto text-center">
              <span className='text-neutral-500/50'>
                Your Samuria Conquest and stats will appear here after
                connectiong.
              </span>
            </div>
          </div>
        </div>
        <div className='col-span-6'>
          <div className='flex flex-col gap-8'>
            <div className='items-end bg-neutral-950/30 backdrop-blur-2xl rounded-md  px-8 py-5'>
              <div className='flex justify-between items-end'>
                <h2 className='text-xl'>Top Accounts</h2>
                <span className='text-sm'>Total Accounts: 1.3M</span>
              </div>

              <div className='w-full mt-6'>
                <table className='w-full'>
                  <thead>
                    <tr className='text-left border-b border-neutral-800'>
                      <th className='pb-2'>Address</th>
                      <th className='pb-2'>SC Points</th>
                    </tr>
                  </thead>

                  <tbody className='text-sm divide-y divide-neutral-900'>
                    {new Array(5).fill(0).map(x => <tr key={x}>
                      <td className='py-3'>0x117439E571556Ca211F443f4fc724c85A8e1d28d</td>
                      <td className='py-3'>48,240,500</td>
                    </tr>)}
                  </tbody>
                </table>
              </div>
            </div>
            <div className='flex flex-col bg-neutral-950/30 backdrop-blur-2xl rounded-md  px-8 py-5 min-h-[256px]'>
              <div className='flex justify-between items-end'>
                <h2 className='text-xl'>Your Invites</h2>
                <span className='text-sm'>Total Confirmed: 33</span>
              </div>

              <div className='grow flex items-center justify-center'>
                <span className='text-neutral-500/50'>No invites yet!</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

Reference.getLayout = function getLayout (page)
{
  return <DefaultLayout>{page}</DefaultLayout>;
};
