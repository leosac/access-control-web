from flask import render_template, request
from app.routes import routes
from app.file_editor import create_and_download_build
from app.forms.leosac_form import MyForm
from app.my_errors_wrapper import check_if_logged, check_if_admin
from flask_user import roles_required


@routes.route('/build', methods=('GET', 'POST'))
@check_if_logged
@check_if_admin
def build():
    form = MyForm()
    if form.validate_on_submit():
        return create_and_download_build(request.form)
    return render_template('build.html', form=form)
