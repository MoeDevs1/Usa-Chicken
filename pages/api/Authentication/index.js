import { serialize } from 'cookie';
import dbConnect from '@/util/mongo';
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

    const { email, password, firstName, lastName, rememberMe } = req.body;

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

        // Generate session token with user ID
        const sessionToken = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
            expiresIn: '1h',
        });

        // Set session token cookie
        const sessionCookie = serialize('sessionToken', sessionToken, {
            httpOnly: true,
            sameSite: 'lax',
            secure: false, // change secure attribute for testing
            path: '/',
          });
          

        // Generate "remember me" token if checkbox is checked
        if (rememberMe) {
            const rememberMeToken = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
                expiresIn: '90d',
            });

            // Set "remember me" token cookie
            const rememberMeCookie = serialize('rememberMeToken', rememberMeToken, {
                httpOnly: true,
                sameSite: 'none',
                secure: true,
                path: '/',
                maxAge: 90 * 24 * 60 * 60, // 90 days in seconds
            });

            // Set both session and "remember me" token cookies
            res.setHeader('Set-Cookie', [sessionCookie, rememberMeCookie]);
        } else {
            // Set only session token cookie
            res.setHeader('Set-Cookie', sessionCookie);
        }

        // Return success response with session token
        res.status(200).json({ sessionToken , rememberMe});
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message });
    }
}
