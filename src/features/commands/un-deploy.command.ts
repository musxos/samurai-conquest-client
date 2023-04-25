import {
  useContractWrite,
  usePrepareContractWrite,
  useWaitForTransaction,
} from 'wagmi';
import Config from '@/app/config';

const useUndeployCommand = () => {
  const { config, refetch } = usePrepareContractWrite({
    address: Config.GAME_ADDRESS as any,
    abi: [
      {
        "inputs": [
          {
            "internalType": "uint256",
            "name": "_id",
            "type": "uint256"
          }
        ],
        "name": "undeploySamurai",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
      }
    ],
    functionName: 'undeploySamurai',
    enabled: false
  });

  const { data, error, isError, writeAsync } = useContractWrite({
    ...config,
    mode: 'recklesslyUnprepared'
  });

  const { isLoading, isSuccess } = useWaitForTransaction({
    hash: data?.hash,
  });

  return { data, error, isError, isLoading, isSuccess, writeAsync, refetch };
};

export default useUndeployCommand;
