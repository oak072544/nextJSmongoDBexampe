import { NextApiResponse, NextApiRequest } from 'next';
import https from 'https';

export default async function handler (_req: NextApiRequest,
    res: NextApiResponse) {
    try {
        const { username } = _req.body;

        const info = await fetch("https://api.account.kmutnb.ac.th/api/account-api/user-info", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${process.env.ACCESS_TOKEN}`
            },
            body: JSON.stringify({
                username: username,
            }), // Assign the agent to the fetch configuration
        });

        const infoData = await info.json();
        let statuscode = infoData.api_status_code;

        res.status(statuscode).json(infoData);
    } catch (e : any) {
        console.error(e);
        res.status(404).json({ error:  e.message });
    }
}
