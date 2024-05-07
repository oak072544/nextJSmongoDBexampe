import { NextApiRequest, NextApiResponse } from "next";

export async function GET( req: NextApiRequest, res: NextApiResponse) {
    try {
        let { username } = req.body;
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
    }
    catch (e : any) {
        return res.status(500).json({ error: e.message });
    }
}