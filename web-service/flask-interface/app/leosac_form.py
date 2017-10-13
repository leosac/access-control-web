from flask_bootstrap import Bootstrap
from flask_appconfig import AppConfig
from flask_wtf import Form, RecaptchaField
from flask_wtf.file import FileField
from wtforms import TextField, HiddenField, ValidationError, RadioField,\
    BooleanField, SubmitField, IntegerField, FormField, validators,  SelectMultipleField, widgets

from wtforms.validators import Required, Regexp, Length

class ModuleDescription(object):
    def __init__(self, name, addon_type):
        self.name = name
        self.addon_type = addon_type

smtp = ModuleDescription('smtp', 'in')
piface_digital_gpio = ModuleDescription('piface-digital-gpio', 'in')
wiegand = ModuleDescription('wiegand', 'in')
evoxs = ModuleDescription('evoxs', 'out')

all_addon = [
    smtp,
    piface_digital_gpio,
    wiegand,
    evoxs
    ]

def formatName(st):
    st = st.replace('-', ' ')
    return st.title()

## this is in stand by, because if we want to use it,
#  we will have to configuure the html style by hand
class MultiCheckboxField(SelectMultipleField):
    widget = widgets.ListWidget(prefix_label=True)
    option_widget = widgets.CheckboxInput()

# straight from the wtforms docs:
class MyForm(Form):
    name = TextField('Name:', validators=[Required(), Length(min=3, max=5)])
    addr = TextField('Leosac Address:', [Required()])
    root_url = TextField('Root URL:', [Required()])
    my_addons = [(x.name, formatName(x.name)) for x in all_addon]
    addon = SelectMultipleField('Addons:', choices=my_addons)
    submit_button = SubmitField('Submit Form')

    def validate_hidden_field(form, field):
        raise ValidationError('Always wrong')
