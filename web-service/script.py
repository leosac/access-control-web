import os
import sys
import json

print("This script will install and update the dependencies of the project, \
and then it will finally build the Leosac User Interface")

# Set the path to /leosac/leosac-web/web-service in our container

path = "/leosac/leosac-web/"
os.chdir(path)
addons_name = []


##
# We will modify the package.json of our app
#

# Open the package.json of our app, and keep its data in  dictionary

with open('package.json') as data_file:
    data = json.load(data_file)

# Open the build-config.json, in which there will be the informations of our application
# for our package.json, router.js and app.js (and maybe config)

with open('/build-config.json') as data_file:
    config_data = json.load(data_file)

# Set the env variables needed to launch the application

os.environ["LEOSAC_ADDR"] = config_data['leosac_addr']
os.environ["LEOSAC_ROOT_URL"] = config_data['leosac_root_url']

# Add to our dictionary the in-repo addons

in_repo_addon = []

for data_addon in config_data['addon']:
    in_repo_addon.append(data_addon)
    addons_name.append(data_addon)
    data['ember-addon']['paths'].append("lib/" + data_addon)

# Manually add the shared-tools module,
#  which is an addon that is used by both the application and the module
data['ember-addon']['paths'].append("lib/shared-tools")

# Add to our dictionary the out-repo addons

out_repo_addon = []

for data_addon in config_data['extern-addon']:
    out_repo_addon.append(data_addon)
    addons_name.append(data_addon)
    data['dependencies'][data_addon] = '"' + '../leosac-web-addons/' + data_addon + '"'

# Recreate a writable package.json and put in it the dictionary that we previously completed
# json.dumps() will take a dictionnary and change it to a string that it is put in the package.json

with open('package.json', 'w') as data_file:
    data_file.write(json.dumps(data, sort_keys=True, indent=4))

##
# The We will now modify the app.js and router.js file
#

# We will load the data in app.js, and complete it

with open('app/app.js') as data_file:
    app_data = data_file.read()

data_dict = {}
addon_config = {}

# this will catch the config of each addon, which can be either in or out repo

for addon_name in out_repo_addon:
    with open('../leosac-web-addons/' + addon_name + '/module-config.json') as addon_open:
        addon_config[addon_name] = json.load(addon_open)

for addon_name in in_repo_addon:
    with open('lib/' + addon_name + '/module-config.json') as addon_open:
        addon_config[addon_name] = json.load(addon_open)

# This is a small function that will reformat the name of the addon.
# In our app.js, our addon name must be camel cased,
# while in our router.js and package.json the name must be dasherized


def format_route_name(st):
    output = ''.join(x for x in st.title() if x.isalpha())
    return output[0].lower() + output[1:]

# We will create a dictionary for each module, based on a blue print.

for data in addons_name:
    route_name = format_route_name(data)
    data_dict[route_name] = {
        'leosacProperty': {
            'needServer': addon_config[data]['needServer'],
            'displayName': addon_config[data]['displayName'],
            'entryPoint': addon_config[data]['entryPoint'],
            'modelToRoute': addon_config[data]['modelToRoute']
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
                'intl',
                'module-manager',
                'search']
        }
    }

# Rewriting the app.js with the newly added dictionary
# There must be a "__REPLACE_ME__" because this will replace it with our data
# (no luck if we have a __REPLACE_ME__ as addon name )

with open('app/app.js', 'w') as data_file:
    app_data = app_data.replace("__REPLACE_ME__", json.dumps(data_dict, sort_keys=True, indent=4))
    data_file.write(app_data)


##
# We will now add the necessary route in the router.js
#

with open("app/router.js") as data_file:
    router_data = data_file.read()

router_addon = ''

for data in addons_name:
    router_addon += 'this.mount(\'' + data + '\');\n'

with open('app/router.js', 'w') as data_file:
    router_data = router_data.replace('__REPLACE_ME__\n', router_addon)
    data_file.write(router_data)


##
# This will set the name of the application
#

with open('config/environment.js') as data_file:
    env_data = data_file.read()

env_name = config_data['name']

with open('config/environment.js', 'w') as data_file:
    env_data = env_data.replace('__APP_NAME__', env_name)
    data_file.write(env_data)


##
# We will then move our logo and custom css styles located in the /custom-assets volumes
#

os.chdir("/custom-assets")
if os.path.isfile(config_data['styles']):
    os.system('cp ' + config_data['styles'] + ' /leosac/leosac-web/app/styles/.')

# if (os.path.isfile('logo.png')):
#   os.system('cp logo.png /leosac/leosac-web/public/assets/images/.')


##
# The rest of this script will finalize the build of our application
#
os.chdir("/leosac/leosac-web/")

# During the build of the docker image, npm install was already called.
# This time, this is just to install our out-repo addon

returnValue = os.system("npm install")
if returnValue:
    print("Something went wrong with this command: npm install")
    sys.exit(84)

print("We will now build the application")
returnValue = os.system("ember build --prod")
if returnValue:
    print("Something went wrong during the build of the application")
    sys.exit(84)


##
# This will copy our newly build application in an accessible mounting point

os.system("cp -r dist/ /build-output/")
os.system('chown -R 1000:1000 /build-output')


print("The build is now complete, you can find the build \
in the mounting point precised in the 'docker run'")
