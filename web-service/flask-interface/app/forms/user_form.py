from wtforms import StringField, PasswordField, SubmitField, SelectMultipleField
from wtforms.validators import DataRequired, EqualTo, Email, Length
from flask_wtf import Form

all_role = [
    'admin',
    'user'
]


class UserForm(Form):
    username = StringField('Username', validators=[DataRequired(), Length(min=3, max=40)])
    email = StringField('Email', validators=[DataRequired(), Email()])
    user_role = [(x, x) for x in all_role]
    my_roles = SelectMultipleField('Roles:', choices=user_role)
    submit = SubmitField('Register')

    def __init__(self, *args, **kwargs):
        super(UserForm, self).__init__(*args, **kwargs)
