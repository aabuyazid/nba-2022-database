/*
  Warnings:

  - Added the required column `gameId` to the `PlayerStats` table without a default value. This is not possible if the table is not empty.
  - Added the required column `playerId` to the `PlayerStats` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Player" ALTER COLUMN "birthDate" DROP NOT NULL,
ALTER COLUMN "birthCountry" DROP NOT NULL,
ALTER COLUMN "height" DROP NOT NULL,
ALTER COLUMN "weight" DROP NOT NULL;

-- AlterTable
ALTER TABLE "PlayerStats" ADD COLUMN     "assists" INTEGER,
ADD COLUMN     "blocks" INTEGER,
ADD COLUMN     "comment" TEXT,
ADD COLUMN     "gameId" INTEGER NOT NULL,
ADD COLUMN     "playerId" INTEGER NOT NULL,
ADD COLUMN     "plusMinus" TEXT,
ADD COLUMN     "steals" INTEGER,
ADD COLUMN     "turnovers" INTEGER;

-- AlterTable
ALTER TABLE "Team" ADD COLUMN     "logo" TEXT;

-- AddForeignKey
ALTER TABLE "Player" ADD CONSTRAINT "Player_teamId_fkey" FOREIGN KEY ("teamId") REFERENCES "Team"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GameStats" ADD CONSTRAINT "GameStats_homeTeamId_fkey" FOREIGN KEY ("homeTeamId") REFERENCES "Team"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GameStats" ADD CONSTRAINT "GameStats_visitorTeamId_fkey" FOREIGN KEY ("visitorTeamId") REFERENCES "Team"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PlayerStats" ADD CONSTRAINT "PlayerStats_playerId_fkey" FOREIGN KEY ("playerId") REFERENCES "Player"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PlayerStats" ADD CONSTRAINT "PlayerStats_gameId_fkey" FOREIGN KEY ("gameId") REFERENCES "GameStats"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
