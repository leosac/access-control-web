from urllib.parse import quote_plus
from flask import render_template, redirect, request, url_for, jsonify, session
from app.routes import routes
from app.models.user_model import User
from app.models.browse_config_model import BrowseConfig
from app.forms.browse_form import BrowseForm


@routes.route('/browse_list', methods=('GET', 'POST'))
def browse_list():
    user_id = session['id']
    config = []
    all_config = BrowseConfig.query.all()
    for data in all_config:
        if data.user_id == user_id:
            config.append(data)

    # if request.method == 'POST':
    #     print("request = POST")
    #     if request.form['submit'] == 'Create Config':
    #         print("JDLSJDLSJDLJS")
    #         return redirect(url_for('routes.browse_config'))
    #     elif request.form['submit'] == 'Browse':
    #         return redirect("http://localhost:80/entry-point/")
    #         # + quote_plus(form.address.data))
    #     else:
    #         pass  # unknown
    return render_template('browse_list.html', configs=config)
