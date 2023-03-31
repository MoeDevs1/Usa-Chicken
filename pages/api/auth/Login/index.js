import dbConnect from "@/Utilities/mongo";
import Users from "@/models/Users";
import bcrypt from "bcrypt";

export default async function login(req, res) {
  const { method } = req;

  dbConnect();

  const { email, password } = req.body;

  // Check if email exists in the database
  const user = await Users.findOne({ email });
  if (!user) {
    return res.json({ status: 'Not able to find user' });
  }

  // Compare the password with the hashed password in the database
  const isPasswordMatch = await bcrypt.compare(password, user.password);
  if (!isPasswordMatch) {
    return res.json({ status: 'Incorrect password' });
  }

  // Return a success message with the user's ID
  res.json({ status: 'success', userId: user._id });
}
