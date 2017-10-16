import os
import json
import tempfile
from app.leosac_form import all_addon
from flask import send_file, abort, make_response

def fill_json_data(form):
    data = {}
    data['name'] = form['name']
    data['leosac_addr'] = form['addr']
    data['leosac_root_url'] = form['root_url']
    data['description'] = 'Config file for the leosac build'
    data['version'] = '1'
    data['styles'] = 'app.css'

    in_repo_addon = []
    out_repo_addon = []
    for value in form.getlist('addon'):
        for module in all_addon:
            if value == module.name:
                if module.addon_type == 'in':
                    in_repo_addon.append(value)
                elif module.addon_type == 'out':
                    out_repo_addon.append(value)
    data['addon'] = in_repo_addon
    data['extern-addon'] = out_repo_addon
    return data

# At this point we filled our data with the form 
# We will now create a temporary directory in which we will build the leosac application, and then create a gzip with it
def create_and_download_build(form):
    data = fill_json_data(form)
    print(data)
    with tempfile.TemporaryDirectory() as tmpdirectoryname:
        os.chdir(tmpdirectoryname)
        print(os.getcwd())
        os.system('mkdir my-build')
        os.system('ls -la')
        with open('build-config.json', 'w') as data_file:
            data_file.write(json.dumps(data, indent=4))
        #The config-file is created
        #We will now run the docker
        return_value  = os.system('docker run -ti -v ' + tmpdirectoryname +'/my-build:/build-output -v '
         + tmpdirectoryname + '/build-config.json:/build-config.json -v ~/leosac/leosac-web/custom-assets:/custom-assets leosac-web:latest')
        if return_value:
            abort(404)
        print('BUILD WORKED')
        os.chdir(tmpdirectoryname + '/my-build/')
        print(os.getcwd())
        os.system('ls -la')
        print('PATH WORKED')
        value = os.system('tar -zcvf build.tar.gz dist/')
        print(value)
        print('COMPRESSION WORKED')
        headers = {"Content-Disposition": "attachment; filename=build.tar.gz"}
        with open(tmpdirectoryname + '/my-build/build.tar.gz', 'r+b') as data_file:
            data = data_file.read()
        return make_response((data, headers))
