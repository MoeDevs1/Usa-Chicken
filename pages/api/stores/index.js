import dbConnect from "../../../util/mongo";
import Store from "../../../models/store";

const handler = async (req, res) => {
  const { method } = req;

  await dbConnect();

  if (method === "GET") {
    try {
      const stores = await Store.find();
      res.status(200).json(stores);
    } catch (err) {
      res.status(500).json(err);
    }
  } else if (method === "POST") {
    try {
      const store = await Store.create(req.body);
      res.status(201).json(store);
    } catch (err) {
      res.status(500).json(err);
    }
  } else if (method === "PATCH") {
    try {
      const { location, status } = req.body;
  
      const updatedStore = await Store.findOneAndUpdate(
        { location: "manchester" },
        { status },
        { new: true }
      );
  
      if (!updatedStore) {
        return res.status(404).json({ message: "Store not found" });
      }
  
      res.status(200).json(updatedStore);
    } catch (err) {
      res.status(500).json(err);
    }
  }
};

export default handler;
