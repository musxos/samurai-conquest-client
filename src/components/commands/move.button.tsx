'use client';

import {
  useContractWrite,
  usePrepareContractWrite,
  useWaitForTransaction,
} from 'wagmi';

export function MoveButton({
  land_id,
  nft_id,
}: {
  land_id: number;
  nft_id: number;
}) {
  const { config } = usePrepareContractWrite({
    address: '0xc9C10e4635937228A554754BD727304905B2259F',
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
    args: [nft_id, land_id],
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
      {!isSuccess && <span>{isLoading ? 'Moving...' : 'Move'}</span>}
      {isSuccess && <span>Move</span>}
      {isError && <span className="text-red-500">{error.message}</span>}
    </button>
  );
}

// TODO: eğer bulunduğu bölgede ise ve modal orada aktif ise "moved" yazacak eğer başka bir bölgedeyse "move"
