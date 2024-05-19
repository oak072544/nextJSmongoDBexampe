import clientPromise from "../../../../lib/mongodb";
import { ObjectId } from "mongodb";
import { NextRequest, NextResponse } from "next/server";

/**
 * @swagger
 * /api/management/deleteService:
 *   delete:
 *     summary: Delete service by id
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
 *         description: Delete service by id
 *       404:
 *         description: Missing id
 */

export async function DELETE(request: NextRequest) {
    try {
        const client = await clientPromise;
        const db = client.db("project");
        let id = request.nextUrl.searchParams.get("id");
        if (!id) {
            return NextResponse.json({ error: "Missing id" });
        }
        const post = await db.collection("service").deleteOne({
            _id: new ObjectId(id),
        });
        return NextResponse.json(post);
    } catch (error) {
        return NextResponse.json(error);
    }
}