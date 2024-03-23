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

    const { playerName} = req.query
    const bestPlayerGame= await client.$queryRaw`
        SELECT pf.min, pf.fga, pf.fgm, pf.fgp, pf.fta, pf.ftm, pf.ftp, 
        pf.tpa, pf.tpm, pf.tpp, pf.steals, pf.assists, pf.turnovers, 
        pf.blocks, pf.plus_minus, CAST(g.date AS DATE) as gDate FROM Performance pf 
        JOIN Player pl ON pf.player_id = pl.id 
        JOIN Game g ON pf.game_id = g.id
        WHERE LOWER(pl.name) = LOWER(${playerName}) and 
        pf.plus_minus = (SELECT min(pf2.plus_minus) FROM performance pf2 
                        JOIN Player pl2 ON pf2.player_id = pl2.id 
                        WHERE LOWER(pl2.name) = LOWER(${playerName}) 
                        GROUP BY pf2.player_id)
    `

    res.status(200).json(bestPlayerGame)
    await client.$disconnect()
    return res
}

// 