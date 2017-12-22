import os
from flask import request, render_template, flash, redirect, url_for
from app.models.user_model import User
from app.routes import routes
from app.forms.email_form import EmailForm
from app.token import generate_confirmation_token
from flask_mail import Message
from app.email import send_email
import time


# This will send an email to the user if he validate the form,
# If the email address doesn't exist, we will still wait 2 second, but it will do nothing.
#  The 2 second are here to not inform a user that an email address exist.

@routes.route('/forgot_password', methods=['GET', 'POST'])
def forgot_password():
    form = EmailForm()
    if form.validate_on_submit() and request.method == 'POST':
        email = form.email.data
        user = User.query.filter_by(email=email).first()
        if email:
            if user:
                token = generate_confirmation_token(email)
                confirm_url = url_for('routes.reset_password', token=token,
                                      _external=True)
                html = render_template('mail_reset_password.html',
                                       confirm_url=confirm_url)
                subject = "Please confirm your email"
                send_email(email, subject, html)

            else:
                time.sleep(2)
            return redirect(url_for('routes.reset_password_wait'))
        else:
            flash('Invalid Email')
            return render_template('forgot_password.html', form=form)
    else:
        return render_template('forgot_password.html', form=form)
