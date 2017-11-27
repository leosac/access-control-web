from flask import render_template, redirect, url_for
from werkzeug.exceptions import NotFound
from flask_login import login_required
from app.my_errors_wrapper import check_if_admin
from app.routes import routes
from app.forms.browse_form import BrowseForm
from app.models.browse_config_model import BrowseConfig
from app.app import db


@routes.route('/admin/browse/browse_config/<id>', methods=('GET', 'POST'))
@login_required
@check_if_admin
def admin_browse_config(id):
    user_config = BrowseConfig.query.get(id)
    if user_config is not None:
        form = BrowseForm(obj=user_config)
        form.populate_obj(user_config)
        if form.validate_on_submit():
            db.session.commit()
            return redirect(url_for('routes.dashboard'))
        else:
            return render_template('browse/browse_config.html', form=form)
    else:
        raise NotFound()
