import dbConnect from '@/util/mongo';
import Users1 from '@/models/Users1';

export default async function resetEmail(req, res) {
  const { method } = req;
  dbConnect();

  if (method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    res.status(405).json({ message: `Method ${method} Not Allowed` });
    return;
  }

  const { oldEmail, newEmail } = req.body;

  try {
    // Find user by email
    const user = await Users1.findOne({ email: oldEmail });

    if (!user) {
      res.status(400).json({ success: false, message: 'Old email not found' });
      return;
    }

    // Check if new email already exists
    const existingUser = await Users1.findOne({ email: newEmail });

    if (existingUser) {
      res.status(409).json({ success: false, message: 'New email already exists' });
      return;
    }

    // Update user's email
    user.email = newEmail;

    // Save changes
    await user.save();

    res.status(200).json({ success: true, message: 'Email updated successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: error.message });
  }
}
