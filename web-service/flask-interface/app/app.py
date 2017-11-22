from flask import Flask
from flask_appconfig import AppConfig
from flask_bootstrap import Bootstrap
from app.create_db import db
from app.routes import routes

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
