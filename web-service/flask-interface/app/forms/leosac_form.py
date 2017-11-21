from flask_wtf import Form
from wtforms import ValidationError, SelectField, SubmitField,\
    SelectMultipleField, StringField

from wtforms.validators import Length, DataRequired


class ModuleDescription(object):
    def __init__(self, name, addon_type):
        self.name = name
        self.addon_type = addon_type


class StyleDescription(object):
    def __init__(self, name, real_name):
        self.name = name
        self.real_name = real_name


all_addon = [
    ModuleDescription('smtp', 'in'),
    ModuleDescription('piface-digital-gpio', 'in'),
    ModuleDescription('wiegand-reader', 'in'),
    ModuleDescription('led-buzzer', 'in'),
    ModuleDescription('evoxs', 'out')
]

all_style = [
    StyleDescription('Style 1', 'app.css'),
    StyleDescription('Style 2', 'app.css')
]


def formatName(st):
    st = st.replace('-', ' ')
    return st.title()


class MyForm(Form):
    name = StringField('Name:', validators=[DataRequired(), Length(min=3, max=5)])
    addr = StringField('Leosac Address:', [DataRequired()])
    root_url = StringField('Root URL:', [DataRequired()])
    my_addons = [(x.name, formatName(x.name)) for x in all_addon]
    addon = SelectMultipleField('Addons:', choices=my_addons)
    my_styles = [(x.name, x.name) for x in all_style]
    style = SelectField('Styles:', choices=my_styles)
    submit_button = SubmitField('Submit Form')

    def validate_hidden_field(form, field):
        raise ValidationError('Always wrong')
