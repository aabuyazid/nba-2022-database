import { PrismaClient, Prisma } from "@prisma/client";
import fs from 'fs'

const client = globalThis.prisma || new PrismaClient()

async function upsertPlayer(players) {
    await client.player.createMany({
        data: players, 
        skipDuplicates: true
    });
}

async function upsertTeam(teams) {
    await client.team.createMany({
        data: teams, 
        skipDuplicates: true
    });
}

async function upsertGame(gameStats) {
    await client.game.createMany({
        data: gameStats, 
        skipDuplicates: true
    });
}

async function upsertPerformance(playerStats) {
    await client.performance.createMany({
        data: playerStats, 
        skipDuplicates: true
    });
}

//Seeding team database
fs.readFile("./test-data/all-teams.json", function(err, data) {

    if (err) throw err;

    const dd = JSON.parse(data);
    const teams = dd['teams']

    upsertTeam(teams)
        .catch((e) => {
            console.log(e);
            process.exit(1)

        })
        .finally(() => {
            client.$disconnect();
        });
});

// Seeding player database
fs.readFile("./test-data/all-players.json", function(err, data) {

   if (err) throw err;

   const dd = JSON.parse(data);
   const players = dd['players']
   players.forEach(player => {
       if(player.birth_date != null) {
           player.birth_date = new Date(player.birth_date.split('-'))
       }
   })

   upsertPlayer(players)
       .catch((e) => {
           console.log(e);
           process.exit(1)

       })
       .finally(() => {
           client.$disconnect();
       });
});

// Seeding game stat database
fs.readFile("./test-data/all-nba-games.json", function(err, data) {

   if (err) throw err;

   const dd = JSON.parse(data);
   const games = dd['games']

   upsertGame(games)
       .catch((e) => {
           console.log(e);
           process.exit(1)

       })
       .finally(() => {
           client.$disconnect();
       });
});

// Seeding Player Stat database
fs.readFile("./test-data/all-player-stats-test.json", function(err, data) {

   if (err) throw err;

   const dd = JSON.parse(data);
   const playerStats = dd['players']

   upsertPerformance(playerStats)
       .catch((e) => {
           console.log(e);
           process.exit(1)

       })
       .finally(() => {
           client.$disconnect();
       });
});

// const bob = await prisma.user.upsert({
//   where: { email: 'bob@prisma.io' },
//   update: {},
//   create: {
//     email: 'bob@prisma.io',
//     name: 'Bob',
//     posts: {
//       create: [
//         {
//           title: 'Follow Prisma on Twitter',
//           content: 'https://twitter.com/prisma',
//           published: true,
//         },
//         {
//           title: 'Follow Nexus on Twitter',
//           content: 'https://twitter.com/nexusgql',
//           published: true,
//         },
//       ],
//     },
//   },
// })
// console.log({ alice, bob })