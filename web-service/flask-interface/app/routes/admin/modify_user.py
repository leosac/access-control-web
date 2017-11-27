from flask import render_template, redirect, url_for
from app.models.user_model import User
from app.routes import routes
from flask_login import login_required
from app.my_errors_wrapper import check_if_admin


@routes.route('/admin/modify_user/<id>', methods=('GET', 'POST'))
@login_required
@check_if_admin
def admin_modify_user(id):
    from app.app import db
    # populate the form
    # populate the user, complicated
    db.session.commit()
    return render_template()
