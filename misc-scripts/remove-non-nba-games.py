import json

TEAMS = [
    1,
    2,
    4,
    5,
    6,
    7,
    10,
    15,
    20,
    21,
    24,
    26,
    27,
    38,
    41,
    8,
    9,
    11,
    14,
    16,
    17,
    19,
    22,
    23,
    25,
    28,
    29,
    30,
    31,
    40
]

output = 'test-data/all-nba-games.json'
output_data = {'games': []}
with open('test-data/2022-games.json') as f:
    data = json.load(f)
    for game in data['response']:
        visitors = game['teams']['visitors']['id']
        home = game['teams']['home']['id']
        if(visitors not in TEAMS or home not in TEAMS):
            continue
        
        game_data = {}

        game_data['id']                 = game['id']
        game_data['homeTeamId']         = home
        game_data['visitorTeamId']     = visitors
        game_data['date']               = game['date']['start']
        game_data['homePoints']         = game['scores']['home']['points']
        game_data['visitorPoints']     = game['scores']['visitors']['points']
        game_data['timesTied']          = game['timesTied']
        game_data['leadChanges']        = game['leadChanges']

        output_data['games'].append(game_data)

json_data = json.dumps(output_data)

with open(output, 'w') as f:
    f.write(json_data)