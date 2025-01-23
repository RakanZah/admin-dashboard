import { NextApiRequest, NextApiResponse } from 'next';

const mockUsers = [
  { id: 1, name: 'John Doe', email: 'john.doe@example.com', role: 'Admin' },
  { id: 2, name: 'Jane Smith', email: 'jane.smith@example.com', role: 'User' },
  { id: 3, name: 'Alice Johnson', email: 'alice.johnson@example.com', role: 'Moderator' },
];

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  res.status(200).json(mockUsers);
}
