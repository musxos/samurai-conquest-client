import { lands } from '@/app/land';
import { NextApiRequest, NextApiResponse } from 'next';

const nft_data = [
  {
    TokenId: 1,
    Owner: '0x95d48e177eA89B7d1c21A64A614eeDD795c6B4f5',
    TokenName: '',
    Attack: 0,
    Defence: 0,
    Chakra: 0,
    CurrentAgility: 0,
    MaxAgility: 0,
    Location: 0,
    Season: 0,
    LightStones: 0,
    CampTime: 0,
    DeploymentTime: 0,
    IsInjured: false,
  },
  {
    TokenId: 2,
    Owner: '0xdE9BeCdbe588FF01A348BFDe016871670826D9E4',
    TokenName: 'bb',
    Attack: 5,
    Defence: 3,
    Chakra: 9,
    CurrentAgility: 8,
    MaxAgility: 8,
    Location: 17,
    Season: 1,
    LightStones: 0,
    CampTime: 0,
    DeploymentTime: 0,
    IsInjured: false,
  },
  {
    TokenId: 3,
    Owner: '0xdE9BeCdbe588FF01A348BFDe016871670826D9E4',
    TokenName: 'bb',
    Attack: 4,
    Defence: 6,
    Chakra: 1,
    CurrentAgility: 8,
    MaxAgility: 8,
    Location: 17,
    Season: 1,
    LightStones: 0,
    CampTime: 0,
    DeploymentTime: 0,
    IsInjured: false,
  },
];

// eslint-disable-next-line import/no-anonymous-default-export
export default (req: NextApiRequest, res: NextApiResponse) => {
  const id = req.query.id;

  res.status(200).json(nft_data.find((x) => x.TokenId == Number(id)));
};
