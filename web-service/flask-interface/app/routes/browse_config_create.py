from urllib.parse import quote_plus
from flask import render_template, redirect, url_for, session
from flask_login import current_user
from app.routes import routes
from app.forms.browse_form import BrowseForm
from app.models.browse_config_model import BrowseConfig


@routes.route('/browse_config_create', methods=('GET', 'POST'))
def browse_config_create():
    from app.app import db

    form = BrowseForm()
    if form.validate_on_submit():
        config = BrowseConfig(name=form.name.data, address=form.address.data, user_id=session['id'])
        db.session.add(config)
        db.session.commit()
        return redirect(url_for('routes.browse_list'))
    else:
        return render_template('browse_config_create.html', form=form)
