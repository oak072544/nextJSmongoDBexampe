import { NextRequest, NextResponse } from "next/server";

export async function POST(req: Request, res: NextResponse) {
    try {
        let { username } = await req.json();
        const info = await fetch("https://api.account.kmutnb.ac.th/api/account-api/user-info", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${process.env.ACCESS_TOKEN}`
            },
            body: JSON.stringify({
                username: username
            }), // Assign the agent to the fetch configuration
        });
        const response = await info.json();
        return NextResponse.json(response, { status: 200 });
    }
    catch (e: any) {
        return NextResponse.json(e, { status: e.status });
    }
}

/**
 * @swagger
 * /api/management/userInfo:
 *   post:
 *     summary: Get user info
 *     tags:
 *       - KMUTNB
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
 *               username: "sxxxxxxxxxxxxx"
 *     responses:
 *       200:
 *         description: Successful operation
 *       500:
 *         description: Internal Server Error
 */