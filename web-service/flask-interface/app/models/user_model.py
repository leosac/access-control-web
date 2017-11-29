from sqlalchemy import UniqueConstraint
from werkzeug.security import generate_password_hash, check_password_hash
from flask_user import UserMixin
from app.create_db import db


class Role(db.Model):
    __tablename__ = 'roles'
    id = db.Column(db.Integer(), primary_key=True)
    name = db.Column(db.String(50), unique=True)


class User(UserMixin, db.Model):
    __tablename__ = 'users'
    id = db.Column(db.Integer, primary_key=True)

    # User authentication information (required for Flask-User)
    email = db.Column(db.Unicode(255), nullable=False, server_default=u'', unique=True)
    confirmed_at = db.Column(db.DateTime())
    password = db.Column(db.String(255), nullable=False, server_default='')

    # User information
    confirmed = db.Column(db.Boolean, nullable=False, default=False)
    active = db.Column('is_active', db.Boolean(), nullable=False, server_default='0')
    username = db.Column(db.String(64), index=True)

    # List of the browser config affiliated to the user
    browse_configs = db.relationship('BrowseConfig', backref='users', lazy=True)

    # Roles of the user
    roles = db.relationship('Role', secondary='user_roles',
                            backref=db.backref('users', lazy='dynamic'))

    def __init__(self, email, password, username, active, confirmed):
        self.username = username
        self.email = email
        self.active = active
        self.confirmed = confirmed
        self.set_password(password)

    def is_active(self):
        return self.active

    def set_password(self, password):
        self.password = generate_password_hash(password)

    def verify_password(self, password):
        return check_password_hash(self.password, password)


# Define the UserRoles DataModel
class UserRoles(db.Model):
    __tablename__ = 'user_roles'
    id = db.Column(db.Integer(), primary_key=True)
    role_id = db.Column(db.Integer(), db.ForeignKey('roles.id', ondelete='CASCADE'))
    user_id = db.Column(db.Integer(), db.ForeignKey('users.id', ondelete='CASCADE'))

    UniqueConstraint('role_id', 'user_id', name='role_only_once')
