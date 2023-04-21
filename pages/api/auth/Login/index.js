import { serialize } from 'cookie';
import dbConnect from '@/Utilities/mongo';
import Users1 from '@/models/Users1';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

export default async function login(req, res) {
    const { method } = req;
    dbConnect();

    if (method !== 'POST') {
        res.setHeader('Allow', ['POST']);
        res.status(405).json({ message: `Method ${method} Not Allowed` });
        return;
    }

    const { email, password } = req.body;

    try {
        // Find user by email
        const user = await Users1.findOne({ email });

        if (!user) {
            res.status(401).json({ message: 'Invalid credentials' });
            return;
        }

        // Validate password
        const validPassword = await bcrypt.compare(password, user.password);

        if (!validPassword) {
            res.status(404).json({ message: 'Invalid credentials' });
            return;
        }

        // Generate JWT token with user ID for session
        const sessionToken = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
            expiresIn: '1h',
        });

        // Set session token in cookie
        const cookieValue = serialize('sessionToken', sessionToken, {
            httpOnly: true,
            sameSite: 'none',
            secure: true,
            path: '/',
        });
        res.setHeader('Set-Cookie', cookieValue);

        // Return success response with session token
        res.status(200).json({ sessionToken });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message });
    }
}
