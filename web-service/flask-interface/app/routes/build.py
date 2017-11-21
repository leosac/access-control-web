from flask import render_template, request
from app.routes import routes
from app.file_editor import create_and_download_build
from app.forms.leosac_form import MyForm


@routes.route('/build', methods=('GET', 'POST'))
def build():
    form = MyForm()
    if form.validate_on_submit():
        return create_and_download_build(request.form)
    return render_template('build.html', form=form)
