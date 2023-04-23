import classNames from 'classnames';
import Image from 'next/image';

export type AgentCardProps = {
  image: string;
  name: string;
  assign: boolean;
  id: any;
  onClick?: () => void;

  attack: number;
  defence: number;
  agility: number;
  chakra: number;
};

export function AgentCard({
  image,
  name,
  assign,
  id,
  attack = 0,
  defence = 0,
  agility = 0,
  chakra = 0,
  onClick,
}: AgentCardProps) {
  const style = classNames(
    'relative flex flex-col px-6 py-4 bg-neutral-900/20 backdrop-blur-xl border border-violet-500/10 rounded-2xl group hover:bg-neutral-800/50 transition cursor-pointer',
    {
      'bg-violet-800': assign,
      'bg-neutral-800': !assign,
    },
  );

  return (
    <div onClick={onClick} className={style}>
      <Image
        width={290}
        height={290}
        className="rounded-2xl"
        src={image}
        alt="asd"
      />
      <div className="mt-4 flex items-center justify-between">
        <h3 className="font-inter font-medium text-neutral-200">{name}</h3>
        <span className="text-sm font-light text-neutral-400">#{id}</span>
      </div>

      <div className="mt-4 flex flex-col gap-4">
        <div className="flex flex-col">
          <span className="mb-1 flex items-center text-red-500">
            <i className="ri-sword-fill mr-1"></i>{' '}
            <span className="text-sm">{agility}</span>
          </span>
          <div className="h-2 rounded-full bg-neutral-700">
            <div
              className="stats h-2 rounded-full bg-red-500"
              style={{ maxWidth: `${(agility * 5)}%` }}
            ></div>
          </div>
        </div>
        <div className="flex flex-col">
          <span className="mb-1 flex items-center text-blue-500">
            <i className="ri-shield-fill mr-1"></i>{' '}
            <span className="text-sm">{defence}</span>
          </span>
          <div className="h-2 rounded-full bg-neutral-700">
            <div
              className="stats h-2 rounded-full bg-blue-500"
              style={{ maxWidth: `${(defence * 5)}%` }}
            ></div>
          </div>
        </div>
        <div className="flex flex-col">
          <span className="mb-1 flex items-center text-yellow-500">
            <i className="ri-sword-fill mr-1"></i>{' '}
            <span className="text-sm">{attack}</span>
          </span>
          <div className="h-2 rounded-full bg-neutral-700">
            <div
              className="stats h-2 rounded-full bg-yellow-500"
              style={{ maxWidth: `${(attack * 5)}%` }}
            ></div>
          </div>
        </div>
        <div className="flex flex-col">
          <span className="mb-1 flex items-center text-green-500">
            <i className="ri-sword-fill mr-1"></i>{' '}
            <span className="text-sm">{chakra}</span>
          </span>
          <div className="h-2 rounded-full bg-neutral-700">
            <div
              className="stats h-2 rounded-full bg-green-500"
              style={{ maxWidth: `${(chakra * 5)}%` }}
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
}
