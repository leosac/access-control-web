from flask import Blueprint

routes = Blueprint('routes', __name__)

import app.routes.browse
import app.routes.build
import app.routes.home
import app.routes.login
import app.routes.logout
import app.routes.register
