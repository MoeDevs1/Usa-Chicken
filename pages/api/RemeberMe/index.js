import { serialize } from 'cookie';
import dbConnect from '@/util/mongo';
import Users1 from '@/models/Users1';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';



export default async function getUserDetails(req, res) {
  const { method } = req;
  dbConnect();

  if (method !== 'GET') {
    res.setHeader('Allow', ['GET']);
    res.status(405).json({ message: `Method ${method} Not Allowed` });
    return;
  }

  try {
    const token = req.cookies.sessionToken;

    if (!token) {
      res.status(401).json({ message: 'Unauthorized' });
      return;
    }

    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    const user = await Users1.findById(decodedToken.userId);

    if (!user) {
      res.status(404).json({ message: 'User not found' });
      return;
    }


    res.status(200).json({ password: decryptedPassword, email: user.email }); // Send decrypted password in the JSON response
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
}
