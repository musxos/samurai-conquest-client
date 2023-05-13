import useMoveCommand, { prepareMove } from '@/features/commands/move.command';
import { useGame } from '@/hooks/useGame';
import { BigNumber } from 'alchemy-sdk';
import classNames from 'classnames';
import { useAccount } from 'wagmi';

export function MoveCommandButton() {
  const { game } = useGame();
  const account = useAccount();

  const { isError, data, isLoading, isSuccess, writeAsync, error } =
    useMoveCommand();

  const handleClick = async (e) => {
    e.preventDefault();

    if (!account.isConnected) {
      return;
    }

    if (!game.land && !game.samurai) {
      return;
    }

    const currentLand = game.lands.find(x => x.id === game.samurai?.Location);

    if (!currentLand) {
      return;
    }

    if (!prepareMove(currentLand, game.land)) {
      return;
    }

    await writeAsync({
      args: [
        BigInt(game.samurai?.Id),
        game.land?.id,
      ]
    });
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
    <button onClick={handleClick} className={className}>
      <i className="ri-landscape-line mr-1 text-2xl"></i>
      <span>
        {isLoading ? 'Moving...' : isSuccess && !isLoading ? 'Moved' : 'Move'}
      </span>
    </button>
  );
}
