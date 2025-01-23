import { NextApiRequest, NextApiResponse } from 'next';

const mockSettings = {
  theme: 'dark',
  notifications: true,
  analytics: true,
};

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  res.status(200).json(mockSettings);
}
