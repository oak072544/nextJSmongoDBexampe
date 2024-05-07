import { NextRequest, NextResponse } from "next/server";
import clientPromise from "../../../../lib/mongodb";

export async function POST(request: NextRequest) {
    try {
        let client = await clientPromise;
        let db = client.db("project");
        let { search } = await request.json();
        let post = await db.collection("service").find({ $text: { $search: search } }).project({ _id: 0, name: 1 }).toArray();
        return NextResponse.json(post, { status: 201 });
        /* return NextResponse.json({ search }); */
    }
    catch (e: any) {
        return NextResponse.json({ error: e.message });
    }
}