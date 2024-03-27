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
        await client.$disconnect()
        return
    }

    const teamId = idQuery[0].id
    console.error(`Obtained teamId ${teamId}`)

    const dupQuery = await client.$queryRaw`
    SELECT * FROM Player p
    WHERE LOWER(p.name) = LOWER(${body.playerName}) and p.team_id = ${teamId}
    `

    if(dupQuery.length > 0) {
        res.status(400).json({"message": "Player is already in database"})
        await client.$disconnect()
        return
    }

    if(body.birthDate === '') {
        body.birthDate = null
    }



    try {
        const resultPlayers = await client.$queryRaw`
        INSERT INTO Player (name, team_id, birth_date, birth_country, height, weight)
        VALUES(${body.playerName}, ${teamId}, CAST(${body.birthDate} AS DATE), 
        ${body.birthCountry}, ${body.height}, ${body.weight})
        `
        res.status(200).json({"message": "Success! Please check the team roster."})
    }
    catch (e) {
        console.error(e)
        res.status(400).json(e.meta.message)
    }

    await client.$disconnect()
    return 

}