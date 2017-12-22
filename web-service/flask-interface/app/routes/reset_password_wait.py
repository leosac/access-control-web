from app.routes import routes
from flask import render_template
from flask_login import login_required


@routes.route('/reset_password_wait', methods=['GET', 'POST'])
def reset_password_wait():
    """ Session control"""
    return render_template('reset_password_wait.html')