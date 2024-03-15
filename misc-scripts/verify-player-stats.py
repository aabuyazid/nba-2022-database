import json

gameIds = []
with open('test-data/all-nba-games.json') as gStats:
    gData = json.load(gStats)

    for game in gData['games']:
        gameIds.append(game['id'])

data = {"players": []}
with open('test-data/all-player-stats.json') as pStats:
    pData = json.load(pStats)

    for player in pData['players']:
        if(player['gameId'] in gameIds):
            data['players'].append(player)

data = json.dumps(data)
with open('test-data/all-player-stats-test.json', "w") as pStats:
    pStats.write(data)