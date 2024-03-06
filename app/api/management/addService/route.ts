import { NextResponse } from "next/server";
import clientPromise from "../../../../lib/mongodb";

type service = {
    name?: string,
    description?: string,
    image?: string,
    link?: string,
    date?: string,
    username?: string,
    enable?: boolean,
    role?: role,
}

type role = {
    student?: boolean,
    exchange_student?: boolean,
    alumni?: boolean,
    personel?: boolean,
    retirement?: boolean,
    templecturer?: boolean,
}

export async function POST(request: Request) {
    try {
        let client = await clientPromise;
        let db = client.db("project");

        let data: service = await request.json();

        let addedService = await db.collection("service").insertOne({
            name: data.name,
            description: data.description,
            image: data.image,
            role: data.role, //น่าจะมาแก้เป็น Array เก็บ boolean ทีหลัง
            link: data.link,
            date: data.date,
            username: data.username,
            enable: data.enable,
        });

        return NextResponse.json(addedService, { status : 201 });

    }
    catch (e) {
        return Response.json(e);
    }
}