/*
  Warnings:

  - You are about to drop the column `homePoints` on the `game` table. All the data in the column will be lost.
  - You are about to drop the column `homeTeamId` on the `game` table. All the data in the column will be lost.
  - You are about to drop the column `leadChanges` on the `game` table. All the data in the column will be lost.
  - You are about to drop the column `timesTied` on the `game` table. All the data in the column will be lost.
  - You are about to drop the column `visitorPoints` on the `game` table. All the data in the column will be lost.
  - You are about to drop the column `visitorTeamId` on the `game` table. All the data in the column will be lost.
  - You are about to drop the column `defReb` on the `performance` table. All the data in the column will be lost.
  - You are about to drop the column `gameId` on the `performance` table. All the data in the column will be lost.
  - You are about to drop the column `offReb` on the `performance` table. All the data in the column will be lost.
  - You are about to drop the column `playerId` on the `performance` table. All the data in the column will be lost.
  - You are about to drop the column `plusMinus` on the `performance` table. All the data in the column will be lost.
  - You are about to drop the column `totReb` on the `performance` table. All the data in the column will be lost.
  - The `fgp` column on the `performance` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `ftp` column on the `performance` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `tpp` column on the `performance` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - You are about to drop the column `birthCountry` on the `player` table. All the data in the column will be lost.
  - You are about to drop the column `birthDate` on the `player` table. All the data in the column will be lost.
  - You are about to drop the column `teamId` on the `player` table. All the data in the column will be lost.
  - Added the required column `home_points` to the `game` table without a default value. This is not possible if the table is not empty.
  - Added the required column `home_team_id` to the `game` table without a default value. This is not possible if the table is not empty.
  - Added the required column `visitor_points` to the `game` table without a default value. This is not possible if the table is not empty.
  - Added the required column `visitor_team_id` to the `game` table without a default value. This is not possible if the table is not empty.
  - Added the required column `game_id` to the `performance` table without a default value. This is not possible if the table is not empty.
  - Added the required column `player_id` to the `performance` table without a default value. This is not possible if the table is not empty.
  - Added the required column `team_id` to the `player` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "game" DROP CONSTRAINT "game_homeTeamId_fkey";

-- DropForeignKey
ALTER TABLE "game" DROP CONSTRAINT "game_visitorTeamId_fkey";

-- DropForeignKey
ALTER TABLE "performance" DROP CONSTRAINT "performance_gameId_fkey";

-- DropForeignKey
ALTER TABLE "performance" DROP CONSTRAINT "performance_playerId_fkey";

-- DropForeignKey
ALTER TABLE "player" DROP CONSTRAINT "player_teamId_fkey";

-- AlterTable
ALTER TABLE "game" DROP COLUMN "homePoints",
DROP COLUMN "homeTeamId",
DROP COLUMN "leadChanges",
DROP COLUMN "timesTied",
DROP COLUMN "visitorPoints",
DROP COLUMN "visitorTeamId",
ADD COLUMN     "home_points" INTEGER NOT NULL,
ADD COLUMN     "home_team_id" INTEGER NOT NULL,
ADD COLUMN     "lead_changes" INTEGER,
ADD COLUMN     "times_tied" INTEGER,
ADD COLUMN     "visitor_points" INTEGER NOT NULL,
ADD COLUMN     "visitor_team_id" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "performance" DROP COLUMN "defReb",
DROP COLUMN "gameId",
DROP COLUMN "offReb",
DROP COLUMN "playerId",
DROP COLUMN "plusMinus",
DROP COLUMN "totReb",
ADD COLUMN     "def_reb" INTEGER,
ADD COLUMN     "game_id" INTEGER NOT NULL,
ADD COLUMN     "off_reb" INTEGER,
ADD COLUMN     "player_id" INTEGER NOT NULL,
ADD COLUMN     "plus_minus" INTEGER,
ADD COLUMN     "tot_reb" INTEGER,
DROP COLUMN "fgp",
ADD COLUMN     "fgp" DOUBLE PRECISION,
DROP COLUMN "ftp",
ADD COLUMN     "ftp" DOUBLE PRECISION,
DROP COLUMN "tpp",
ADD COLUMN     "tpp" DOUBLE PRECISION;

-- AlterTable
ALTER TABLE "player" DROP COLUMN "birthCountry",
DROP COLUMN "birthDate",
DROP COLUMN "teamId",
ADD COLUMN     "birth_country" VARCHAR(255),
ADD COLUMN     "birth_date" TIMESTAMP(3),
ADD COLUMN     "team_id" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "player" ADD CONSTRAINT "player_team_id_fkey" FOREIGN KEY ("team_id") REFERENCES "team"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "game" ADD CONSTRAINT "game_home_team_id_fkey" FOREIGN KEY ("home_team_id") REFERENCES "team"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "game" ADD CONSTRAINT "game_visitor_team_id_fkey" FOREIGN KEY ("visitor_team_id") REFERENCES "team"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "performance" ADD CONSTRAINT "performance_player_id_fkey" FOREIGN KEY ("player_id") REFERENCES "player"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "performance" ADD CONSTRAINT "performance_game_id_fkey" FOREIGN KEY ("game_id") REFERENCES "game"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
