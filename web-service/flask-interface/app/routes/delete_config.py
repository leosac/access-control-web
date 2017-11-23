from urllib.parse import quote_plus
from flask import render_template, redirect, request, url_for, jsonify, session
from app.routes import routes
from app.models.user_model import User
from app.models.browse_config_model import BrowseConfig
from app.forms.browse_form import BrowseForm


@routes.route('/delete_config/<id>', methods=('GET', 'POST'))
def delete_config(id):
    from app.app import db

    db.session.delete(BrowseConfig.query.get(id))
    db.session.commit()
    return redirect(url_for('routes.browse_list'))
