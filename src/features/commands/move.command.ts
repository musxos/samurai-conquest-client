import {
  useContractWrite,
  usePrepareContractWrite,
  useWaitForTransaction,
} from 'wagmi';
import Config from '@/app/config';

const useMoveCommand = (_id: any, landId: any) => {
  const { config } = usePrepareContractWrite({
    address: Config.ADDRESS as any,
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
    args: [_id, landId],
  });

  const { data, error, isError, write } = useContractWrite(config);

  const { isLoading, isSuccess } = useWaitForTransaction({
    hash: data?.hash,
  });

  return { data, error, isError, isLoading, isSuccess, write };
};

export function prepareMove(targetLand: number) {
  return true; // TODO: need to check if the move is valid
}

export default useMoveCommand;
