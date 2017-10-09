import os
import sys
import json
from slimit import ast
from slimit.parser import Parser
from slimit.visitors import nodevisitor

print("This script will install and update the dependencies of the project, \
and then it will finally build the Leosac User Interface")


''' Go into the leosac/leosac-web/ '''

path = "/leosac/leosac-web/web-service"
os.chdir(path)

all_data = []


''' Open the package.json of our app, and keep its data in  dictionary '''

with open('package.json') as data_file:
    data = json.load(data_file)


''' This section will load the app.js file, thanks to the slimit library '''

with open('app.js') as data_file:
    for line in data_file:
        print(line)


''' Open the build-config.json, in which there will be the informations of our application 
    for our package.json and app.js (and maybe config) '''

with open('build-config.json') as data_file:
    config_data = json.load(data_file)


''' Add to the package data the in-repo addon '''

for data_addon in config_data['addon']:
    all_data.append(data_addon)
    data['ember-addon']['paths'].append("lib/" + data_addon)


''' Add to the package data the out-repo addon '''

for data_addon in config_data['extern-addon']:
    all_data.append(data_addon)
    data['dependencies'][data_addon] =  '"' + '../leosac-web-addons/' + data_addon + '"'

print(all_data)


''' Recreate a writable package.json and write in it the package data that we previously modified '''

with open('package.json', 'w') as data_file:
    data_file.write(json.dumps(data))


return_value = os.system("npm install phantomjs-prebuilt@2.1.13 --ignore-scripts")
if return_value:
    print("Something went wrong with this command: \
    npm install phantomjs-prebuilt@2.1.13 --ignore-scripts")
    sys.exit(84)

return_value = os.system("npm install; bower install --allow-root")
if return_value:
    print("Something went wrong with this command: \
    npm install; bower install --allow-root")
    sys.exit(84)

print("We will now build the application")
return_value = os.system("ember build --prod")
if return_value:
    print("Something went wrong during the build of the application")
    sys.exit(84)

print("The build is now complete, you can find the build \
in the mounting point precised in the 'docker run'")