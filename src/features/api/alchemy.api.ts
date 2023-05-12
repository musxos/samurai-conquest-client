import { Alchemy, Network } from 'alchemy-sdk';
import Config from '@/app/config';

const config = {
  apiKey: '_bRRvCIltATq3Pb04FYULVSpBBvoJLIq',
  network: Network.MATIC_MUMBAI,
};

const alchemy = new Alchemy(config);

const getNftsForOwner = async (owner: any) => {
  const response = await alchemy.nft.getNftsForOwner(owner, {
    contractAddresses: [Config.SAMURAI_WARRIORS_ADDRESS],
  });

  return {
    ...response,
  };
};

export { getNftsForOwner, alchemy };
