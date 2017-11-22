from urllib.parse import quote_plus
from flask import render_template, redirect
from app.routes import routes
from app.forms.browse_form import BrowseForm


@routes.route('/browse', methods=('GET', 'POST'))
def browse():
    form = BrowseForm()
    if form.validate_on_submit():
        if form.host.data is None:
            form.host.data = 'localhost'
        if form.port.data is None:
            form.port.data = '80'

        return redirect("http://" + form.host.data + ':' + form.port.data + "/entry-point/" + quote_plus(form.address.data))
    else:
        return render_template('browse.html', form=form)
