/*
  Warnings:

  - You are about to drop the `GameStats` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `PlayerStats` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "GameStats" DROP CONSTRAINT "GameStats_homeTeamId_fkey";

-- DropForeignKey
ALTER TABLE "GameStats" DROP CONSTRAINT "GameStats_visitorTeamId_fkey";

-- DropForeignKey
ALTER TABLE "PlayerStats" DROP CONSTRAINT "PlayerStats_gameId_fkey";

-- DropForeignKey
ALTER TABLE "PlayerStats" DROP CONSTRAINT "PlayerStats_playerId_fkey";

-- DropTable
DROP TABLE "GameStats";

-- DropTable
DROP TABLE "PlayerStats";

-- CreateTable
CREATE TABLE "Game" (
    "id" SERIAL NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "homePoints" INTEGER NOT NULL,
    "visitorPoints" INTEGER NOT NULL,
    "timesTied" INTEGER,
    "leadChanges" INTEGER,
    "homeTeamId" INTEGER NOT NULL,
    "visitorTeamId" INTEGER NOT NULL,

    CONSTRAINT "Game_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Performance" (
    "id" SERIAL NOT NULL,
    "min" TEXT,
    "fga" INTEGER,
    "fgm" INTEGER,
    "fgp" TEXT,
    "fta" INTEGER,
    "ftm" INTEGER,
    "ftp" TEXT,
    "tpa" INTEGER,
    "tpm" INTEGER,
    "tpp" TEXT,
    "offReb" INTEGER,
    "defReb" INTEGER,
    "totReb" INTEGER,
    "steals" INTEGER,
    "assists" INTEGER,
    "turnovers" INTEGER,
    "blocks" INTEGER,
    "plusMinus" TEXT,
    "comment" TEXT,
    "playerId" INTEGER NOT NULL,
    "gameId" INTEGER NOT NULL,

    CONSTRAINT "Performance_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Game" ADD CONSTRAINT "Game_homeTeamId_fkey" FOREIGN KEY ("homeTeamId") REFERENCES "Team"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Game" ADD CONSTRAINT "Game_visitorTeamId_fkey" FOREIGN KEY ("visitorTeamId") REFERENCES "Team"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Performance" ADD CONSTRAINT "Performance_playerId_fkey" FOREIGN KEY ("playerId") REFERENCES "Player"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Performance" ADD CONSTRAINT "Performance_gameId_fkey" FOREIGN KEY ("gameId") REFERENCES "Game"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
