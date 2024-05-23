import clientPromise from "@lib/mongodb";
import { NextResponse } from "next/server";

export async function DELETE(request: Request) {
    try {
        let client = await clientPromise;
        let db = client.db("project");

        let data = await request.json();

        let deletedStaff = await db.collection("user").deleteOne(
            { username: data.username }
        );

        return NextResponse.json(deletedStaff, { status: 200 });
    }
    catch (e: any) {
        return NextResponse.json(e, { status: e.status });
    }
}

/**
 * @swagger
 * /api/management/staff/delete:
 *   delete:
 *     summary: Delete staff
 *     tags:
 *       - staff management
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *             example:
 *               username: "staff"
 *     responses:
 *       200:
 *         description: Successful operation
 *       500:
 *         description: Internal Server Error
 */