from flask_wtf import Form
from wtforms import ValidationError, SubmitField, StringField
from wtforms.validators import DataRequired, Length


class BrowseForm(Form):
    name = StringField('Config Name:', [DataRequired(), Length(min=3, max=30)])
    address = StringField('Leosac Address:', [DataRequired()])
    submit = SubmitField('Submit Form')

    def validate_hidden_field(self, field):
        raise ValidationError('Always wrong')
