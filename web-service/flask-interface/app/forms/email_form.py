from flask_wtf import Form
from wtforms import ValidationError, SubmitField, StringField
from wtforms.validators import DataRequired, Length, Email


class EmailForm(Form):
    email = StringField('Email:', [DataRequired(), Email()])
    submit = SubmitField('Reset password')

    def validate_hidden_field(self, field):
        raise ValidationError('Always wrong')
