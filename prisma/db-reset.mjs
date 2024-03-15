const tableNames = ['Player', 'Team', "GameStats", "PlayerStats"];


import { PrismaClient } from '@prisma/client';
const client = globalThis.prisma || new PrismaClient();
async function main() {
  for (const tableName of tableNames) await client.$queryRawUnsafe(`Truncate "${tableName}" restart identity cascade;`);
}

main().finally(async () => {
  await client.$disconnect();
});