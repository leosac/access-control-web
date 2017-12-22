from flask import render_template, redirect, url_for, request
from werkzeug.exceptions import NotFound
from app.fetch_role import fetch_admin_role, fetch_user_role
from app.forms.user_form import UserForm
from app.models.user_model import User
from app.routes import routes
from flask_login import login_required
from app.my_errors_wrapper import check_if_admin


@routes.route('/admin/modify_user/<id>', methods=('GET', 'POST'))
@login_required
@check_if_admin
def admin_modify_user(id):
    from app.app import db
    user = User.query.get(id)
    if user is not None:
        form = UserForm()
        if request.method == 'GET':
            form.username.data = user.username
            form.email.data = user.email
            all_roles = []
            for role in user.roles:
                all_roles.append(role.name)

            form.my_roles.data = all_roles
        # we will now populate the roles
        if form.validate_on_submit():
            # this will check if the email exist,
            #  and if it exist, verify if that the one of the user currently modified
            exist = db.session.query(User).filter_by(email=form.email.data).first()
            if exist is not None:
                if user.email != form.email.data:
                    return render_template('admin/modify_user.html', id=id, form=form,
                                           error='There is already an account with this email address')

            # Delete the relationships between the roles and the users
            user.roles[:] = []

            # This will enumerate the role from the form, and add them to the user
            for role in form.my_roles.data:
                if role == 'user':
                    user.roles.append(fetch_user_role())
                elif role == 'admin':
                    user.roles.append(fetch_admin_role())
            user.username = form.username.data
            user.email = form.email.data
            db.session.add(user)
            db.session.commit()
            return redirect(url_for('routes.dashboard'))
        return render_template('admin/modify_user.html', form=form)
    else:
        raise NotFound()
