import clientPromise from "@lib/mongodb";
import { NextResponse } from "next/server";

type staff = {
    username: string;
    displayname?: string;
    role: string;
}

export async function PUT(request: Request) {
    try {
        let client = await clientPromise;
        let db = client.db("project");

        let data: staff = await request.json();

        let updatedStaff = await db.collection("user").updateOne(
            { username: data.username },
            { $set: { displayname: data.displayname, role: data.role } }
        );

        return NextResponse.json(updatedStaff, { status: 200 });
    }
    catch (e: any) {
        return NextResponse.json(e, { status: e.status });
    }
}

/**
 * @swagger
 * /api/management/staff/edit:
 *   put:
 *     summary: Update staff details
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
 *               displayname:
 *                 type: string
 *               role:
 *                 type: string
 *             example:
 *               username: "staff"
 *               displayname: "staff"
 *               role: "staff"
 *     responses:
 *       200:
 *         description: Successful operation
 *       500:
 *         description: Internal Server Error
 */