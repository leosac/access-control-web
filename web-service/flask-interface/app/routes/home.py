from app.routes import routes
from flask import render_template


@routes.route('/', methods=['GET', 'POST'])
def home():
    """ Session control"""
    return render_template('index.html')