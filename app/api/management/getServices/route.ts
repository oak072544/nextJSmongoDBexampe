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

/**
 * @swagger
 * /api/management/getServices:
 *   get:
 *     summary: Get all services
 *     tags:
 *       - management
 *     responses:
 *       200:
 *         description: Get all services
 *       404:
 *         description: Missing id
 */