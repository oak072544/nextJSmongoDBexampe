import { NextRequest, NextResponse } from "next/server";
import clientPromise from "../../../../lib/mongodb";
import { ObjectId } from "mongodb";

export async function POST(request: NextRequest) {
    try {
        let client = await clientPromise;
        let db = client.db("project");
        let id  = request.nextUrl.searchParams.get("id");
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