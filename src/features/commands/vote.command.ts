import {
  useContractWrite,
  usePrepareContractWrite,
  useWaitForTransaction,
} from 'wagmi';
import Config from '@/app/config';
import { useEffect, useState } from 'react';
import useDebounce from '@/hooks/useDebounce';
import { BigNumber } from 'alchemy-sdk';

const useVoteCommand = () => {
  const { data, error, isError, writeAsync } = useContractWrite({
    address: Config.VOTE_ADDRESS as any,
    abi: [
      {
        "inputs": [
          {
            "internalType": "uint32",
            "name": "_id",
            "type": "uint32"
          },
          {
            "internalType": "bool",
            "name": "_vote",
            "type": "bool"
          }
        ],
        "name": "voteForProposal",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
      },
    ],
    functionName: 'voteForProposal',
    mode: 'recklesslyUnprepared',
  });

  return {
    data,
    error,
    isError,
    writeAsync,
  };
};

export default useVoteCommand;
