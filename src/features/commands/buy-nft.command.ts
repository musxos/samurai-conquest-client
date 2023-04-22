import {
  useContractWrite,
  usePrepareContractWrite,
  useWaitForTransaction,
} from 'wagmi';
import Config from '@/app/config';

const useBuyNftCommand = (_id: any) => {
  const { config } = usePrepareContractWrite({
    address: Config.MARKETPLACE_ADDRESS as any,
    abi: [
      {
        inputs: [
          {
            internalType: 'uint256',
            name: 'Id',
            type: 'uint256',
          },
        ],
        name: 'buyNFT',
        outputs: [],
        stateMutability: 'payable',
        type: 'function',
      },
    ],
    functionName: 'buyNFT',
    args: [_id],
    enabled: false,
  });

  const { data, error, isError, write } = useContractWrite(config);

  const { isLoading, isSuccess } = useWaitForTransaction({
    hash: data?.hash,
  });

  return { data, error, isError, isLoading, isSuccess, write };
};

export default useBuyNftCommand;
