from flask import Flask, render_template, request
from flask_bootstrap import Bootstrap
from flask_appconfig import AppConfig
from .file_editor import create_and_download_build
from .leosac_form import MyForm


UPLOAD_FOLDER = '/tmp/'
ALLOWED_EXTENSIONS = set(['txt'])


def allowed_file(filename):
    return '.' in filename and \
           filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS


def create_app(configfile=None):
    app = Flask(__name__)
    app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER
    AppConfig(app, configfile)
    Bootstrap(app)

    # in a real app, these should be configured through Flask-Appconfig
    app.config['SECRET_KEY'] = 'devkey'

    @app.route('/', methods=('GET', 'POST'))
    def index():
        form = MyForm()
        if form.validate_on_submit():
            return create_and_download_build(request.form)
        return render_template('index.html', form=form)
    return app

# return send_file('/home/stagiaire/text.txt', attachment_filename='test.txt')


if __name__ == '__main__':
    create_app().run(debug=True)
