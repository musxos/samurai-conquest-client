'use client';

import {
  useContractWrite,
  usePrepareContractWrite,
  useWaitForTransaction,
} from 'wagmi';

export function HealButton({ nft_id }: { nft_id: any }) {
  const { config } = usePrepareContractWrite({
    address: '0xc9C10e4635937228A554754BD727304905B2259F',
    abi: [
      {
        inputs: [
          {
            internalType: 'uint256',
            name: '_id',
            type: 'uint256',
          },
        ],
        name: 'healSamurai',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
      },
    ],
    functionName: 'healSamurai',
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
      {!isSuccess && <span>{isLoading ? 'Healing...' : 'Heal'}</span>}
      {isSuccess && <span>Heal</span>}
      {isError && <span className="text-red-500">{error.message}</span>}
    </button>
  );
}

// TODO: HEAL SAMURAI SADECE BASE NOKTASINDAYKEN ÇALIŞIR (!!KENDİ KLANININ BÖLGESİ!!)
