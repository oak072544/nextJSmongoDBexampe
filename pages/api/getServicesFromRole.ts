import { ObjectId } from 'mongodb';
import clientPromise from '../../lib/mongodb'
import { NextApiResponse, NextApiRequest } from 'next'

export default async function handler (_req: NextApiRequest,
    res: NextApiResponse) {
    try
    {

        const client = await clientPromise;
        const db = client.db("project");
        const {role} = _req.query;

        const posts = await db.collection("service").find({
            role : role
        }).toArray(); //ลบ .limit() ไป

        res.status(200).json(posts);

    }
    catch (e : any)
    {

        console.error(e);
        throw new Error(e).message;
        res.status(404);
    }
}