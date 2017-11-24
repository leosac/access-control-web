from flask import Flask, render_template
from flask_login import LoginManager
from flask_appconfig import AppConfig
from flask_bootstrap import Bootstrap
from flask_mail import Mail
from flask_user import SQLAlchemyAdapter, UserManager
from app.forms.register_form import MyRegisterForm
from app.create_db import db
from app.routes import routes
from app.create_roles import user, admin
from app.models.user_model import User  # Define the WSGI application object

app = Flask(__name__)

db.init_app(app)

# Configurations
app.config.from_object('config')

# add the app blueprints
app.register_blueprint(routes)

AppConfig(app, configfile=None)
bootstrap = Bootstrap(app)

app.secret_key = '\x84\xa4{;\x7f\xa6\xc4\x1f\xbf\x89\xd7\x17T\xd88\xbe\x0b\xfam=E\xdc6'

mail = Mail(app)


def init_email_error_handler(app):
    """
    Initialize a logger to send emails on error-level messages.
    Unhandled exceptions will now send an email message to app.config.ADMINS.
    """
    # if app.debug: return  # Do not send error emails while developing

    # Retrieve email settings from app.config
    host = app.config['MAIL_SERVER']
    port = app.config['MAIL_PORT']
    from_addr = app.config['MAIL_DEFAULT_SENDER']
    username = app.config['MAIL_USERNAME']
    password = app.config['MAIL_PASSWORD']
    secure = () if app.config.get('MAIL_USE_TLS') else None

    # Retrieve app settings from app.config
    to_addr_list = app.config['ADMINS']
    subject = app.config.get('APP_SYSTEM_ERROR_SUBJECT_LINE', 'System Error')

    # Setup an SMTP mail handler for error-level messages
    import logging
    from logging.handlers import SMTPHandler

    mail_handler = SMTPHandler(
        mailhost=(host, port),  # Mail host and port
        fromaddr=from_addr,  # From address
        toaddrs=to_addr_list,  # To address
        subject=subject,  # Subject line
        credentials=(username, password),  # Credentials
        secure=secure,
    )
    mail_handler.setLevel(logging.ERROR)
    app.logger.addHandler(mail_handler)

    # Log errors using: app.logger.error('Some error message')


init_email_error_handler(app)

login_manager = LoginManager()
login_manager.init_app(app)
login_manager.login_view = "routes.login"


@login_manager.user_loader
def load_user(id):
    return User.query.filter_by(id=id).first()


@app.errorhandler(404)
def page_not_found(e):
    return render_template('404.html'), 404


@app.errorhandler(401)
def page_not_found(e):
    return render_template('401.html'), 401


@app.errorhandler(403)
def page_not_found(e):
    return render_template('403.html'), 403
