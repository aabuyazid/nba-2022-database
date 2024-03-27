import type { NextApiRequest, NextApiResponse} from "next" 
import { PrismaClient } from "@prisma/client";

const client = new PrismaClient()

export default async function (
    req: NextApiRequest,
    res: NextApiResponse,
) {
    if(req.method !== "POST") {
        res.status(400).json({"message": "Only Post Requests are allowed"})
        return
    }

    if(req.headers["content-type"] !== "application/json") {
        res.status(400).json({"message": "content-type must be application/json"})
        return
    }

    const body = req.body;

    console.error(body)

    console.error(body.teamName)

    console.error("Headers are good")
    const idQuery = await client.$queryRaw`
    SELECT id from Team t
    WHERE LOWER(t.name) = LOWER(${body.teamName})
    `

    if(idQuery.length == 0) {
        res.status(400).json({"message": "Invalid Team Name. Please try again"})
        return
    }

    const teamId = idQuery[0].id
    console.error(`Obtained teamId ${teamId}`)

    const resultPlayers = await client.$queryRaw`
    INSERT INTO Player (name, team_id, birth_date, birth_country, height, weight)
    VALUES(${body.playerName}, ${teamId}, CAST(${body.birth_date} AS DATE), 
    ${body.birth_country}, ${body.height}, ${body.height})
    `

    res.status(200).json({"message": "Success! Please check the team roster."})
    await client.$disconnect()
    return res
}