import {
  useContractWrite,
  usePrepareContractWrite,
  useWaitForTransaction,
} from 'wagmi';
import Config from '@/app/config';

const useRegisterCommand = (nickname: string, refer: any) => {
  const { config, refetch } = usePrepareContractWrite({
    address: Config.GAME_ADDRESS as any,
    abi: [
      {
        inputs: [
          {
            internalType: 'string',
            name: '_nickName',
            type: 'string',
          },
          {
            internalType: 'address',
            name: '_refer',
            type: 'address',
          },
        ],
        name: 'register',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
      },
    ],
    functionName: 'register',
    args: [nickname, refer],
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
export default useRegisterCommand;
