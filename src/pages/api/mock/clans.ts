import { NextApiRequest, NextApiResponse } from 'next';

export default (req: NextApiRequest, res: NextApiResponse) => {
  res.status(200).json([
    { lightStones: '0', ID: '1', baseLocation: '1' },
    { lightStones: '0', ID: '2', baseLocation: '17' },
    { lightStones: '0', ID: '3', baseLocation: '23' },
  ]);
};
