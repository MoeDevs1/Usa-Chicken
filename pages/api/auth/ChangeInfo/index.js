import dbConnect from '@/Utilities/mongo';
import User from '@/models/Users';
import Session from '@/models/Session'
import bcrypt from 'bcrypt';

export default async function handler(req, res) {
  const { method } = req;


  dbConnect();

 
  if (method === "POST") {
   
    try {


      // Get session token and user ID from request headers
      const token = req.headers.authorization.split(' ')[1];
      const session = await Session.findOne({ token }).populate('userId');
      const { userId } = session;
  
      // Find user document in the database
      const user = await User.findById(userId);
  
      // Compare old password with password in database
      const { oldPassword, newPassword, confirmNewPassword } = req.body;
      const passwordMatch = await bcrypt.compare(oldPassword, user.password);
  
      if (!passwordMatchgit) {
        return res.status(400).json({ message: 'Incorrect old password' });
      }
  
      // Hash new password and update user document
      if (newPassword === confirmNewPassword) {
        const hashedPassword = await bcrypt.hash(newPassword, 10);
        user.password = hashedPassword;
        await user.save();
        return res.status(200).json({ message: 'Password updated successfully' });
      } else {
        return res.status(400).json({ message: 'New passwords do not match' });
      }
    } catch (err) {
      console.error(err);
      return res.status(500).json({ message: 'Server error' });
    }
}

}
