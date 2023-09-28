import clientPromise from '../../lib/mongodb'
import { ObjectId } from 'mongodb'

export default async (req,res)=>{
    try{
        const client =await clientPromise;
        const db = client.db("project");
        const {username} = req.query;

        const user = await db.collection("user").findOne({
            username: username
        })
        res.status(200).json(user);
    }
    catch(e){
        console.error(e)
        throw new Error(e).message;
    }
}