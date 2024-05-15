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
            return NextResponse.json({ data: null }, { status: 200 });
        }

        return NextResponse.json(data[0], { status: 200 });
    }
    catch (e) {
        console.error(e);
        return Response.json(e, { status: 500 });
    }
}