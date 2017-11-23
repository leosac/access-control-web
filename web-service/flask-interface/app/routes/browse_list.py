from urllib.parse import quote_plus
from flask import render_template, redirect, request, url_for, jsonify, session
from app.routes import routes
from app.models.user_model import User
from app.models.browse_config_model import BrowseConfig
from app.forms.browse_form import BrowseForm


@routes.route('/browse_list', methods=('GET', 'POST'))
def browse_list():
    if session['logged_in']:
        user_id = session['id']
        config = []
        all_config = BrowseConfig.query.all()
        for data in all_config:
            if data.user_id == user_id:
                config.append(data)
        return render_template('browse_list.html', configs=config)
    #         return redirect("http://localhost:80/entry-point/")
    #         # + quote_plus(form.address.data))
    return render_template('index.html')
