import { useContractWrite, usePrepareContractWrite } from 'wagmi';
import Config from '@/app/config';

const useNameSamuraiCommand = () => {
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
          {
            internalType: 'string',
            name: '_name',
            type: 'string',
          },
        ],
        name: 'nameSamurai',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
      },
    ],
    functionName: 'nameSamurai',
    enabled: false,
  });

  const { data, error, isError, writeAsync } = useContractWrite({
    ...config,
    mode: 'recklesslyUnprepared',
  });

  return {
    data,
    error,
    isError,
    writeAsync,
    refetch,
  };
};

export default useNameSamuraiCommand;
