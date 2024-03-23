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

    const { team, startDate, timeRange } = req.query
    const resultPlayers = await client.$queryRaw`
        SELECT 
            TRUNC(AVG(CASE
                WHEN g.home_team_id = (SELECT t.id FROM Team t 
                                        WHERE LOWER(t.name) = LOWER(${team})) 
                    THEN g.home_points
                WHEN g.visitor_team_id = (SELECT t.id FROM Team t 
                                        WHERE LOWER(t.name) = LOWER(${team})) 
                    THEN g.visitor_points
                END  
            )::numeric, 2) as points
            TRUNC(AVG(g.times_tied)::numeric, 2) as times_tied
            TRUNC(AVG(g.lead_changes)::numeric, 2) as lead_changes
        FROM Game g
        JOIN Team t1 ON t1.id = g.home_team_id
        JOIN Team t2 ON t2.id = g.visitor_team_id
        WHERE 
        CAST(g.date as DATE) BETWEEN CAST(${startDate} AS DATE) and CAST(${startDate} AS DATE) + CAST(${timeRange} as INTEGER)
        GROUP BY t1.id
    `

    res.status(200).json(resultPlayers)
    await client.$disconnect()
    return res
}