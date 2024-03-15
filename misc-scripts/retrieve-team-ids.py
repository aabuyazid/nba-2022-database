import json

output = 'test-data/team-2022.json'
team_data = {'teams': []}
with open('test-data/eastTeam.json') as f:
    data = json.load(f)
    for team in data['response']:
        t_data = {}

        t_data['id']   = team['id']
        t_data['name'] = team['name']
        t_data['city'] = team['city']
        t_data['logo'] = team['logo']

        team_data['teams'].append(t_data)
            


with open('test-data/westTeam.json') as f:
    data = json.load(f)
    for team in data['response']:
        t_data = {}

        t_data['id']   = team['id']
        t_data['name'] = team['name']
        t_data['city'] = team['city']
        t_data['logo'] = team['logo']

        team_data['teams'].append(t_data)

team_json = json.dumps(team_data)

with open('test-data/teams-2022.json', "w") as f:
    f.write(team_json)