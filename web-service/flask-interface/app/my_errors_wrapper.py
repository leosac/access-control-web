from functools import wraps
from app.models.user_model import User
from urllib.parse import quote_plus
from flask import render_template, redirect, session
from werkzeug.exceptions import Unauthorized, Forbidden

from app.routes import routes
from app.models.browse_config_model import BrowseConfig


def check_if_logged(f):
    @wraps(f)
    def wrapper(*args, **kwds):
        if not session['logged_in']:
            raise Unauthorized()
        return f(*args, **kwds)
    return wrapper


def check_if_admin(f):
    @wraps(f)
    def wrapper(*args, **kwds):
        user = User.query.get(session['id'])
        if user.id != 1:
            raise Forbidden()
        return f(*args, **kwds)
    return wrapper
