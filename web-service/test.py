import os
import sys
import json

print("This script will install and update the dependencies of the project, \
and then it will finally build the Leosac User Interface")

# Go into the leosac/leosac-web/

path = "/home/stagiaire/leosac-gui/leosac-web/web-service/"
os.chdir(path)
all_engines = []


# Open the package.json of our app, and keep its data in  dictionary

with open('package.json') as data_file:
    data = json.load(data_file)

# Open the build-config.json, in which there will be the informations of our application 
# for our package.json and app.js (and maybe config) 

with open('build-config.json') as data_file:
    config_data = json.load(data_file)


# Add to the package data the in-repo addon 

in_repo_addon = []

for data_addon in config_data['addon']:
    in_repo_addon.append(data_addon)
    all_engines.append(data_addon)
    data['ember-addon']['paths'].append("lib/" + data_addon)


# Add to the package data the out-repo addon

out_repo_addon = []

for data_addon in config_data['extern-addon']:
    out_repo_addon.append(data_addon)
    all_engines.append(data_addon)
    data['dependencies'][data_addon] =  '"' + '../leosac-web-addons/' + data_addon + '"'

# Recreate a writable package.json and write in it the package data that we previously modified 

with open('package.json', 'w') as data_file:
    data_file.write(json.dumps(data))

# This section will load the app.js file, thanks to the slimit library

app_data = ''

# Creating the data which is required for the app.js file 

with open('app.js') as data_file:
    app_data = data_file.read()

data_dict = {}

addon_config = {}

for addon_name in out_repo_addon:
    with open('../../leosac-web-addons/'+ addon_name + '/module-config.json') as addon_open:
        addon_config[addon_name] = json.load(addon_open)

for addon_name in in_repo_addon:
    with open('../lib/'+ addon_name + '/module-config.json') as addon_open:
        addon_config[addon_name] = json.load(addon_open)

for data in all_engines:
    data_dict[data] = {
        'leosacProperty': {
            'needServer': addon_config[data]['needServer'],
            'displayName': addon_config[data]['displayName']
        },
        'dependencies': {
            'externalRoutes': {
                'login': 'login'
            },
            'services': [
                'authentication',
                'websocket',
                'leosac-info',
                'flashMessages',    
                'store',
                'module-manager']
        }
    }

# Rewriting the app.js with the newly added elements.

with open('../app/app.js', 'w') as data_file:
    app_data = app_data.replace("__REPLACE_ME__", json.dumps(data_dict, sort_keys=True, indent=4))
    data_file.write(app_data)