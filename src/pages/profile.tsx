import { AgentCard } from '@/components/inventory/agent.card';
import { resolveClan } from '@/features/mock/clan.resolver';
import useAPI from '@/hooks/useAPI';
import { useLayout } from '@/hooks/useLayout';
import { DefaultLayout } from '@/layouts/default.layout';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { useAccount } from 'wagmi';

export default function Profile() {
  const account = useAccount();
  const {
    user: { getUser, getOwnedNFTs },
  } = useAPI();
  const { update: updateLayout } = useLayout();
  const [user, setUser] = useState(null);
  const [ownedNFTs, setOwnedNFTs] = useState(null);

  useEffect(() => {
    updateLayout({
      messages: true,
      notifications: true,
      profile: true,
      wallet: true,
      search: true,
    });

    fetchUser();
    fetchOwnedNFTs();
  }, []);

  const fetchUser = async () => {
    const data = await getUser(account.address);
    setUser(data[0]);
  };

  const fetchOwnedNFTs = async () => {
    const data = await getOwnedNFTs(account.address);
    setOwnedNFTs(data);
  };

  if (!user) return null;

  return (
    <div className="mt-24 grid grid-cols-2 gap-8 px-12 py-8 lg:grid-cols-5">
      <div className="col-span-2 lg:col-span-1">
        <div className="flex w-full flex-col items-center gap-4">
          <div className="flex w-full flex-col items-center rounded-xl border border-violet-500/10 bg-neutral-900/20 px-6 py-8 backdrop-blur-xl">
            <div className="relative h-32 w-32">
              <Image
                height={160}
                width={160}
                className="h-32 w-32 rounded-full"
                src="/art/1.png"
                alt="sd"
              />
              <i className="ri-vip-crown-2-line absolute right-0 top-0 flex h-11 w-11 items-center justify-center rounded-full bg-white p-2 text-2xl text-yellow-500"></i>
            </div>
            <h1 className="font-inter mt-4 text-2xl">{user.nickName}</h1>
            <p className="mt-4 text-center font-semibold text-green-500">
              {resolveClan(user.clan)}
            </p>
          </div>

          <div className="flex w-full flex-col items-center rounded-xl border border-violet-500/10 bg-neutral-900/20 px-6 pb-8 pt-4 backdrop-blur-xl">
            <h2 className="w-full text-left text-xl font-medium">
              Your Details
            </h2>

            <div className="mt-4 flex w-full flex-col gap-4">
              <div className="flex flex-row items-center">
                <i className="ri-user-line mr-4 text-2xl text-white/60"></i>
                <div className="flex flex-col">
                  <span className="text-sm text-white/60">Name</span>
                  <span className="text-white">{user.nickName}</span>
                </div>
              </div>
              <div className="flex flex-row items-center">
                <i className="ri-shield-line mr-4 text-2xl text-white/60"></i>
                <div className="flex flex-col">
                  <span className="text-sm text-white/60">War Power</span>
                  <span className="text-white">
                    {ownedNFTs && ownedNFTs.reduce(
                      (acc, x) => acc + x.Attack + x.Defence,
                      0,
                    )}
                  </span>
                </div>
              </div>
              <div className="flex flex-row items-center">
                <i className="ri-sword-line mr-4 text-2xl text-white/60"></i>
                <div className="flex flex-col">
                  <span className="text-sm text-white/60">Attack Power</span>
                  <span className="text-white">
                    {ownedNFTs && ownedNFTs.reduce((acc, x) => acc + x.Attack, 0)}
                  </span>
                </div>
              </div>
              <div className="flex flex-row items-center">
                <i className="ri-shield-line mr-4 text-2xl text-white/60"></i>
                <div className="flex flex-col">
                  <span className="text-sm text-white/60">Defens Power</span>
                  <span className="text-white">
                    {ownedNFTs && ownedNFTs.reduce((acc, x) => acc + x.Defence, 0)}
                  </span>
                </div>
              </div>
              <div className="flex flex-row items-center">
                <i className="ri-group-line mr-4 text-2xl text-white/60"></i>
                <div className="flex flex-col">
                  <span className="text-sm text-white/60">NFT Count</span>
                  <span className="text-white">{ownedNFTs && ownedNFTs.length}</span>
                </div>
              </div>
              <div className="flex flex-row items-center">
                <i className="ri-copper-coin-line mr-4 text-2xl text-white/60"></i>
                <div className="flex flex-col">
                  <span className="text-sm text-white/60">Point</span>
                  <span className="text-white">{user.point}</span>
                </div>
              </div>
              <div className="flex flex-row items-center">
                <i className="ri-shield-check-line mr-4 text-2xl text-white/60"></i>
                <div className="flex flex-col">
                  <span className="text-sm text-white/60">Verified</span>
                  <span className="text-white">Yes</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="col-span-2 lg:col-span-3">
        <div className="flex w-full flex-col   gap-4">
          <div className="flex w-full flex-col rounded-xl border border-violet-500/10 bg-neutral-900/20 px-6 py-4 backdrop-blur-xl">
            <div className="mb-2 flex w-full flex-row items-center justify-between">
              <h2 className="w-full text-left text-xl font-medium">
                Your Best Agents
              </h2>
            </div>
            <div className="flex flex-row gap-4">
              {ownedNFTs && ownedNFTs
                .sort((a, b) => b.Defence + b.Attack - a)
                .slice(0, 3)
                .map((nft, i) => (
                  <AgentCard
                    key={i}
                    assign={false}
                    image={`/art/${nft.TokenId}.png`}
                    id={nft.TokenId}
                    name={nft.TokenName || 'Agent'}
                    agility={nft.MaxAgility}
                    attack={nft.Attack}
                    defence={nft.Defence}
                    chakra={nft.Chakra}
                  ></AgentCard>
                ))}
            </div>
          </div>
        </div>
      </div>

      <div className="col-span-2 lg:col-span-1">
        <div className="flex flex-col gap-4">
          <div className="flex w-full flex-col items-center rounded-xl border border-violet-500/10 bg-neutral-900/20 px-6 py-4 backdrop-blur-xl">
            <h2 className="w-full text-left text-xl font-medium">
              Daily Quests
            </h2>

            <div className="mt-4 flex w-full flex-col gap-4">
              <div className="flex flex-col">
                <span className="mb-1 flex items-center text-red-500">
                  <i className="ri-sword-fill mr-2 text-lg"></i>{' '}
                  <span className="text-sm">Kill Monster (2/10)</span>
                </span>
                <div className="h-2 rounded-full bg-neutral-700">
                  <div
                    className="stats h-2 rounded-full bg-neutral-900"
                    style={{ maxWidth: '72%' }}
                  ></div>
                </div>
              </div>
              <div className="flex flex-col">
                <span className="mb-1 flex items-center text-blue-500">
                  <i className="ri-shield-fill mr-2 text-lg"></i>{' '}
                  <span className="text-sm">Defend (1/100)</span>
                </span>
                <div className="h-2 rounded-full bg-neutral-700">
                  <div
                    className="stats h-2 rounded-full bg-neutral-900"
                    style={{ maxWidth: '55%' }}
                  ></div>
                </div>
              </div>
              <div className="flex flex-col">
                <span className="mb-1 flex items-center text-yellow-500">
                  <i className="ri-vip-crown-fill mr-2 text-lg"></i>{' '}
                  <span className="text-sm">Murder</span>
                </span>
                <div className="h-2 rounded-full bg-neutral-700">
                  <div
                    className="stats h-2 rounded-full bg-neutral-900"
                    style={{ maxWidth: '72%' }}
                  ></div>
                </div>
              </div>
              <div className="flex flex-col">
                <span className="mb-1 flex items-center text-red-500">
                  <i className="ri-sword-fill mr-2 text-lg"></i>{' '}
                  <span className="text-sm">Kill Monster (2/10)</span>
                </span>
                <div className="h-2 rounded-full bg-neutral-700">
                  <div
                    className="stats h-2 rounded-full bg-neutral-900"
                    style={{ maxWidth: '72%' }}
                  ></div>
                </div>
              </div>
              <div className="flex flex-col">
                <span className="mb-1 flex items-center text-blue-500">
                  <i className="ri-shield-fill mr-2 text-lg"></i>{' '}
                  <span className="text-sm">Defend (1/100)</span>
                </span>
                <div className="h-2 rounded-full bg-neutral-700">
                  <div
                    className="stats h-2 rounded-full bg-neutral-900"
                    style={{ maxWidth: '55%' }}
                  ></div>
                </div>
              </div>
              <div className="flex flex-col">
                <span className="mb-1 flex items-center text-yellow-500">
                  <i className="ri-vip-crown-fill mr-2 text-lg"></i>{' '}
                  <span className="text-sm">Murder</span>
                </span>
                <div className="h-2 rounded-full bg-neutral-700">
                  <div
                    className="stats h-2 rounded-full bg-neutral-900"
                    style={{ maxWidth: '72%' }}
                  ></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

Profile.getLayout = (page: JSX.Element) => {
  return <DefaultLayout>{page}</DefaultLayout>;
};
