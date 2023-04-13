
import dbConnect from "@/Utilities/mongo";
import Users from "@/models/Users";
import bcrypt from "bcrypt";
import { isEmailExists } from './index.js';


export default async function handler(req, res) {
  const { method } = req;


  dbConnect();

  if (method === "GET") {
    try {
      const signups = await Users.find();
      res.status(200).json(signups);
    } catch (error) {
      res.status(500).json(error);
    }
  }

  if (method === "POST") {
   
   
   
   
    try {
      const { email, password,phone, confirmPassword, confirmEmail, firstName, lastName } = req.body;

      // Check if email already exists
      const userExists = await Users.findOne({ email });
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

      // Check if password and confirmPassword are the same
      if (password !== confirmPassword) {
        return res
          .status(400)
          .json({ error: "Password and confirm password do not match" });
      }

      // Check if email and confirmEmail are the same
      if (email !== confirmEmail) {
        return res
          .status(400)
          .json({ error: "Email and confirm email do not match" });
      }

      const hashedPassword = await bcrypt.hash(password, 3);

      // Create new user
      const newUser = await Users.create({
       
        firstName,
        lastName,
        phone,
        email,
        password: hashedPassword,
        
      });
      

     

      // Makes post from postman neater
      const user = {
        Email: newUser.Email,
        phone: newUser.phone,
        firstName: newUser.firstName,
        lastName: newUser.lastName,
        _id: newUser._id
      };

      res.status(201).json({ success: true, user });
    } catch (error) {
      res.status(500).json({ error: 'Server error' });
    }
  }
}
