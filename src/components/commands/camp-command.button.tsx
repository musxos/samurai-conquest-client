import useCampCommand from '@/features/commands/camp.command';
import { useGame } from '@/hooks/useGame';
import classNames from 'classnames';
import { useAccount } from 'wagmi';

export function CampCommandButton() {
  const { game } = useGame();
  const account = useAccount();

  const { isError, data, isLoading, isSuccess, write, error } = useCampCommand(
    game.samurai?.id, // TODO: I'm not sure
  );

  const handleClick = (e) => {
    e.preventDefault();

    if (!account.isConnected) {
      return;
    }

    if (!game.isLoaded || !game.samurai) {
      return;
    }

    if (write) {
      write();
    }
  };

  const className = classNames(
    'flex items-center justify-center rounded-full  px-4 py-2',
    {
      'bg-neutral-950/50': isSuccess,
      'bg-neutral-950/10': isLoading,
      'bg-neutral-950/20': !isLoading && !isSuccess,
      'bg-red-500/50': isError,
    },
  );

  return (
    <button onClick={handleClick} disabled={isLoading} className={className}>
      <i className="ri-landscape-line mr-1 text-2xl"></i>
      <span>
        {isLoading
          ? 'Camping...'
          : (isSuccess && !isLoading) ||
            (game.samurai &&
              game.samurai?.camp &&
              game.land &&
              game.samurai?.camp &&
              game.samurai?.campPosition == game.land)
          ? 'Camped'
          : 'Camp'}
      </span>
    </button>
  );
}
