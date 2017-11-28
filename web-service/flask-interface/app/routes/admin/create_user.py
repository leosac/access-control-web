from flask import render_template, redirect, url_for
from app.forms.user_form import UserForm
from app.models.user_model import User
from app.routes import routes
from flask_login import login_required
from app.my_errors_wrapper import check_if_admin
from app.fetch_role import fetch_user_role, fetch_admin_role
import os
from app.token import generate_confirmation_token
from app.email import send_email


@routes.route('/admin/create_user', methods=('GET', 'POST'))
@login_required
@check_if_admin
def admin_create_user():
    from app.app import db
    form = UserForm()
    if form.validate_on_submit():
        password = os.urandom(24)
        exist = db.session.query(User).filter_by(email=form.email.data).first()
        if exist is not None:
            return render_template('admin/create_user.html', form=form,
                                   error='There is already an account with this email address')
        new_user = User(username=form.username.data, email=form.email.data, password=password, active=True)
        for role in form.my_roles.data:
            if role == 'user':
                new_user.roles.append(fetch_user_role())
            elif role == 'admin':
                new_user.roles.append(fetch_admin_role())
        db.session.add(new_user)
        email = form.email.data
        # We ill send an email to the user asking him to reset his password
        token = generate_confirmation_token(email)
        confirm_url = url_for('routes.reset_password', token=token,
                              _external=True)
        html = render_template('mail_reset_password.html',
                               confirm_url=confirm_url)
        subject = "Leosac select password"
        send_email(email, subject, html)

        db.session.commit()
        return redirect(url_for('routes.dashboard'))
    return render_template('admin/create_user.html', form=form)
