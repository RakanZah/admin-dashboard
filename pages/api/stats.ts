import { NextApiRequest, NextApiResponse } from 'next';

const mockStats = {
  trips: 1200,
  causewayCount: 5400,
  activeUsers: 325,
};

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  res.status(200).json(mockStats);
}
