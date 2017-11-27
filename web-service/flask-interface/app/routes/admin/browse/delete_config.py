from flask import redirect, url_for
from app.my_errors_wrapper import check_if_admin
from app.routes import routes
from app.models.browse_config_model import BrowseConfig
from flask_login import login_required


@routes.route('/admin/browse/delete_config/<id>', methods=('GET', 'POST'))
@login_required
@check_if_admin
def admin_delete_config(id):
    from app.app import db

    config = BrowseConfig.query.get(int(id))
    db.session.delete(config)
    db.session.commit()
    return redirect(url_for('routes.dashboard'))
