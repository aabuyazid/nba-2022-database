import type { NextApiRequest, NextApiResponse} from "next" 
import { PrismaClient } from "@prisma/client";

const client = globalThis.prisma || new PrismaClient()

export default async function (
    req: NextApiRequest,
    res: NextApiResponse,
) {
    if(req.method !== "GET") {
        res.status(400).json({"message": "Only GET Requests are allowed"})
        return
    }

    const { team } = req.query
    const resultPlayers = await client.$queryRaw`
        SELECT p.*, TRUNC(AVG(pf.min)::numeric, 2) as max_avg_min FROM Player p 
        JOIN Team t ON p.team_id = t.id 
        JOIN Performance pf ON pf.player_id = p.id
        WHERE LOWER(t.name) = LOWER(${team}) and
        pf.min > 0
        GROUP BY p.id
        HAVING AVG(pf.min) = 
        (SELECT MAX(avg_min) FROM (
                                SELECT AVG(pf2.min) as avg_min 
                                FROM Performance pf2
                                JOIN Player p2 ON p2.id = pf2.player_id
                                JOIN Team t1 ON p2.team_id = t1.id
                                WHERE LOWER(t1.name) = LOWER(${team}) and
                                pf2.min > 0
                                GROUP BY pf2.player_id
                                )
                             )
    `

    res.status(200).json(resultPlayers)
    await client.$disconnect()
    return res
}