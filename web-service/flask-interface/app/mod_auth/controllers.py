from flask import Blueprint, request, render_template, \
                  flash, g, session, redirect, url_for
from werkzeug.security import check_password_hash
from app.mod_auth.forms import LoginForm
from app import db
from app.mod_auth.models import User

mod_auth = Blueprint('auth', __name__, url_prefix='/auth')


@mod_auth.route('/signin/', methods=['GET', 'POST'])
def signin():

    form = LoginForm(request.form)
    if form.validate_on_submit():
        user = User.query.filter_by(email=form.email.data).first()
        if user and check_password_hash(user.password, form.password.data):
            session['user_id'] = user.id
            flash('Welcome %s' % user.name)
            return redirect(url_for('auth.home'))
        flash('Wrong email or password', 'error-message')
    return render_template("auth/signin.html", form=form)