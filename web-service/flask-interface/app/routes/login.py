from flask_admin.helpers import is_safe_url
from flask_login import login_user
from werkzeug.security import check_password_hash
from flask import request, render_template, flash, redirect, url_for, session, abort
from app.routes import routes
from app.forms.login_form import LoginForm
from app.models.user_model import User


@routes.route('/login', methods=['GET', 'POST'])
def login():
    form = LoginForm()
    if form.validate_on_submit() and request.method == 'POST':
        email = form.email.data
        password = form.password.data
        user = User.query.filter_by(email=email).first()
        if user and user.verify_password(password):
            login_user(user)

            flash('Logged in successfully.')

            next = request.args.get('next')
            if not is_safe_url(next):
                return abort(400)

            return redirect(next or url_for('routes.home'))
        else:
            flash('Invalid Email and/or password.')
            return render_template('login.html', form=form)
    else:
        return render_template('login.html', form=form)
