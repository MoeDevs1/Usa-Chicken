import { serialize } from 'cookie';
import dbConnect from '@/util/mongo';
import Users1 from '@/models/Users1';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';


export default async function updatePassword(req, res) {
  const { method } = req;
  dbConnect();

  if (method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    res.status(405).json({ message: `Method ${method} Not Allowed` });
    return;
  }

  const { oldEmail, newEmail, oldPassword, newPassword, confirmPassword, firstName, lastName, phone} = req.body;

  // Check if new password and confirm password match
  if (newPassword !== confirmPassword) {
    res.status(400).json({ success: false, message: 'New password and confirm password do not match' });
    return;
  }

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

    // Update user email if provided
    if (oldEmail) {
      // Validate old email
      if (user.email !== oldEmail) {
        res.status(401).json({ success: false, message: 'Invalid old email' });
        return;
      }
      // Check if new email already exists
      if (newEmail && newEmail !== user.email) {
        const existingUser = await Users1.findOne({ email: newEmail });
        if (existingUser) {
          res.status(409).json({ success: false, message: 'Email already exists' });
          return;
        }
      }





      // Update new email
      user.email = newEmail;
    }

      // Update user first name if provided
      if (firstName) {
        user.firstName = firstName;
      }
  
      if (phone) {
        user.phone = phone;
      }
  
      // Update user last name if provided
      if (lastName) {
        user.lastName = lastName;
      }
    // Update user password if provided
    if (oldPassword) {
      // Validate old password
      const validPassword = await bcrypt.compare(oldPassword, user.password);
      if (!validPassword) {
        res.status(404).json({ success: false, message: 'Invalid old password' });
        return;
      }
      // Hash new password
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(newPassword, salt);
      // Update new password
      user.password = hashedPassword;
    }






    // Save user changes
    await user.save();

    if ((oldEmail && newEmail !== oldEmail) || (newPassword && newPassword !== oldPassword)) {
      const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
      res.setHeader('Set-Cookie', serialize('sessionToken', token, {
        httpOnly: true,
        sameSite: 'none',
        secure: true,
        path: '/',
        expires: new Date(Date.now() + 3600000) // set the expiration

    }));
  }
      
    
    // Return success response with success property set to true
    res.status(200).json({ success: true, message: 'User information updated successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: error.message });
  }
}
