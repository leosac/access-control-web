from app.models.user_model import User
from app.routes import routes
from flask import render_template
from flask_login import login_required, current_user


@routes.route('/', methods=['GET', 'POST'])
@login_required
def home():
    """ Session control"""
    user = User.query.get(current_user.id)
    is_admin = False
    for role in user.roles:
        if role.name == 'admin':
            is_admin = True
        else:
            is_admin = False
    return render_template('index.html', is_admin=is_admin)
