// pages/api/auth/getUserDetails.js
import jwt from 'jsonwebtoken';
import dbConnect from '@/util/mongo';
import Users1 from '@/models/Users1';

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

    if (req.query.signout === 'true') {
      // Clear the session cookie by setting an expired date in the past
      res.setHeader('Set-Cookie', [
        'sessionToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;',
      ]);
      
      // If the user signed in with Google, redirect to Google's logout URL
   
        res.status(200).json({ message: 'Signed out successfully' });
      
      
      return;
    }

    res.status(200).json({ firstName: user.firstName, lastName: user.lastName, phone: user.phone, email: user.email, points: user.points});
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
}