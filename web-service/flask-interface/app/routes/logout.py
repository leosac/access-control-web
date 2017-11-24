from app.routes import routes
from flask import session, redirect, url_for
from flask_login import login_required, logout_user


@routes.route("/logout")
@login_required
def logout():
    """Logout Form"""
    logout_user()
    return redirect(url_for('routes.home'))
