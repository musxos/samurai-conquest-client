import { AgentCard } from '@/components/inventory/agent.card';
import { useLayout } from '@/hooks/useLayout';
import { DefaultLayout } from '@/layouts/default.layout';
import { useEffect } from 'react';

export default function Profile() {
  const { update: updateLayout } = useLayout();

  useEffect(() => {
    updateLayout({
      messages: true,
      notifications: true,
      profile: true,
      wallet: true,
      search: true,
    });
  }, []);

  return (
    <div className="grid grid-cols-2 lg:grid-cols-5 px-12 py-8 gap-8 mt-24">
      <div className="col-span-2 lg:col-span-1">
        <div className="flex flex-col items-center w-full gap-4">
          <div className="bg-neutral-900/20 backdrop-blur-xl border border-violet-500/10 px-6 py-8 rounded-xl w-full flex flex-col items-center">
            <div className="w-32 h-32 relative">
              <img className="w-32 h-32 rounded-full" src="/1.png" alt="" />
              <i className="ri-vip-crown-2-line text-2xl bg-white p-2 text-yellow-500 rounded-full absolute top-0 right-0 w-11 h-11 flex items-center justify-center"></i>
            </div>
            <h1 className="text-2xl mt-4 font-inter">John Due</h1>
            <p className="text-center mt-4">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Cumque,
              rem consectetur harum in tempora atque, iste repudiandae aliquam
              nobis maiores ut temporibus sequi nemo repellendus. Qui provident
              accusantium debitis dolores!
            </p>
          </div>

          <div className="bg-neutral-900/20 backdrop-blur-xl border border-violet-500/10 px-6 pt-4 pb-8 rounded-xl w-full flex flex-col items-center">
            <h2 className="text-left w-full text-xl font-medium">
              Your Details
            </h2>

            <div className="flex flex-col gap-4 mt-4 w-full">
              <div className="flex flex-row items-center">
                <i className="ri-user-line text-2xl text-white/60 mr-4"></i>
                <div className="flex flex-col">
                  <span className="text-white/60 text-sm">Name</span>
                  <span className="text-white">John Due</span>
                </div>
              </div>
              <div className="flex flex-row items-center">
                <i className="ri-group-line text-2xl text-white/60 mr-4"></i>
                <div className="flex flex-col">
                  <span className="text-white/60 text-sm">References</span>
                  <span className="text-white">50</span>
                </div>
              </div>
              <div className="flex flex-row items-center">
                <i className="ri-run-line text-2xl text-white/60 mr-4"></i>
                <div className="flex flex-col">
                  <span className="text-white/60 text-sm">Movement</span>
                  <span className="text-white">1.000km</span>
                </div>
              </div>
              <div className="flex flex-row items-center">
                <i className="ri-copper-coin-line text-2xl text-white/60 mr-4"></i>
                <div className="flex flex-col">
                  <span className="text-white/60 text-sm">Coin</span>
                  <span className="text-white">5.000k</span>
                </div>
              </div>
              <div className="flex flex-row items-center">
                <i className="ri-shield-check-line text-2xl text-white/60 mr-4"></i>
                <div className="flex flex-col">
                  <span className="text-white/60 text-sm">Verified</span>
                  <span className="text-white">Yes</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="col-span-2 lg:col-span-3">
        <div className="flex flex-col items-center w-full gap-4">
          <div className="bg-neutral-900/20 backdrop-blur-xl border border-violet-500/10 px-6 py-4 rounded-xl flex flex-col items-center w-full">
            <div className="flex flex-row items-center justify-between w-full mb-2">
              <h2 className="text-left w-full text-xl font-medium">
                Your Best Agents
              </h2>
              <button className="w-32">All Invetory</button>
            </div>
            <div className="flex flex-row gap-4">
              <AgentCard
                assign={false}
                image={'1.png'}
                number={1}
                name="Test 1"
              ></AgentCard>
              <AgentCard
                assign={false}
                image={'2.png'}
                number={1}
                name="Test 2"
              ></AgentCard>
              <AgentCard
                assign={false}
                image={'3.png'}
                number={1}
                name="Test 3"
              ></AgentCard>
            </div>
          </div>
        </div>
      </div>

      <div className="col-span-2 lg:col-span-1">
        <div className="flex flex-col gap-4">
          <div className="bg-neutral-900/20 backdrop-blur-xl border border-violet-500/10 px-6 py-4 rounded-xl w-full flex flex-col items-center">
            <h2 className="text-left w-full text-xl font-medium">
              Daily Quests
            </h2>

            <div className="flex flex-col gap-4 mt-4 w-full">
              <div className="flex flex-col">
                <span className="flex items-center text-red-500 mb-1">
                  <i className="ri-sword-fill text-lg mr-2"></i>{' '}
                  <span className="text-sm">Kill Monster (2/10)</span>
                </span>
                <div className="h-2 rounded-full bg-neutral-700">
                  <div
                    className="h-2 rounded-full bg-neutral-900 stats"
                    style={{ maxWidth: '72%' }}
                  ></div>
                </div>
              </div>
              <div className="flex flex-col">
                <span className="flex items-center text-blue-500 mb-1">
                  <i className="ri-shield-fill text-lg mr-2"></i>{' '}
                  <span className="text-sm">Defend (1/100)</span>
                </span>
                <div className="h-2 rounded-full bg-neutral-700">
                  <div
                    className="h-2 rounded-full bg-neutral-900 stats"
                    style={{ maxWidth: '55%' }}
                  ></div>
                </div>
              </div>
              <div className="flex flex-col">
                <span className="flex items-center text-yellow-500 mb-1">
                  <i className="ri-vip-crown-fill text-lg mr-2"></i>{' '}
                  <span className="text-sm">Murder</span>
                </span>
                <div className="h-2 rounded-full bg-neutral-700">
                  <div
                    className="h-2 rounded-full bg-neutral-900 stats"
                    style={{ maxWidth: '72%' }}
                  ></div>
                </div>
              </div>
              <div className="flex flex-col">
                <span className="flex items-center text-red-500 mb-1">
                  <i className="ri-sword-fill text-lg mr-2"></i>{' '}
                  <span className="text-sm">Kill Monster (2/10)</span>
                </span>
                <div className="h-2 rounded-full bg-neutral-700">
                  <div
                    className="h-2 rounded-full bg-neutral-900 stats"
                    style={{ maxWidth: '72%' }}
                  ></div>
                </div>
              </div>
              <div className="flex flex-col">
                <span className="flex items-center text-blue-500 mb-1">
                  <i className="ri-shield-fill text-lg mr-2"></i>{' '}
                  <span className="text-sm">Defend (1/100)</span>
                </span>
                <div className="h-2 rounded-full bg-neutral-700">
                  <div
                    className="h-2 rounded-full bg-neutral-900 stats"
                    style={{ maxWidth: '55%' }}
                  ></div>
                </div>
              </div>
              <div className="flex flex-col">
                <span className="flex items-center text-yellow-500 mb-1">
                  <i className="ri-vip-crown-fill text-lg mr-2"></i>{' '}
                  <span className="text-sm">Murder</span>
                </span>
                <div className="h-2 rounded-full bg-neutral-700">
                  <div
                    className="h-2 rounded-full bg-neutral-900 stats"
                    style={{ maxWidth: '72%' }}
                  ></div>
                </div>
              </div>
            </div>
          </div>
          <div className="bg-neutral-900/20 backdrop-blur-xl border border-violet-500/10 px-6 py-4 rounded-xl w-full flex flex-col items-center">
            <h2 className="text-left w-full text-xl font-medium">
              Giveaway Tasks
            </h2>

            <div className="flex flex-col gap-4 mt-4 w-full">
              <div className="flex flex-col ">
                <span className="flex items-center text-red-500 mb-1">
                  <i className="ri-user-fill text-lg mr-2"></i>{' '}
                  <span className="text-sm">New Agent (2/10)</span>
                </span>
                <div className="h-2 rounded-full bg-neutral-700">
                  <div
                    className="h-2 rounded-full bg-neutral-900 stats"
                    style={{ maxWidth: '72%' }}
                  ></div>
                </div>
              </div>
              <div
                title="Take your giveaway"
                className="flex flex-col hover:bg-neutral-700 rounded-xl cursor-pointer"
              >
                <span className="flex items-center text-blue-500 mb-2">
                  <i className="ri-shield-fill text-lg mr-2"></i>{' '}
                  <span className="text-sm">Capture The World</span>
                </span>
                <div className="h-2 mb-2 rounded-full bg-neutral-700">
                  <div
                    className="h-2 rounded-full bg-green-500 stats"
                    style={{ maxWidth: '100%' }}
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
