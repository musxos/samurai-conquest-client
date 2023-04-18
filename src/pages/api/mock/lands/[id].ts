import { lands } from '@/app/land';
import { NextApiRequest, NextApiResponse } from 'next';

// eslint-disable-next-line import/no-anonymous-default-export
export default (req: NextApiRequest, res: NextApiResponse) => {
  const id = req.query.id as string;

  res.status(200).json(lands.find((x) => x.id == Number(id)));
};
