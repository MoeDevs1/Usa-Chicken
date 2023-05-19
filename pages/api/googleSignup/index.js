import dbConnect from "@/util/mongo";
// import GoogleUsers from "@/models/GoogleUsers";

dbConnect();

export default async function handler(req, res) {
  const { method } = req;

  if (method === "POST") {
    const { firstName, lastName, email } = req.body;

    // Check if the email already exists in the database
    const existingUser = await GoogleUsers.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User with this email already exists" });
    }

    // Create a new user with the provided information
    const newUser = new GoogleUsers({ firstName, lastName, email });

    // Save the new user to the database
    await newUser.save();

    // Send a success response
    res.status(201).json({ message: "User created successfully", user: newUser });
  } else {
    res.setHeader("Allow", "POST");
    res.status(405).json({ message: `Method ${method} not allowed` });
  }
}
