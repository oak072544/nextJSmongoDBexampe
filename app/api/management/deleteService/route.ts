import clientPromise from "../../../../lib/mongodb";
import { ObjectId } from "mongodb";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(request: NextRequest) {
    try {
        const client = await clientPromise;
        const db = client.db("project");
        let id = request.nextUrl.searchParams.get("id");
        if (!id) {
            return NextResponse.json({ error: "Missing id" });
        }
        const post = await db.collection("service").deleteOne({
            _id: new ObjectId(id)
        });
        return NextResponse.json(post);
    } catch (error) {
        return NextResponse.json(error);
    }
}