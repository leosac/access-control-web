from flask_admin.helpers import is_safe_url
from flask_login import login_user, current_user
from werkzeug.security import check_password_hash
from flask import request, render_template, flash, redirect, url_for, session, abort
from app.routes import routes
from app.forms.password_form import ResetPasswordForm
from app.models.user_model import User


@routes.route('/reset_password', methods=['GET', 'POST'])
def reset_password():
    form = ResetPasswordForm()
    if form.validate_on_submit() and request.method == 'POST':
        user = User.query.get()
        password = form.password.data

        # do something here, like fetching the token to allow the user to modify his password

        # next = request.args.get('next')
        # if not is_safe_url(next):
        #     return abort(400)

        return redirect(next or url_for('routes.home'))
    else:
        return render_template('login.html', form=form)
