from werkzeug.security import check_password_hash
from flask import request, render_template, flash, redirect, url_for, session
from app.routes import routes
from app.forms.login_form import LoginForm
from app.models.user_model import User


@routes.route('/login', methods=['GET', 'POST'])
def login():
    """Login Form"""
    form = LoginForm()
    if request.method == 'POST' and form.validate_on_submit():
        email = form.email.data
        password = form.password.data
        try:
            data = User.query.filter_by(email=email).first()
            if data and check_password_hash(data.password_hash, password):
                session['logged_in'] = True
                return redirect(url_for('routes.home'))
            else:
                flash("Bad combination of email/password", 'danger')
                return render_template('login.html', form=form)
        except Exception as e:
            flash(e, 'danger')
            flash("Bad combination of email/password", 'danger')
            return render_template('login.html', form=form)
    else:
        return render_template('login.html', form=form)
