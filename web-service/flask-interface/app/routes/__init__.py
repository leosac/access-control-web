from flask import Blueprint

routes = Blueprint('routes', __name__)

import app.routes.browse
import app.routes.browse_config
import app.routes.browse_config_create
import app.routes.browse_list
import app.routes.build
import app.routes.home
import app.routes.login
import app.routes.logout
import app.routes.register
import app.routes.delete_config
import app.routes.forgot_password
import app.routes.reset_password
import app.routes.reset_password_wait
