import { NextApiRequest, NextApiResponse } from 'next';

export default (req: NextApiRequest, res: NextApiResponse) => {
  res.status(200).json({
    nickName: 'batuhan',
    address: '0xdaEf330fA57b4d968a70eF18C91977c59f612F52',
    clan: 3,
    refer: '0x680F7E1D576613287e087f9716E6cCB4CcDd8172',
    point: 4,
  });
};
