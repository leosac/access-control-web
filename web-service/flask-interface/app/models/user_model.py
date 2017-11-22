from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin
from app.create_db import db


class User(UserMixin, db.Model):
    __tablename__ = 'users'
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(64), index=True)
    email = db.Column(db.String(128), index=True)
    password_hash = db.Column(db.String(256))
    browse_configs = db.relationship('BrowseConfig', backref='user', lazy=True)

    def __init__(self, email, password, username):
        self.username = username
        self.email = email
        self.set_password(password)

    def set_password(self, password):
        self.password_hash = generate_password_hash(password)

    def verify_password(self, password):
        return check_password_hash(self.password_hash, password)
