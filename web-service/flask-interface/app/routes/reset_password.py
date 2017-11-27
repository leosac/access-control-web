from flask_admin.helpers import is_safe_url
from flask_login import login_user, current_user
from werkzeug.security import generate_password_hash
from flask import request, render_template, flash, redirect, url_for, session, abort
from app.routes import routes
from app.forms.password_form import ResetPasswordForm
from app.models.user_model import User
from app.token import confirm_token
from app.app import db
from app.forms.login_form import LoginForm


@routes.route('/reset_password/<token>', methods=['GET', 'POST'])
def reset_password(token):
    email = confirm_token(token)
    form = ResetPasswordForm()
    if form.validate_on_submit() and request.method == 'POST' and email:
        user = User.query.filter_by(email=email).first()
        password = form.password.data
        user.password = generate_password_hash(password)
        db.session.commit()

        return redirect(url_for('routes.login', form=LoginForm))
    else:
        return render_template('reset_password.html', form=form)
