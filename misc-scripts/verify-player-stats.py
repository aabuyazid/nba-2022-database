import json

gameIds = []
with open('test-data/all-nba-games.json') as gStats:
    gData = json.load(gStats)

    for game in gData['games']:
        gameIds.append(game['id'])

data = {"players": []}
with open('test-data/allPlayerStats.json') as pStats:
    pData = json.load(pStats)

    for player in pData['players']:
        if(player['game_id'] in gameIds):
            player['min'] = int(player['min']) if (player['min'] != "--" and player['min'] != None) else 0
            player['fgp'] = float(player['fgp']) if player['fgp'] != None else 0
            player['ftp'] = float(player['ftp']) if player['ftp'] != None else 0
            player['tpp'] = float(player['tpp']) if player['tpp'] != None else 0

            data['players'].append(player)

data = json.dumps(data)
with open('test-data/all-player-stats-test.json', "w") as pStats:
    pStats.write(data)