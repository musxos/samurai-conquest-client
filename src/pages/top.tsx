import { useLayout } from '@/hooks/useLayout';
import { DefaultLayout } from '@/layouts/default.layout';
import { useEffect, useState } from 'react';

export default function Top() {
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

  const empires = [
    'Kingdom of the Netherlands',
    'Kingdom of Belgium',
    'Kingdom of the United Kingdom',
    'Kingdom of Spain',
    'Kingdom of Portugal',
    'Kingdom of Italy',
    'Kingdom of Greece',
    'Kingdom of Romania',
    'Kingdom of Bulgaria',
    'Kingdom of Hungary',
    'Kingdom of Yugoslavia',
  ];

  const players = [
    'Player 1',
    'Player 2',
    'Player 3',
    'Player 4',
    'Player 5',
    'Player 6',
    'Player 7',
    'Player 8',
  ];

  return (
    <div className="mt-24 grid grid-cols-1 gap-8 px-8 py-6 lg:grid-cols-2">
      <div className="col-span-full mb-12">
        <h1 className="text-center text-3xl font-bold">Top 10</h1>
        <p className="mx-auto mt-4 max-w-screen-md text-center text-white/80">
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quasi
          perspiciatis inventore non expedita neque velit, nostrum cupiditate
          accusamus et quo quis distinctio? Minus soluta praesentium nisi sequi
          possimus, nihil voluptas?
        </p>
      </div>
      <div className="relative mx-auto flex w-full max-w-screen-md flex-col rounded-xl border border-violet-500/10 bg-neutral-900/10 px-6 py-4 backdrop-blur-lg">
        <h2 className="font-xl mb-12">Top Players</h2>

        <table className="w-full">
          <thead>
            <tr>
              <th className="pb-4 text-left text-white/50">Rank</th>
              <th className="pb-4 text-left text-white/50">Player</th>
              <th className="pb-4 text-left text-white/50">Empire</th>
              <th className="pb-4 text-left text-white/50">Score</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-violet-500/20">
            {players.map((player, index) => (
              <tr key={index}>
                <td className="py-4">{index + 1}</td>
                <td className="py-4">{player}</td>
                <td className="py-4">Kingdom of Yugoslavia</td>
                <td className="py-4">{index * 1000}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="relative mx-auto flex w-full max-w-screen-md flex-col rounded-xl border border-violet-500/10 bg-neutral-900/10 px-6 py-4 backdrop-blur-lg">
        <h2 className="font-xl mb-12">Top Empires</h2>

        <table className="w-full">
          <thead>
            <tr>
              <th className="pb-4 text-left text-white/50">Rank</th>
              <th className="pb-4 text-left text-white/50">Empire</th>
              <th className="pb-4 text-left text-white/50">Score</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-violet-500/20">
            {empires.map((empire, index) => (
              <tr key={index}>
                <td className="py-4">{index + 1}</td>
                <td className="py-4">{empire}</td>
                <td className="py-4">{index * 1000}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

Top.getLayout = function getLayout(page) {
  return <DefaultLayout>{page}</DefaultLayout>;
};
