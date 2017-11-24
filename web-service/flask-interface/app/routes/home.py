from app.routes import routes
from flask import render_template
from flask_login import login_required


@routes.route('/', methods=['GET', 'POST'])
@login_required
def home():
    """ Session control"""
    return render_template('index.html')