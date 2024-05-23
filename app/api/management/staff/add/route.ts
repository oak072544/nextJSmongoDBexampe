import clientPromise from "@lib/mongodb";
import { NextResponse } from "next/server";

type staff = {
    username: string;
    displayname?: string;
    role: string;
}

export async function POST(request: Request) {
    try {
        let client = await clientPromise;
        let db = client.db("project");

        let data: staff = await request.json();

        let addedStaff = await db.collection("user").insertOne({
            username: data.username,
            displayname: data.displayname,
            role: data.role,
        });

        return NextResponse.json(addedStaff, { status: 201 });
    }
    catch (e: any) {
        return NextResponse.json(e, { status: e.status });
    }
}

/**
 * @swagger
 * /api/management/staff/add:
 *   post:
 *     summary: Add new staff
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
 *       201:
 *         description: Created
 *       500:
 *         description: Internal Server Error
 */