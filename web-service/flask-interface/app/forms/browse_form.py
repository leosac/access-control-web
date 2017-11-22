from flask_wtf import Form
from wtforms import ValidationError, SubmitField, StringField
from wtforms.validators import DataRequired


class BrowseForm(Form):
    address = StringField('Leosac Address:', [DataRequired()])
    host = StringField('Host:')
    port = StringField('Port:')
    submit = SubmitField('Submit Form')

    def validate_hidden_field(self, field):
        raise ValidationError('Always wrong')
