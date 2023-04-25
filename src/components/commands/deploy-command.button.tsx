import useDeployCommand from '@/features/commands/deploy.command';
import { useGame } from '@/hooks/useGame';
import classNames from 'classnames';
import { useAccount } from 'wagmi';

export function DeployCommandButton() {
  const { game } = useGame();
  const account = useAccount();

  const { isError, data, isLoading, isSuccess, writeAsync, refetch, error } =
    useDeployCommand();

  const handleClick = async (e) => {
    e.preventDefault();

    if (!account.isConnected) {
      return;
    }

    if (!game.samurai) {
      return;
    }

    await writeAsync({
      recklesslySetUnpreparedArgs: [
        game.samurai.TokenId,
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
      <span>
        {isLoading
          ? 'Deploying...'
          : isSuccess && !isLoading
          ? 'Deployed'
          : 'Deploy'}
      </span>
    </button>
  );
}
