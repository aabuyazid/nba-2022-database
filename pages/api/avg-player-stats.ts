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

    const { playerName, startDate, timeRange} = req.query
    const bestPlayerGame= await client.$queryRaw`SELECT
      TRUNC(AVG(pf.min)::numeric, 2) as min,
      TRUNC(AVG(pf.fga)::numeric, 2) as fga,
      TRUNC(AVG(pf.fgm)::numeric, 2) as fgm,
      TRUNC(AVG(pf.fgp)::numeric, 2) as fgp,
      TRUNC(AVG(pf.fta)::numeric, 2) as fta,
      TRUNC(AVG(pf.ftm)::numeric, 2) as ftm,
      TRUNC(AVG(pf.ftp)::numeric, 2) as ftp,
      TRUNC(AVG(pf.tpa)::numeric, 2) as tpa,
      TRUNC(AVG(pf.tpm)::numeric, 2) as tpm,
      TRUNC(AVG(pf.tpp)::numeric, 2) as tpp,
      TRUNC(AVG(pf.steals)::numeric, 2) as steals,
      TRUNC(AVG(pf.assists)::numeric, 2) as assists,
      TRUNC(AVG(pf.turnovers)::numeric, 2) as turnovers,
      TRUNC(AVG(pf.blocks)::numeric, 2) as blocks,
      TRUNC(AVG(pf.plus_minus)::numeric, 2) as plus_minus
    FROM
      Performance pf
      JOIN Player pl ON pf.player_id = pl.id
      JOIN Game g ON pf.game_id = g.id
    WHERE
      LOWER(pl.name) = LOWER(${playerName}) and 
      pf.min > 0 and
      CAST(g.date as DATE) BETWEEN CAST(${startDate} AS DATE) and CAST(${startDate} AS DATE) + CAST(${timeRange} as INTEGER)
    GROUP BY pl.id
    `

    res.status(200).json(bestPlayerGame)
    await client.$disconnect()
    return res
}

//g.date BETWEEN ${startDate} AND ${startDate} + ${timeRange}