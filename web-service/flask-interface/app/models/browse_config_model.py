from app.create_db import db


class BrowseConfig(db.Model):
    __tablename__ = 'browse_config'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(128), index=True)
    address = db.Column(db.String(128))
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
