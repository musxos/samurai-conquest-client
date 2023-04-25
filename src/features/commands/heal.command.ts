import {
  useContractWrite,
  usePrepareContractWrite,
  useWaitForTransaction,
} from 'wagmi';
import Config from '@/app/config';

const useHealCommand = () => {
  const { config, refetch } = usePrepareContractWrite({
    address: Config.GAME_ADDRESS as any,
    abi: [
      {
        inputs: [
          {
            internalType: 'uint256',
            name: '_id',
            type: 'uint256',
          },
        ],
        name: 'healSamurai',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
      },
    ],
    functionName: 'healSamurai',
    enabled: false,
  });

  const { data, error, isError, writeAsync } = useContractWrite({
    ...config,
    mode: 'recklesslyUnprepared',
  });

  return { data, error, isError, writeAsync, refetch };
};

export default useHealCommand;
