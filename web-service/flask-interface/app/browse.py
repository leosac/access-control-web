from flask_wtf import Form, RecaptchaField
from wtforms import TextField, HiddenField, ValidationError, RadioField, SelectField, \
    BooleanField, SubmitField, IntegerField, FormField, validators,  SelectMultipleField, widgets, StringField
from wtforms.validators import Required, Regexp, Length, DataRequired

class BrowseForm(Form):
    address = StringField('Leosac Address:', [DataRequired()])
    submit_button = SubmitField('Submit Form')

    def validate_hidden_field(form, field):
        raise ValidationError('Always wrong')
