import clientPromise from "../../lib/mongodb";

export default async (req, res) => {
  try {
    const client = await clientPromise;
    const db = client.db("project");

    const {
      name,
      image,
      link,
      enable,
    } = req.body;
    const role = req.body.role; // Extract the checked values

    const post = await db.collection("service").insertOne({
      name,
      image,
      role, //น่าจะมาแก้เป็น Array เก็บ boolean ทีหลัง
      link,
      enable,
    });

    res.status(201).json(post);
  } catch (e) {
    console.error(e);
    throw new Error(e).message;
  }
};
