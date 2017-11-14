from flask import Flask, render_template, request, redirect, url_for
from flask_bootstrap import Bootstrap
from flask_appconfig import AppConfig
from .file_editor import create_and_download_build
from .leosac_form import MyForm
from .browse import BrowseForm
from flask_wtf import Form
from wtforms import SubmitField
from urllib.parse import quote_plus


UPLOAD_FOLDER = '/tmp/'
ALLOWED_EXTENSIONS = set(['txt'])


def allowed_file(filename):
    return '.' in filename and \
           filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS


class WhichMethod(Form):
    browse = SubmitField()
    build = SubmitField()

def create_app(configfile=None):
    app = Flask(__name__)
    app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER
    AppConfig(app, configfile)
    Bootstrap(app)

    # in a real app, these should be configured through Flask-Appconfig
    app.config['SECRET_KEY'] = 'devkey'

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
            print("http://127.0.0.1/entry-point/" + quote_plus(form.address.data))
            return redirect("http://127.0.0.1/entry-point/" + quote_plus(form.address.data))
        else:
            return render_template('browse.html', form=form)

    @app.route('/build', methods=('GET', 'POST'))
    def build():
        form = MyForm()
        if form.validate_on_submit():
            return create_and_download_build(request.form)
        return render_template('build.html', form=form)

    return app

# return send_file('/home/stagiaire/text.txt', attachment_filename='test.txt')


if __name__ == '__main__':
    create_app().run(debug=True)
