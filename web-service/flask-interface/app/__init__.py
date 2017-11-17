from flask import Flask, render_template, request, redirect, url_for
from flask_bootstrap import Bootstrap
from flask_appconfig import AppConfig
from .file_editor import create_and_download_build
from .leosac_form import MyForm
from .browse import BrowseForm
from flask_wtf import Form
from wtforms import SubmitField
from urllib.parse import quote_plus
from flask_sqlalchemy import SQLAlchemy


class WhichMethod(Form):
    browse = SubmitField()
    build = SubmitField()


# Define the WSGI application object
app = Flask(__name__)

# Configurations
app.config.from_object('config')

# Define the database object which is imported
# by modules and controllers
db = SQLAlchemy(app)

# Sample HTTP error handling

# Import a module / component using its blueprint handler variable (mod_auth)

# Register blueprint(s)
# app.register_blueprint(xyz_module)
# ..

# Build the database:
# This will create the database file using SQLAlchemy
db.create_all()

AppConfig(app, configfile=None)
Bootstrap(app)

from app.mod_auth.controllers import mod_auth as auth_module

app.register_blueprint(auth_module)


@app.errorhandler(404)
def not_found(error):
    return render_template('404.html'), 404


@app.route('/', methods=('GET', 'POST'))
def index():
    form = WhichMethod()
    if form.validate_on_submit():
        if form.browse.data:
            return redirect(url_for('browse'))
        elif form.build.data:
            return redirect(url_for('build'))
        else:
            pass

    elif request.method == 'GET':
        return render_template('index.html', form=form)


@app.route('/browse', methods=('GET', 'POST'))
def browse():
    form = BrowseForm()
    if form.validate_on_submit():
        return redirect("http://127.0.0.1/entry-point/" + quote_plus(form.address.data))
    else:
        return render_template('browse.html', form=form)


@app.route('/build', methods=('GET', 'POST'))
def build():
    form = MyForm()
    if form.validate_on_submit():
        return create_and_download_build(request.form)
    return render_template('build.html', form=form)


if __name__ == '__main__':
    app.run(debug=True)
