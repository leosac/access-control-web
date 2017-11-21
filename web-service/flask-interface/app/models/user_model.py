from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin
import sqlalchemy

from app.create_db import db


class User(UserMixin, db.Model):
    __tablename__ = 'users'
    id = sqlalchemy.Column(sqlalchemy.Integer, primary_key=True)
    email = sqlalchemy.Column(sqlalchemy.String(128), index=True)
    password_hash = sqlalchemy.Column(sqlalchemy.String(256))

    def __init__(self, email, password):
        self.email = email
        self.set_password(password)

    def set_password(self, password):
        self.password_hash = generate_password_hash(password)

    def verify_password(self, password):
        return check_password_hash(self.password_hash, password)
