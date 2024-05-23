import clientPromise from "@lib/mongodb";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
    try {
        let client = await clientPromise;
        let db = client.db("project");

        let staff = await db.collection("user").find().toArray();

        return NextResponse.json(staff, { status: 200 });
    }
    catch (e: any) {
        return NextResponse.json(e, { status: e.status });
    }
}

/**
 * @swagger
 * /api/management/staff/get:
 *   get:
 *     summary: Get all staff
 *     tags:
 *       - staff management
 *     responses:
 *       200:
 *         description: Successful operation
 *       500:
 *         description: Internal Server Error
 */