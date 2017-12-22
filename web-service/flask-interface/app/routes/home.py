from flask import render_template
from flask_login import login_required, current_user

from app.my_errors_wrapper import is_user_admin
from app.routes import routes


@routes.route('/', methods=['GET', 'POST'])
@login_required
def home():
    return render_template('index.html',
                           is_admin=is_user_admin(current_user.id))
