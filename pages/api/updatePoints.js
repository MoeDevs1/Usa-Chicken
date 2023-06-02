import { serialize } from 'cookie';
import dbConnect from '@/util/mongo';
import Users1 from '@/models/Users1';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

export default async function updatePoints(req, res) {
  const { method } = req;
  dbConnect();

  if (method !== 'PUT') {
    res.setHeader('Allow', ['PUT']);
    res.status(405).json({ message: `Method ${method} Not Allowed` });
    return;
  }

  const { points } = req.body;

  try {
    // Get user ID from session token
    const sessionToken = req.cookies.sessionToken;
    const decodedToken = jwt.verify(sessionToken, process.env.JWT_SECRET);
    const userId = decodedToken.userId;

    // Find user by ID
    const user = await Users1.findById(userId);

    if (!user) {
      res.status(400).json({ success: false, message: 'Invalid session' });
      return;
    }

    // Update the points for the user
    user.points = points;

    // Save user changes
    await user.save();

    // Return success response with success property set to true
    res.status(200).json({ success: true, message: 'Points updated successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: error.message });
  }
}