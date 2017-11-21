from app.routes import routes
from flask import session, redirect, url_for


@routes.route("/logout")
def logout():
    """Logout Form"""
    session['logged_in'] = False
    return redirect(url_for('routes.home'))
