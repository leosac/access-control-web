from flask_wtf import Form
from wtforms import ValidationError, SubmitField, StringField
from wtforms.validators import DataRequired


class BrowseForm(Form):
    address = StringField('Leosac Address:', [DataRequired()])
    submit_button = SubmitField('Submit Form')

    def validate_hidden_field(form, field):
        raise ValidationError('Always wrong')
