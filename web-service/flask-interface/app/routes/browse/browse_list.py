from urllib.parse import quote_plus
from flask import render_template, redirect, request, url_for, jsonify, session
from app.routes import routes
from app.models.user_model import User
from app.models.browse_config_model import BrowseConfig
from app.forms.browse_form import BrowseForm
from flask_login import login_required, current_user


@routes.route('/browse_list', methods=('GET', 'POST'))
@login_required
def browse_list():
    user_id = current_user.id
    config = []
    all_config = BrowseConfig.query.all()
    for data in all_config:
        if data.user_id == user_id:
            config.append(data)
    return render_template('browse/browse_list.html', configs=config)
