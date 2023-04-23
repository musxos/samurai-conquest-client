import {
  useContractWrite,
  usePrepareContractWrite,
  useWaitForTransaction,
} from 'wagmi';
import Config from '@/app/config';

const useMintCommand = (address: any) => {
  const { config, refetch } = usePrepareContractWrite({
    address: Config.SAMURAI_WARRIORS_ADDRESS as any,
    abi: [
      {
        inputs: [
          {
            internalType: 'address',
            name: 'to',
            type: 'address',
          },
        ],
        name: 'safeMint',
        outputs: [
          {
            internalType: 'uint256',
            name: '',
            type: 'uint256',
          },
        ],
        stateMutability: 'nonpayable',
        type: 'function',
      },
    ],
    functionName: 'safeMint',
    args: [address],
  });

  const { data, error, isError, write, writeAsync } = useContractWrite(config);

  const { isLoading, isSuccess } = useWaitForTransaction({
    hash: data?.hash,
  });

  return {
    data,
    error,
    isError,
    isLoading,
    isSuccess,
    write,
    writeAsync,
    refetch,
  };
};

export function prepareMove(targetLand: number) {
  return true; // TODO: need to check if the move is valid
}

export default useMintCommand;
