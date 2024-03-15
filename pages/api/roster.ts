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
    const resultPlayers = await client.$queryRaw`SELECT * FROM Player p JOIN Team t ON p.teamId = t.id WHERE t.name = ${team}`

    res.status(200).json(resultPlayers)
    return
}