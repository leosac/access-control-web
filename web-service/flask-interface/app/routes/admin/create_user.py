from flask import render_template, redirect, url_for
from app.forms.user_form import UserForm
from app.models.user_model import User
from app.routes import routes
from flask_login import login_required
from app.my_errors_wrapper import check_if_admin
from app.fetch_role import fetch_user_role, fetch_admin_role


@routes.route('/admin/create_user', methods=('GET', 'POST'))
@login_required
@check_if_admin
def admin_create_user():
    from app.app import db
    form = UserForm()
    if form.validate_on_submit():
        new_user = User(username=form.username.data, email=form.email.data, password='password', active=True)
        for role in form.roles.data:
            if role == 'user':
                new_user.roles.append(fetch_user_role())
            elif role == 'admin':
                new_user.roles.append(fetch_admin_role())
        db.session.add(new_user)
        db.session.commit()
        return redirect(url_for('routes.dashboard'))
    return render_template('admin/create_user.html', form=form)
