import { NextRequest, NextResponse } from "next/server";
import clientPromise from "../../../../lib/mongodb";
import { ObjectId } from "mongodb";

export async function GET(request: NextRequest) {
    try {
        let client = await clientPromise;
        let db = client.db("project");
        let id = request.nextUrl.searchParams.get("id");
        if (!id) {
            return NextResponse.json({ error: "Missing id" });
        }
        let post = await db.collection("service").findOne({
            _id: new ObjectId(id)
        })
        return NextResponse.json(post);
    }
    catch (e) {
        return NextResponse.json(e);
    }
}

/**
 * @swagger
 * /api/management/getService:
 *   get:
 *     summary: Get a service by id
 *     tags:
 *       - management
 *     parameters:
 *       - name: id
 *         in: query
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Get a service by id
 *       404:
 *         description: Missing id
 */