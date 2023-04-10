import { useLayout } from '@/hooks/useLayout';
import { DefaultLayout } from '@/layouts/default.layout';
import { useEffect } from 'react';

export default function Reference() {
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

  return (
    <div className="mt-24 flex flex-col gap-8 px-8 py-6">
      <div className="text-center">
        <h1 className="text-3xl font-medium">Reference</h1>
        <p className="mx-auto mt-2 max-w-2xl text-white/80">
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. A magni
          reprehenderit alias molestiae maiores non minus, placeat, fuga quo
          assumenda, perspiciatis eaque quod et? Ullam dignissimos nobis neque
          nam ipsam!
        </p>
      </div>

      <div className="mt-24">
        <h2 className="mb-2 text-center text-2xl">Next Gift</h2>
        <div className="mx-auto h-3 w-[32rem] rounded-full bg-neutral-800">
          <div className="h-3 w-1/2 rounded-full bg-indigo-500"></div>
        </div>
        <p className="mx-auto mt-2 text-center text-sm">(5/10)</p>
      </div>

      <div className="mx-auto mt-24">
        <h2>Your Reference</h2>
      </div>
    </div>
  );
}

Reference.getLayout = function getLayout(page) {
  return <DefaultLayout>{page}</DefaultLayout>;
};
