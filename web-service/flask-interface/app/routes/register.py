from flask import render_template, redirect, url_for, session
from app.routes import routes
from app.forms.register_form import MyRegisterForm
from app.models.user_model import User, Role
from app.create_roles import user


@routes.route('/register/', methods=['GET', 'POST'])
def register():
    from app.app import db

    """Register Form"""
    form = MyRegisterForm()
    if form.validate_on_submit():
        new_user = User(username=form.username.data, email=form.email.data, password=form.password.data)
        new_user.roles.append(user)
        db.session.add(new_user)
        db.session.commit()
        return redirect(url_for('routes.login'))
    return render_template('register.html', form=form)
