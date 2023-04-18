'use client';

import {
  useContractWrite,
  usePrepareContractWrite,
  useWaitForTransaction,
} from 'wagmi';

export function DeployButton({ nft_id }: any) {
  const { config } = usePrepareContractWrite({
    address: '0x908e26348d30181E39Fd9e18672383F09a775Cb2',
    abi: [
      {
        inputs: [
          {
            internalType: 'uint256',
            name: '_id',
            type: 'uint256',
          },
        ],
        name: 'deploySamurai',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
      },
    ],
    functionName: 'deploySamurai',
    args: [nft_id],
  });

  const { data, error, isError, write } = useContractWrite(config);

  const { isLoading, isSuccess } = useWaitForTransaction({
    hash: data?.hash,
  });

  return (
    <button
      disabled={!write || isLoading}
      onClick={(e) => {
        e.preventDefault();

        write();
      }}
      className="flex items-center justify-center rounded-full bg-neutral-950/50 px-4 py-2 disabled:bg-neutral-950/10"
    >
      <i className="ri-sword-line mr-1 text-2xl"></i>
      <span>{isLoading ? 'Minting...' : 'Deploy'}</span>
      {isError && <span className="text-red-500">{error.message}</span>}
    </button>
  );
}
