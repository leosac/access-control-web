from functools import wraps
from urllib import request
from urllib.parse import quote

from app.fetch_role import fetch_admin_role
from app.models.user_model import User
from flask import redirect, url_for
from werkzeug.exceptions import Forbidden
from flask_login import current_user


def is_user_admin(user_id):
    user = User.query.get(user_id)
    for role in user.roles:
        if role == fetch_admin_role():
            return True
    return False


def check_if_admin(f):
    @wraps(f)
    def wrapper(*args, **kwds):
        if is_user_admin(current_user.id):
            return f(*args, **kwds)
        raise Forbidden()

    return wrapper


def confirmation_required(desc_fn):
    def inner(f):
        @wraps(f)
        def wrapper(*args, **kwargs):
            if request.args.get('confirm') != '1':
                desc = desc_fn()
                return redirect(url_for('routes.confirm',
                                        desc=desc, action_url=quote(request.url)))
            return f(*args, **kwargs)

        return wrapper

    return inner
