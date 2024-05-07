import clientPromise from "../../../../lib/mongodb";
export async function GET(request: Request) {
    try {
        let client = await clientPromise;
        let db = client.db("project");

        let posts = await db.collection("service").find({}).toArray();
        return Response.json(posts);
    }
    catch (e) {
        return Response.json(e);
    }
}