from flask import redirect, url_for, render_template
from wtforms import SubmitField
from flask_wtf import Form
from app.models.user_model import User
from app.my_errors_wrapper import check_if_admin, confirmation_required
from app.routes import routes
from flask_login import login_required


@routes.route('/admin/delete_user/<id>', methods=('GET', 'POST'))
@login_required
@check_if_admin
def admin_delete_user(id):
    from app.app import db

    db.session.delete(User.query.get(id))
    db.session.commit()
    return redirect(url_for('routes.dashboard'))
