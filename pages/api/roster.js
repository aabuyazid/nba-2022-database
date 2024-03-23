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
    const resultPlayers = await client.$queryRaw`SELECT p.* FROM Player p JOIN Team t ON p.team_id = t.id WHERE LOWER(t.name) = LOWER(${team})`

    res.status(200).json(resultPlayers)
    await client.$disconnect()
    return res
}