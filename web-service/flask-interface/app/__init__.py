from flask import Flask, render_template, flash
from flask_bootstrap import Bootstrap
from flask_appconfig import AppConfig
from flask_wtf import Form, RecaptchaField
from flask_wtf.file import FileField
from wtforms import TextField, HiddenField, ValidationError, RadioField,\
    BooleanField, SubmitField, IntegerField, FormField, validators,  SelectMultipleField
from wtforms.validators import Required, Regexp, Length


all_addon = ['smtp', 'piface-digital-gpio']

def formatName(st):
    st = st.replace('-', ' ')
    return st.title()

# straight from the wtforms docs:
class myForm(Form):
    name = TextField('Name:', validators=[Required(), Length(min=3, max=5)])
    addr = TextField('Leosac Address:', [
					            Required()
						        ])
    addons = SelectMultipleField('Selected addons:', choices=[(x, formatName(x)) for x in all_addon])
    submit_button = SubmitField('Submit Form')


    def validate_hidden_field(form, field):
        raise ValidationError('Always wrong')


def create_app(configfile=None):
    app = Flask(__name__)
    AppConfig(app, configfile)  # Flask-Appconfig is not necessary, but
                                # highly recommend =)
                                # https://github.com/mbr/flask-appconfig
    Bootstrap(app)

    # in a real app, these should be configured through Flask-Appconfig
    app.config['SECRET_KEY'] = 'devkey'
    app.config['RECAPTCHA_PUBLIC_KEY'] = \
        '6Lfol9cSAAAAADAkodaYl9wvQCwBMr3qGR_PPHcw'

    @app.route('/', methods=('GET', 'POST'))
    def index():
        form = myForm()
        form.validate_on_submit()  # to get error messages to the browser
        return render_template('index.html', form=form)

    return app

if __name__ == '__main__':
    create_app().run(debug=True)
