import clientPromise from '../../../lib/mongodb'
import { NextApiResponse, NextApiRequest } from 'next'

export default async function handler (_req: NextApiRequest,
    res: NextApiResponse) {
    try
    {

        const client = await clientPromise;
        const db = client.db("posts");

        const posts = await db.collection("posts").find({}).limit(20).toArray();

        res.status(200).json(posts);

    }
    catch (e : any)
    {

        console.error(e);
        throw new Error(e).message;
        res.status(404);
    }
}