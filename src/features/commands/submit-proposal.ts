import {
  useContractWrite,
  usePrepareContractWrite,
  useWaitForTransaction,
} from 'wagmi';
import Config from '@/app/config';
import { useEffect, useState } from 'react';

const useSubmitProposalCommand = () => {
  const { config, refetch } = usePrepareContractWrite({
    address: Config.VOTE_ADDRESS as any,
    abi: [
      {
        inputs: [
          { internalType: 'string', name: '_title', type: 'string' },
          { internalType: 'string', name: '_proposal', type: 'string' },
        ],
        name: 'submitProposal',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
      },
    ],
    functionName: 'submitProposal',
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

export default useSubmitProposalCommand;
