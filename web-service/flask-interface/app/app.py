from flask import Flask, render_template
from flask_login import LoginManager
from flask_appconfig import AppConfig
from flask_bootstrap import Bootstrap
from app.create_db import db
from app.routes import routes
from app.create_roles import user, admin

# Define the WSGI application object
app = Flask(__name__)

db.init_app(app)

# Configurations
app.config.from_object('config')

# add the app blueprints
app.register_blueprint(routes)

AppConfig(app, configfile=None)
bootstrap = Bootstrap(app)

app.secret_key = '\x84\xa4{;\x7f\xa6\xc4\x1f\xbf\x89\xd7\x17T\xd88\xbe\x0b\xfam=E\xdc6'


@app.errorhandler(404)
def page_not_found(e):
    return render_template('404.html'), 404


@app.errorhandler(401)
def page_not_found(e):
    return render_template('401.html'), 401


@app.errorhandler(403)
def page_not_found(e):
    return render_template('403.html'), 403
