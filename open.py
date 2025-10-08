import requests
import sys

source = sys.argv[1]
metadata = {'source': source}
ret = requests.post('https://chronomaps-api-qjzuw7ypfq-ez.a.run.app/', json=metadata)
ret.raise_for_status()
ret = ret.json()
workspace_id = ret['workspace_id']
keys = ret['config']['keys']
admin_key = keys['admin']
collaborate_key = keys['collaborate']
headers = {
    'Authorization': admin_key
}
ret = requests.put(f'https://chronomaps-api-qjzuw7ypfq-ez.a.run.app/{workspace_id}?public=true&collaborate=true', json=metadata, headers=headers)
ret.raise_for_status()
ret = ret.json()

print(source)
print('Admin: https://mapfutur.es/admin/?workspace=' + workspace_id + '&api_key=' + admin_key)
print('Auto Input: https://mapfutur.es/?workspace=' + workspace_id + '&api_key=' + collaborate_key + '&automatic=true')