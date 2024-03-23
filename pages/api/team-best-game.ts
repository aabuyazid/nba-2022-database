import type { NextApiRequest, NextApiResponse} from "next" 
import { PrismaClient } from "@prisma/client";

const client = new PrismaClient()

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
        SELECT 
            (SELECT t1.name FROM TEAM t1 WHERE t1.id = g.home_team_id) as home_team,
            (SELECT t2.name FROM TEAM t2 WHERE t2.id = g.visitor_team_id) as visitor_team,
            g.home_points, g.visitor_points, g.times_tied, g.lead_changes, g.date 
        FROM Game g
        WHERE CASE
            WHEN g.home_team_id = (SELECT t.id FROM Team t 
                                    WHERE LOWER(t.name) = LOWER(${team})) 
                THEN g.home_points
            WHEN g.visitor_team_id = (SELECT t.id FROM Team t 
                                    WHERE LOWER(t.name) = LOWER(${team})) 
                THEN g.visitor_points
            END = 
            (SELECT MAX(tp) FROM 
                    (
                        SELECT CASE
                            WHEN g1.home_team_id = (SELECT t.id FROM Team t 
                                                    WHERE LOWER(t.name) = LOWER(${team})) 
                                THEN g1.home_points
                            WHEN g1.visitor_team_id = (SELECT t.id FROM Team t 
                                                    WHERE LOWER(t.name) = LOWER(${team})) 
                                THEN g1.visitor_points
                        END as tp FROM Game g1
                    )
                )
    `

    res.status(200).json(resultPlayers)
    await client.$disconnect()
    return res
}