import { NextRequest, NextResponse } from "next/server";
import clientPromise from "../../../../lib/mongodb";
import { ObjectId } from "mongodb";

export async function POST(request: NextRequest) {
    try {
        let client = await clientPromise;
        let db = client.db("project");
        let id = request.nextUrl.searchParams.get("id");
        if (!id) {
            return NextResponse.json({ error: "Missing id" });
        }
        let { name, description, image, link, enable, role } = await request.json();
        let post = await db.collection("service").updateOne(
            {
                _id: new ObjectId(id),
            },
            {
                $set: {
                    name: name,
                    description: description,
                    image: image,
                    link: link,
                    enable: enable,
                    role: role
                },
            }
        );
        return NextResponse.json(post, { status: 201 });
    }
    catch (e) {
        return NextResponse.json(e);
    }
}

/**
 * @swagger
 * /api/management/editService:
 *   post:
 *     summary: Update a service.
 *     tags:
 *       - management
 *     parameters:
 *       - in: query
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the service to update.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *               image:
 *                 type: string
 *               role:
 *                 type: object
 *                 properties:
 *                   student:
 *                     type: boolean
 *                   exchange_student:
 *                     type: boolean
 *                   alumni:
 *                     type: boolean
 *                   personel:
 *                     type: boolean
 *                   retirement:
 *                     type: boolean
 *                   templecturer:
 *                     type: boolean
 *               link:
 *                 type: string
 *               date:
 *                 type: string
 *               username:
 *                 type: string
 *               enable:
 *                 type: boolean
 *     responses:
 *       '201':
 *         description: Service updated successfully.
 *       '400':
 *         description: Bad request. Missing ID or invalid request body.
 *       '500':
 *         description: Internal server error.
 */