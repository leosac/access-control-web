from flask import request, render_template, flash, redirect, url_for
from app.routes import routes
from app.forms.email_form import EmailForm
from app.token import generate_confirmation_token
from flask_mail import Message
from app.email import send_email


@routes.route('/forgot_password', methods=['GET', 'POST'])
def forgot_password():
    form = EmailForm()
    if form.validate_on_submit() and request.method == 'POST':
        email = form.email.data
        if email:
            token = generate_confirmation_token(email)
            confirm_url = url_for('', token=token, _external=True)
            html = render_template('reset_password.html', confirm_url=confirm_url)
            subject = "Please confirm your email"
            send_email(email, subject, html)
            flash('Sending reset email')
            return redirect(url_for('routes.reset_password_wait'))
        else:
            flash('Invalid Email and/or password.')
            return render_template('login.html', form=form)
    else:
        return render_template('login.html', form=form)
