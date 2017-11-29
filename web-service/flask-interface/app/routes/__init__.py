from flask import Blueprint

routes = Blueprint('routes', __name__)

import app.routes.browse.browse
import app.routes.browse.browse_list
import app.routes.browse.browse_config
import app.routes.browse.browse_config_create
import app.routes.browse.delete_config
import app.routes.build
import app.routes.home
import app.routes.login
import app.routes.logout
import app.routes.register
import app.routes.forgot_password
import app.routes.reset_password
import app.routes.reset_password_wait
import app.routes.admin.dashboard
import app.routes.admin.create_user
import app.routes.admin.delete_user
import app.routes.admin.modify_user
import app.routes.admin.browse.browse_config
import app.routes.admin.browse.delete_config
import app.routes.admin.browse.browse_list
import app.routes.admin.browse.create_config
import app.routes.confirm_email
