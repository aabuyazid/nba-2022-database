-- CreateTable
CREATE TABLE "Player" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "birthDate" TIMESTAMP(3) NOT NULL,
    "birthCountry" VARCHAR(255) NOT NULL,
    "height" VARCHAR(255) NOT NULL,
    "weight" VARCHAR(255) NOT NULL,
    "teamId" INTEGER NOT NULL,

    CONSTRAINT "Player_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Team" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "city" VARCHAR(255) NOT NULL,

    CONSTRAINT "Team_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "GameStats" (
    "id" SERIAL NOT NULL,
    "homeTeamId" INTEGER NOT NULL,
    "visitorTeamId" INTEGER NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "homePoints" INTEGER NOT NULL,
    "visitorPoints" INTEGER NOT NULL,
    "timesTied" INTEGER NOT NULL,
    "leadChanges" INTEGER NOT NULL,

    CONSTRAINT "GameStats_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PlayerStats" (
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

    CONSTRAINT "PlayerStats_pkey" PRIMARY KEY ("id")
);
