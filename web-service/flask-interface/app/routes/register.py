from flask import render_template, redirect, url_for, flash

from app.email import send_email
from app.fetch_role import fetch_user_role
from app.routes import routes
from app.forms.register_form import MyRegisterForm
from app.models.user_model import User
from app.token import generate_confirmation_token


@routes.route('/register/', methods=['GET', 'POST'])
def register():
    from app.app import db
    """Register Form"""
    form = MyRegisterForm()
    if form.validate_on_submit():
        exist = db.session.query(User).filter_by(email=form.email.data).first()
        if exist is not None:
            return render_template('register.html', form=form,
                                   error='There is already an account with this email address')
        new_user = User(username=form.username.data, email=form.email.data, password=form.password.data, active=True,
                        confirmed=False)
        new_user.roles.append(fetch_user_role())

        token = generate_confirmation_token(new_user.email)
        confirm_url = url_for('routes.confirm_email', token=token, _external=True)
        html = render_template('mail_confirmation_account.html', confirm_url=confirm_url)
        subject = "Please confirm your email"
        send_email(new_user.email, subject, html)

        flash('A confirmation email has been sent via email.', 'success')

        db.session.add(new_user)
        db.session.commit()
        return redirect(url_for('routes.login'))
    return render_template('register.html', form=form)
