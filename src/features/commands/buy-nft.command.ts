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
    onError: (error: any) => {
      console.log('onError', error);
    },
    onSettled: () => {
      console.log('onSettled');
    },
    onSuccess: (data: any) => {
      console.log('onSuccess', data);
    },
  });

  const { data, error, isError, write } = useContractWrite(config);

  return { data, error, isError, write };
};

export default useBuyNftCommand;
