import {
  useContractWrite,
  usePrepareContractWrite,
  useWaitForTransaction,
} from 'wagmi';
import Config from '@/app/config';

const useOpenboxCommand = (_boxId: any) => {
  const { config, refetch } = usePrepareContractWrite({
    address: Config.SAMURAI_WARRIORS_ADDRESS as any,
    abi: [
      {
        inputs: [
          {
            internalType: 'uint256',
            name: '_id',
            type: 'uint256',
          },
        ],
        name: 'openBox',
        outputs: [
          {
            internalType: 'uint256',
            name: '',
            type: 'uint256',
          },
          {
            internalType: 'uint8',
            name: '',
            type: 'uint8',
          },
          {
            internalType: 'uint8',
            name: '',
            type: 'uint8',
          },
          {
            internalType: 'uint8',
            name: '',
            type: 'uint8',
          },
          {
            internalType: 'uint8',
            name: '',
            type: 'uint8',
          },
        ],
        stateMutability: 'nonpayable',
        type: 'function',
      },
    ],
    functionName: 'openBox',
    args: [_boxId],
  });

  const { data, error, isError, reset, writeAsync } = useContractWrite(config);

  const { isLoading, isSuccess } = useWaitForTransaction({
    hash: data?.hash,
  });

  return {
    data,
    error,
    isError,
    isLoading,
    isSuccess,
    reset,
    writeAsync,
    refetch,
  };
};

export function prepareMove(targetLand: number) {
  return true; // TODO: need to check if the move is valid
}

export default useOpenboxCommand;
