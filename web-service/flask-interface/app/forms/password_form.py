from flask_wtf import Form
from wtforms import ValidationError, SubmitField, StringField, PasswordField
from wtforms.validators import DataRequired, Length, Email, EqualTo


class ResetPasswordForm(Form):
    password = PasswordField('New password:', [DataRequired()])
    password_again = PasswordField('Confirm password:', [DataRequired(), EqualTo('password')])
    submit = SubmitField('Reset password')

    def validate_hidden_field(self, field):
        raise ValidationError('Always wrong')
