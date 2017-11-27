from flask import render_template, request
from app.routes import routes
from app.file_editor import create_and_download_build
from app.forms.leosac_form import MyForm
from flask_login import login_required
from app.my_errors_wrapper import check_if_admin
from app.models.user_model import User


@routes.route('/admin/dashboard', methods=('GET', 'POST'))
@login_required
@check_if_admin
def dashboard():
    users = User.query.all()
    return render_template('admin/dashboard.html', users=users)
