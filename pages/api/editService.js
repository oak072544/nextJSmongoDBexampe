import clientPromise from "../../lib/mongodb";
import { ObjectId } from "mongodb";

export default async (req, res) => {
  try {
    const client = await clientPromise;
    const db = client.db("project");
    const { id } = req.query;
    const { name, description,image, link ,enable} = req.body;
    const role = req.body.role;

    const post = await db.collection("service").updateOne(
      {
        _id: new ObjectId(id),
      },
      {
        $set: {
          name: name,
          description : description,
          image: image,
          role: role,
          link: link,
          enable: enable,
        },
      }
    );
    res.json(post);
  } catch (e) {
    console.error(e);
    throw new Error(e).message;
  }
};
