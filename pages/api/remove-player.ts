import type { NextApiRequest, NextApiResponse} from "next" 
import { PrismaClient } from "@prisma/client";

const client = new PrismaClient()

export default async function (
    req: NextApiRequest,
    res: NextApiResponse,
) {
    if(req.method !== "DELETE") {
        res.status(400).json({"message": "Only DELETE Requests are allowed"})
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

    const result = await client.$queryRaw`
    DELETE FROM Player p
    WHERE LOWER(p.name) = LOWER(${body.playerName}) and
    p.team_id = ${teamId}
    RETURNING p.name, p.team_id
    `
    await client.$disconnect()

    const playerDeleted = result[0]

    if(playerDeleted.name.toLowerCase() == body.playerName.toLowerCase() && playerDeleted.team_id == teamId) {
        res.status(200).json({"message": `Successfully deleted ${body.playerName}. Please check the ${body.teamName} roster.`})
    }
    else {
        res.status(400).json({"message:": `Unsuccessful deletion of ${body.playerName}. Please try again.`})
    }

    return 
}