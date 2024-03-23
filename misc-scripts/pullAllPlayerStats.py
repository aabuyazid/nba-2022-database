import requests, os, json, time, sys

output = 'test-data/allPlayerStats.json'
teamIds = [
    1, 2, 4, 5, 6, 7, 10, 15, 20, 21, 24, 26, 27, 38, 41, 
    8, 9, 11, 14, 16, 17, 19, 22, 23, 25, 28, 29, 30, 31, 40
]

# teamIds = [15]

def pullPlayerStatsFromTeam(team):
    url = "https://api-nba-v1.p.rapidapi.com/players/statistics"

    querystring = {"team":str(team),"season":"2022"}

    headers = {
    	"X-RapidAPI-Key": "c7689f88e5msh0e6950399afb287p18766ajsn10c49627d03c",
    	"X-RapidAPI-Host": "api-nba-v1.p.rapidapi.com"
    }

    for _ in range(10):
        try:
            response = requests.get(url, headers=headers, params=querystring)
            response.raise_for_status()
            print(response)
            break
        except requests.HTTPError as e:
            status_code = e.response.status_code
            if response.status_code == 429:
                time_to_sleep = 10

                print(f'Timed Out. Now sleeping for {time_to_sleep}')
                time.sleep(time_to_sleep)
            pass


    return response.json()

data = { 'players': [] }
for team in teamIds:
    print(team)
    response = pullPlayerStatsFromTeam(team)

    players = response['response']

    for player in players:
        player_data = {}

        player_data['player_id']    = player['player']['id']
        player_data['game_id']      = player['game'] ['id']
        player_data['min']          = player['min']
        player_data['fga']          = player['fga']
        player_data['fgm']          = player['fgm']
        player_data['fgp']          = player['fgp']
        player_data['fta']          = player['fta']
        player_data['ftm']          = player['ftm']
        player_data['ftp']          = player['ftp']
        player_data['tpa']          = player['tpa']
        player_data['tpp']          = player['tpp']
        player_data['off_reb']      = player['offReb']
        player_data['def_reb']      = player['defReb']
        player_data['tot_reb']      = player['totReb']
        player_data['steals']       = player['steals']
        player_data['assists']      = player['assists']
        player_data['turnovers']    = player['turnovers']
        player_data['blocks']       = player['blocks']
        player_data['plus_minus']   = int( player['plusMinus'].replace('+','') ) if (player['plusMinus'] != "--" and player['plusMinus'] != None) else 0
        player_data['comment']      = player['comment']

        data['players'].append(player_data)
    
data_json = json.dumps(data)

with open(output, "w") as f:
    f.write(data_json)