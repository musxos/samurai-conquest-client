import { useContractWrite, usePrepareContractWrite } from 'wagmi';
import Config from '@/app/config';

const useJoinWarCommand = () => {
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
        "name": "jSamurai",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
      }
    ],
    functionName: 'jSamurai',
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

export default useJoinWarCommand;
