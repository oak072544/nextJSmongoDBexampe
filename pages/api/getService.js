import clientPromise from '../../lib/mongodb'
import { ObjectId } from 'mongodb'

export default async (req,res)=>{
    try{
        const client =await clientPromise;
        const db = client.db("project");
        const {id} = req.query;

        const post = await db.collection("service").findOne({
            _id: new ObjectId(id)
        })
        res.status(200).json(post);
    }
    catch(e){
        console.error(e)
        throw new Error(e).message;
    }
}