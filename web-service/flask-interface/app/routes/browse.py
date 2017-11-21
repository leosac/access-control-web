from urllib.parse import quote_plus
from flask import render_template, redirect
from app.routes import routes
from app.forms.browse_form import BrowseForm


@routes.route('/browse', methods=('GET', 'POST'))
def browse():
    form = BrowseForm()
    if form.validate_on_submit():
        return redirect("http://127.0.0.1/entry-point/" + quote_plus(form.address.data))
    else:
        return render_template('browse.html', form=form)
