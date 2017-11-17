# Import Form and RecaptchaField (optional)
from flask_wtf import Form
from wtforms import PasswordField, StringField
from wtforms.validators import Email, DataRequired


class LoginForm(Form):
    email = StringField('Email Address', [Email(),
                                          DataRequired(message='Please enter your address email?')])
    password = PasswordField('Password', [
                DataRequired(message='Forgot your password? ..')])
