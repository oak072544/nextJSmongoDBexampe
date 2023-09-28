import clientPromise from "../../lib/mongodb";

export default async (req, res) => {
  try {
    const client = await clientPromise;
    const db = client.db("project");

    const {
      name,
      description,
      image,
      link,
      date,
      username,
      enable,
    } = req.body;
    const role = req.body.role; // Extract the checked values

    const service = await db.collection("service").insertOne({
      name,
      description,
      image,
      role, //น่าจะมาแก้เป็น Array เก็บ boolean ทีหลัง
      link,
      date,
      username,
      enable,
    });

    res.status(201).json(service);
  } catch (e) {
    console.error(e);
    throw new Error(e).message;
  }
};
