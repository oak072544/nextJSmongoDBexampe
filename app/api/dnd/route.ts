import { NextResponse } from "next/server";
import clientPromise from "../../../lib/mongodb";

export async function POST(request: Request) {
    try {
        let client = await clientPromise;
        let db = client.db("project");

        let data = await request.json();
        let existingData = await db.collection("dnd").find({}).toArray()
        if (existingData.length === 0) {
            await db.collection("dnd").insertOne({ data: data });
        } else {
            await db.collection("dnd").updateOne({}, { $set: { data: data } });
        }

        return NextResponse.json({ status: 'success' }, { status: 200 });
    }
    catch (e) {
        console.error(e);
        return Response.json(e, { status: 500 });
    }
}

export async function GET() {
    try {
        let client = await clientPromise;
        let db = client.db("project");

        let data = await db.collection("dnd").find({}).toArray()

        if (data.length === 0) {
            return NextResponse.json({ data: [] }, { status: 200 });
        }

        return NextResponse.json(data[0], { status: 200 });
    }
    catch (e) {
        console.error(e);
        return Response.json(e, { status: 500 });
    }
}

/**
 * The POST method is used to save the data to the database.
 * The GET method is used to retrieve the data from the database.
 * @swagger
 * /api/dnd:
 *   post:
 *     summary: Save the data to the database.
 *     tags:
 *       - drag and drop
 *     description: Save the data to the database.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               data:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                     name:
 *                       type: string
 *                     link:
 *                       type: string
 *                     picture:
 *                       type: string
 *                     type:
 *                       type: string
 *             required:
 *               - data
 *             example:
 *               data: [
 *                 {
 *                   id: 1,
 *                   name: "Service 1",
 *                   link: "https://www.google.com",
 *                   picture: "/disabledByDefault.svg",
 *                   type: "service",
 *                 },
 *                 {
 *                   id: 2,
 *                   name: "Service 2",
 *                   link: "https://www.google.com",
 *                   picture: "/recommendIcon.svg",
 *                   type: "service",
 *                 },
 *                 {
 *                   id: 3,
 *                   name: "Folder",
 *                   picture: "/folder.svg",
 *                   type: "folder",
 *                 }
 *               ]
 *     responses:
 *       200:
 *         description: Success
 *       500:
 *         description: Internal Server Error
 *   get:
 *     summary: Get the data from the database.
 *     tags:
 *       - drag and drop
 *     description: Get the data from the database.
 *     responses:
 *       200:
 *         description: Success
 *       500:
 *         description: Internal Server Error
 */