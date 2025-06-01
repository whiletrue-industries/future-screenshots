import requests
import os
import sys
from pathlib import Path
import yaml
from PIL import Image
from io import BytesIO
from itertools import chain

screenshot_handler = 'https://screenshot-handler-qjzuw7ypfq-ez.a.run.app'
item_crud_handler = 'https://chronomaps-api-qjzuw7ypfq-ez.a.run.app'

if __name__ == '__main__':
    root = Path(sys.argv[1])

    for path, dirnames, filenames in root.walk():
        config = path / '.chronomaps.config'
        if not config.exists():
            continue
        config = yaml.safe_load(config.read_text())
        workspace = config['workspace']
        api_key = config['api_key']
        delete = config.get('delete', True)
        print(f'https://mapfutur.es/admin/?workspace={workspace}&api_key={api_key}')
        filenames = list(chain(path.glob('*.png'), path.glob('*.jpeg'), path.glob('*.jpg')))

        if delete:
            print(f'Deleting items in workspace: {workspace}')
            resp = requests.delete(f'{item_crud_handler}/{workspace}/items', headers={'Authorization': f'{api_key}'})
            resp.raise_for_status()

        for i, filename in enumerate(filenames):
            print(f'Uploading image {filename} ({i+1}/{len(filenames)}) to workspace: {workspace}')
            image = Image.open(filename)
            image = image.convert('RGB')
            image.thumbnail((2120, 4000), Image.Resampling.LANCZOS)
            out = BytesIO()
            image.save(out, format='jpeg', quality=85)
            out.seek(0)
            response = requests.post(
                screenshot_handler,
                files={
                    'image': (filename.name, out, 'image/jpeg')
                },
                params={'workspace': workspace, 'api_key': api_key, 'automatic': 'true'},
            )
            if response.status_code == 200:
                response = response.json()
                item_id = response.get('item_id')
                item_key = response.get('item_key')
                print('Successfully uploaded file:', filename, 
                      f'Item ID: {item_id}, Item Key: {item_key}')
            else:
                print(f"Failed to upload file {i+1}: {filename}, Status Code: {response.status_code}, Response: {response.text}")