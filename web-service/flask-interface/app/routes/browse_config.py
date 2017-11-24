from functools import wraps

from flask import render_template, redirect, url_for, session
from werkzeug.exceptions import NotFound, Forbidden
from flask_login import login_required, current_user
from app.routes import routes
from app.forms.browse_form import BrowseForm
from app.models.browse_config_model import BrowseConfig
from app.app import db


def check_user_right(f):
    @wraps(f)
    def wrapper(*args, **kwds):
        id = kwds['id']
        user_config = BrowseConfig.query.get(id)
        if user_config is not None:
            if user_config.user_id != current_user.id:
                raise Forbidden()
        return f(*args, **kwds)
    return wrapper


@routes.route('/browse_config/<id>', methods=('GET', 'POST'))
@login_required
@check_user_right
def browse_config(id):
    user_config = BrowseConfig.query.get(id)
    if user_config is not None:
        form = BrowseForm(obj=user_config)
        form.populate_obj(user_config)
        if form.validate_on_submit():
            db.session.commit()
            return redirect(url_for('routes.browse_list'))
        else:
            return render_template('browse_config.html', form=form)
    else:
        raise NotFound()
