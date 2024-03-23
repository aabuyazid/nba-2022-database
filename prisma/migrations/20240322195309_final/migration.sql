/*
  Warnings:

  - You are about to drop the `Game` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Performance` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Player` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Team` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Game" DROP CONSTRAINT "Game_homeTeamId_fkey";

-- DropForeignKey
ALTER TABLE "Game" DROP CONSTRAINT "Game_visitorTeamId_fkey";

-- DropForeignKey
ALTER TABLE "Performance" DROP CONSTRAINT "Performance_gameId_fkey";

-- DropForeignKey
ALTER TABLE "Performance" DROP CONSTRAINT "Performance_playerId_fkey";

-- DropForeignKey
ALTER TABLE "Player" DROP CONSTRAINT "Player_teamId_fkey";

-- DropTable
DROP TABLE "Game";

-- DropTable
DROP TABLE "Performance";

-- DropTable
DROP TABLE "Player";

-- DropTable
DROP TABLE "Team";

-- CreateTable
CREATE TABLE "team" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "city" VARCHAR(255) NOT NULL,
    "logo" TEXT,

    CONSTRAINT "team_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "player" (
    "id" SERIAL NOT NULL,
    "teamId" INTEGER NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "birthDate" TIMESTAMP(3),
    "birthCountry" VARCHAR(255),
    "height" VARCHAR(255),
    "weight" VARCHAR(255),

    CONSTRAINT "player_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "game" (
    "id" SERIAL NOT NULL,
    "homeTeamId" INTEGER NOT NULL,
    "visitorTeamId" INTEGER NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "homePoints" INTEGER NOT NULL,
    "visitorPoints" INTEGER NOT NULL,
    "timesTied" INTEGER,
    "leadChanges" INTEGER,

    CONSTRAINT "game_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "performance" (
    "id" SERIAL NOT NULL,
    "playerId" INTEGER NOT NULL,
    "gameId" INTEGER NOT NULL,
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

    CONSTRAINT "performance_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "player" ADD CONSTRAINT "player_teamId_fkey" FOREIGN KEY ("teamId") REFERENCES "team"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "game" ADD CONSTRAINT "game_homeTeamId_fkey" FOREIGN KEY ("homeTeamId") REFERENCES "team"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "game" ADD CONSTRAINT "game_visitorTeamId_fkey" FOREIGN KEY ("visitorTeamId") REFERENCES "team"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "performance" ADD CONSTRAINT "performance_playerId_fkey" FOREIGN KEY ("playerId") REFERENCES "player"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "performance" ADD CONSTRAINT "performance_gameId_fkey" FOREIGN KEY ("gameId") REFERENCES "game"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
