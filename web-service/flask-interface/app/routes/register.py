from flask import render_template, redirect, url_for
from app.routes import routes
from app.forms.register_form import RegisterForm
from app.models.user_model import User


@routes.route('/register/', methods=['GET', 'POST'])
def register():
    from app.app import db

    """Register Form"""
    form = RegisterForm()
    if form.validate_on_submit():
        new_user = User(email=form.email.data, password=form.password.data)
        db.session.add(new_user)
        db.session.commit()
        return redirect(url_for('routes.login'))
    return render_template('register.html', form=form)
