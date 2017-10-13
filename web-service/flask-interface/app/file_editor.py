import os
import json
import tempfile
from app.leosac_form import all_addon

def create_build(form):
    data = {}
    data['name'] = form['name']
    data['leosac_addr'] = form['addr']
    data['leosac_root_url'] = form['root_url']
    data['description'] = 'Config file for the leosac build'
    data['version'] = '1'

    in_repo_addon = []
    out_repo_addon = []
    for value in form.getlist('addon'):
        for module in all_addon:
            if (value == module.name):
                if (module.addon_type == 'in'):
                    in_repo_addon.append(value)
                elif (module.addon_type == 'out'):
                    out_repo_addon.append(value)
    data['addon'] = in_repo_addon
    data['extern-addon'] = out_repo_addon
    print(data)
#    with tempfile.TemporaryDirectory() as tmpdirectoryname:
#        print(tmpdirectoryname)
