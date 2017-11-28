from functools import wraps
from urllib import request
from urllib.parse import quote

from app.models.user_model import User
from flask import redirect, url_for
from werkzeug.exceptions import Forbidden
from flask_login import current_user


def check_if_admin(f):
    @wraps(f)
    def wrapper(*args, **kwds):
        user = User.query.get(current_user.id)
        for role in user.roles:
            if role.name == 'admin':
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
