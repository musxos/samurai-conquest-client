'use client';

import useRegisterCommand from '@/features/commands/register.command';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useAccount } from 'wagmi';
import localFont from 'next/font/local'

const myFont = localFont({
  src: '../assets/font.otf',
})

export default function Register() {
  const [connected, setConnected] = useState(false);
  const account = useAccount({
    onConnect: () => {
      setConnected(true);
    }
  });
  const router = useRouter();
  const [nickname, setNickname] = useState('');
  const refer =
    (router.query.refer as string) ||
    '0xF0b92297C8fFBD5014d94A57569ccA2ff82910Af';

  useEffect(() => {
    setConnected(account.isConnected);
  }, [])

  const registerCommand = useRegisterCommand();

  const handleClick = async () => {
    if (!account.isConnected) {
      return;
    }

    if (!nickname) {
      return;
    }

    if (!registerCommand.writeAsync) {
      await registerCommand.refetch();
    }

    const writeResult = await registerCommand.writeAsync({
      recklesslySetUnpreparedArgs: [nickname, refer as any]
    });

    const result = await writeResult.wait();

    if (result.status !== 1) {
      return;
    }

    router.push('/');
  };

  return (
    <div className="flex h-screen w-screen items-center justify-center">
      <video className='fixed top-0 left-0 h-full w-full object-cover blur-sm' autoPlay muted>
        <source src="/output.mp4" type="video/mp4" />
      </video>

      <div className="grid w-full max-w-screen-xl grid-cols-3 gap-8 z-50">
        <div className={"z-50 col-span-3 w-full text-center text-[8rem] text-white " + myFont.className}>
          Samurai Conquest
        </div>
        <div className="rounded-md bg-neutral-950/20 px-8 py-6 backdrop-blur-3xl">
          <div className={"text-4xl text-white " + myFont.className}>About Us</div>
          <p className="mt-4">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Pariatur
            dolorem quasi enim quisquam aperiam! Esse accusamus magni amet ea.
            Illum, nam aperiam. Blanditiis minima quo doloribus ipsam,
            cupiditate veniam exercitationem accusantium ea iure rerum assumenda
            numquam itaque quae impedit atque sint possimus suscipit
            reprehenderit! Autem blanditiis accusamus molestiae architecto
            tempora nam quod aut asperiores neque omnis vero veniam, sint facere
            tenetur sunt deleniti, similique distinctio dolore rerum quibusdam
            explicabo commodi eaque consequatur.
          </p>
        </div>
        <div className="col-span-2 flex items-center justify-center rounded-md border border-violet-500/10 bg-neutral-950/20 px-8 py-6 backdrop-blur-3xl">
          {!connected && <ConnectButton></ConnectButton>}
          {connected && (
            <div className="flex h-full w-full flex-col gap-8">
              <div className={"text-4xl text-white " + myFont.className}>Nickname</div>

              <div className="flex flex-col gap-4">
                <input
                  onChange={(e) => setNickname(e.target.value)}
                  value={nickname}
                  className="w-full rounded-md bg-neutral-950/20 px-8 py-6 backdrop-blur-3xl"
                  type="text"
                  placeholder="Enter your nickname"
                />
              </div>
              <button
                onClick={handleClick}
                className="ml-auto mt-auto rounded-md bg-neutral-950/50 px-12 py-3 text-white"
              >
                Submit
              </button>
            </div>
          )}
        </div>
        <div className="z-50 col-span-3 flex items-center gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-neutral-950/50">
            <i className="ri-twitter-fill text-2xl"></i>
          </div>
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-neutral-950/50">
            <i className="ri-github-fill text-2xl"></i>
          </div>
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-neutral-950/50">
            <i className="ri-discord-fill text-2xl"></i>
          </div>
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-neutral-950/50">
            <i className="ri-coin-fill text-2xl"></i>
          </div>
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-neutral-950/50">
            <i className="ri-facebook-fill text-2xl"></i>
          </div>
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-neutral-950/50">
            <i className="ri-instagram-fill text-2xl"></i>
          </div>
          <div className="relative z-40 ml-auto flex h-12 items-center justify-center overflow-hidden rounded-full bg-neutral-950/50 px-32">
            <div
              style={{
                clipPath: 'polygon(0 0, 100% 0%, 75% 100%, 0% 100%)',
              }}
              className="absolute left-0 h-full w-1/2 bg-blue-500/40"
            ></div>
            <span className="z-50">Donate</span>
          </div>
        </div>
      </div>
    </div>
  );
}
