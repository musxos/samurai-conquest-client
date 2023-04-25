import {
  useContractWrite,
  usePrepareContractWrite,
  useWaitForTransaction,
} from 'wagmi';
import Config from '@/app/config';

const useMoveCommand = () => {
  const { config, refetch } = usePrepareContractWrite({
    address: Config.GAME_ADDRESS as any,
    abi: [
      {
        inputs: [
          {
            internalType: 'uint8',
            name: '_id',
            type: 'uint8',
          },
          {
            internalType: 'uint8',
            name: '_target',
            type: 'uint8',
          },
        ],
        name: 'moveSamurai',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
      },
    ],
    functionName: 'moveSamurai',
    enabled: false,
  });

  const { data, error, isError, writeAsync } = useContractWrite({
    ...config,
    mode: 'recklesslyUnprepared',
  });

  const { isLoading, isSuccess } = useWaitForTransaction({
    hash: data?.hash,
  });

  return { data, error, isError, isLoading, isSuccess, writeAsync, refetch };
};

export function prepareMove(targetLand: number) {
  return true; // TODO: need to check if the move is valid
}

export default useMoveCommand;
