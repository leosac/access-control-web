from flask import render_template, redirect, url_for
from app.my_errors_wrapper import check_if_admin
from app.routes import routes
from app.forms.browse_form import BrowseForm
from app.models.browse_config_model import BrowseConfig
from flask_login import login_required


@routes.route('/admin/browse/browse_config_create/<id>', methods=('GET', 'POST'))
@login_required
@check_if_admin
def admin_browse_config_create(id):
    from app.app import db

    form = BrowseForm()
    if form.validate_on_submit():
        config = BrowseConfig(name=form.name.data, address=form.address.data, user_id=id)
        db.session.add(config)
        db.session.commit()
        return redirect(url_for('routes.dashboard'))
    else:
        return render_template('admin/browse/create_config.html', form=form)
