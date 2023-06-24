import dbConnect from "@/util/mongo";
import Users1 from "@/models/Users1";
import bcrypt from "bcrypt";
import { v4 as uuidv4 } from "uuid";
import jwt from 'jsonwebtoken';
import { serialize } from 'cookie';
dbConnect();

export default async function handler(req, res) {
  const { method } = req;

  if (method === "POST") {
    try {
      const { email, password, phone, firstName, lastName } = req.body;

      // Check if email already exists
      const userExists = await Users1.findOne({ email });
      if (userExists) {
        return res.status(400).json({ error: "Email already exists" });
      }

      // Check if firstName and lastName are present in request body
      if (!firstName || !lastName) {
        return res
          .status(400)
          .json({ error: "First name and last name are required" });
      }

      // Check if password length is at least 5 characters
      if (password.length < 5) {
        return res
          .status(400)
          .json({ error: "Password should be at least 5 characters long" });
      }

      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      // Generate a unique userId
      const userId = uuidv4();

      // Create new user
      const newUser = await Users1.create({
        userId,
        firstName,
        lastName,
        phone,
        email,
        password: hashedPassword,
      });

      // Generate a session token
      const sessionToken = jwt.sign({ userId: newUser._id }, process.env.JWT_SECRET, {
        expiresIn: '1h',
      });

      // Set session token cookie
      const sessionCookie = serialize('sessionToken', sessionToken, {
        httpOnly: true,
        sameSite: 'lax',
        secure: false, // change secure attribute for testing
        path: '/',
      });

      // Set the session token cookie in the response
      res.setHeader('Set-Cookie', sessionCookie);

      // Instead of returning user info directly, just send the session token
      res.status(201).json({ success: true, sessionToken });

    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}
