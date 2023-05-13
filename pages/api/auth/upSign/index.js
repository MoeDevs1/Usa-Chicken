import dbConnect from "@/Utilities/mongo";
import Users1 from "@/models/Users1";
import bcrypt from "bcrypt";
import { v4 as uuidv4 } from "uuid";

dbConnect();

export default async function handler(req, res) {
  const { method } = req;

  if (method === "GET") {
    try {
      const signups = await Users1.find();
      res.status(200).json(signups);
    } catch (error) {
      res.status(500).json(error);
    }
  }

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

      // Return the newly created user
      const user = {
        userId: newUser.userId,
        firstName: newUser.firstName,
        lastName: newUser.lastName,
        phone: newUser.phone,
        email: newUser.email,
      };

      res.status(201).json({ success: true, user });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}
