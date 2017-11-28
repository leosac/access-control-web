from app.models.user_model import Role


def fetch_user_role():
    """ Find user role"""
    role = Role.query.filter_by(name='user').first()
    return role


def fetch_admin_role():
    """ Find admin role"""
    role = Role.query.filter_by(name='admin').first()
    return role


