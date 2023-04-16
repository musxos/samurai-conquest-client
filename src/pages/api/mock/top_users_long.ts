import { NextApiRequest, NextApiResponse } from 'next';

export default (req: NextApiRequest, res: NextApiResponse) => {
  res.status(200).json([
    {
      nickName: 'batuhan',
      address: '0xdaEf330fA57b4d968a70eF18C91977c59f612F52',
      clan: 3,
      refer: '0x680F7E1D576613287e087f9716E6cCB4CcDd8172',
      point: 4,
    },
    {
      nickName: 'sinyordes2',
      address: '0xdE9BeCdbe588FF01A348BFDe016871670826D9E4',
      clan: 2,
      refer: '0x680F7E1D576613287e087f9716E6cCB4CcDd8172',
      point: 6,
    },
    {
      nickName: 'sinyordes',
      address: '0xdE9BeCdbe588FF01A348BFDe016871670826D9E4',
      clan: 2,
      refer: '0x680F7E1D576613287e087f9716E6cCB4CcDd8172',
      point: 3,
    },
    {
      nickName: 'sinyordes3',
      address: '0xdE9BeCdbe588FF01A348BFDe016871670826D9E4',
      clan: 2,
      refer: '0x680F7E1D576613287e087f9716E6cCB4CcDd8172',
      point: 15,
    },
    {
      nickName: 'aloshai',
      address: '0x95d48e177eA89B7d1c21A64A614eeDD795c6B4f5',
      clan: 2,
      refer: '0x680F7E1D576613287e087f9716E6cCB4CcDd8172',
      point: 15,
    },
  ]);
};
