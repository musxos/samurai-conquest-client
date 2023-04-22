import useUnCampCommand from '@/features/commands/uncamp.command';
import { useGame } from '@/hooks/useGame';
import classNames from 'classnames';
import { useAccount } from 'wagmi';

export function UncampCommandButton() {
  const { game } = useGame();
  const account = useAccount();

  const { isError, data, isLoading, isSuccess, write, error } =
    useUnCampCommand(
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
          ? 'Uncamping...'
          : isSuccess && !isLoading
          ? 'Uncamped'
          : 'Uncamp'}
      </span>
    </button>
  );
}
