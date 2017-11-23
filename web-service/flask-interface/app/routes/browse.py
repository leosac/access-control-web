from urllib.parse import quote_plus
from flask import render_template, redirect
from app.routes import routes
from app.models.browse_config_model import BrowseConfig


@routes.route('/browse/<id>', methods=('GET', 'POST'))
def browse(id):
    loaded_config = BrowseConfig.query.get(id)
    return redirect("http://localhost:80/entry-point/" + quote_plus(loaded_config.address))
