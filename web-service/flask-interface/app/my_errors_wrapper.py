from functools import wraps
from app.models.user_model import User
from urllib.parse import quote_plus
from flask import render_template, redirect, session
from werkzeug.exceptions import Unauthorized, Forbidden
from flask_login import current_user
from app.routes import routes
from app.models.browse_config_model import BrowseConfig


def check_if_admin(f):
    @wraps(f)
    def wrapper(*args, **kwds):
        user = User.query.get(current_user.id)
        for role in user.roles:
            if role == 'admin':
                return f(*args, **kwds)
        raise Forbidden()
    return wrapper
