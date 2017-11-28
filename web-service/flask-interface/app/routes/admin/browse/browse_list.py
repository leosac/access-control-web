from urllib.parse import quote_plus
from flask import render_template, redirect, request, url_for, jsonify, session
from app.my_errors_wrapper import check_if_admin
from app.routes import routes
from app.models.user_model import User
from app.models.browse_config_model import BrowseConfig
from app.forms.browse_form import BrowseForm
from flask_login import login_required, current_user


@routes.route('/admin/browse/browse_list/<id>', methods=('GET', 'POST'))
@login_required
@check_if_admin
def admin_browse_list(id):
    config = []
    all_config = BrowseConfig.query.all()
    for data in all_config:
        if data.user_id == int(id):
            config.append(data)
    return render_template('admin/browse/browse_list.html', configs=config, user_id=id)
