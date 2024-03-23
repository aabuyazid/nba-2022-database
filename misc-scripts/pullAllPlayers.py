import requests, os, json, time

output = 'test-data/all-players.json'
teamIds = [
    1, 2, 4, 5, 6, 7, 10, 15, 20, 21, 24, 26, 27, 38, 41, 
    8, 9, 11, 14, 16, 17, 19, 22, 23, 25, 28, 29, 30, 31, 40
]

# teamIds = [15]

def pullPlayersFromTeam(team):

    url = "https://api-nba-v1.p.rapidapi.com/players"

    querystring = {"team":str(team),"season":"2022"}

    headers = {
    	"X-RapidAPI-Key": "c7689f88e5msh0e6950399afb287p18766ajsn10c49627d03c",
    	"X-RapidAPI-Host": "api-nba-v1.p.rapidapi.com"
    }

    for _ in range(10):
        try:
            response = requests.get(url, headers=headers, params=querystring)
            print(response)
            response.raise_for_status()
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
    response = pullPlayersFromTeam(team)

    players = response['response']

    for player in players:
        player_data = {}

        player_data['id']               = player['id']
        player_data['name']             = player['firstname'] + " " + player['lastname']
        player_data['birth_date']       = player['birth']['date']
        player_data['birth_country']    = player['birth']['country']
        player_data['height']           = player['height']['meters']
        player_data['weight']           = player['weight']['kilograms']
        player_data['team_id']          = team

        data['players'].append(player_data)
    
data_json = json.dumps(data)

with open(output, "w") as f:
    f.write(data_json)