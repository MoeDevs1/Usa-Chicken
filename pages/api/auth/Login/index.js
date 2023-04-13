import { parse, serialize } from 'cookie';
import dbConnect from '@/Utilities/mongo';
import User from '@/models/Users';
import Session from '@/models/Session';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export default async function login(req, res) {
  const { method } = req;
  dbConnect();

  if (method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    res.status(405).json({ message: `Method ${method} Not Allowed` });
    return;
  }

  const { email, password, rememberMe } = req.body;

  try {
    // Find user by email
    const user = await User.findOne({ email });

    if (!user) {
      res.status(401).json({ message: 'Invalid credentials' });
      return;
    }

    // Validate password
    const validPassword = await bcrypt.compare(password, user.password);

    if (!validPassword) {
      res.status(401).json({ message: 'Invalid credentials' });
      return;
    }

    // Generate JWT token with user ID for session
    const sessionToken = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: '1h',
    });

    // Save session with token
    const session = new Session({ userId: user._id, token: sessionToken });
    await session.save();

    // Generate "remember me" token
    let rememberMeToken = null;

    if (rememberMe) {
      // Check for existing "remember me" cookie
      const cookies = parse(req.headers.cookie || '');
      const existingRememberMeToken = cookies.rememberMeToken;

      if (existingRememberMeToken) {
        // Verify and decode existing "remember me" token
        try {
          const decodedToken = jwt.verify(existingRememberMeToken, process.env.JWT_SECRET);
          rememberMeToken = existingRememberMeToken;
        } catch (error) {
          console.error(error);
          // Existing "remember me" token is invalid, generate a new one
          rememberMeToken = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
            expiresIn: '30d',
          });
          console.log('Invalid existing "remember me" token. Generated a new one.');
        }
      } else {
        // No existing "remember me" token, generate a new one
        rememberMeToken = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
          expiresIn: '30d',
        });
        console.log('No existing "remember me" token. Generated a new one.');
      }

      // Set "remember me" cookie
      const cookieOptions = {
        httpOnly: true,
        sameSite: 'strict',
        maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
      };
      const serializedCookieValue = serialize('rememberMe', rememberMeToken, cookieOptions);
      res.setHeader('Set-Cookie', serializedCookieValue);
    }

    // Return success response with session token and remember me token
    res.status(200).json({ sessionToken, rememberMeToken });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
}
