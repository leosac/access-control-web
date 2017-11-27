from app.models.user_model import Role


def fetch_user_role():
    """ Find user role"""
    role = Role.query.filter('user').first()
    return role


def fetch_admin_role():
    """ Find admin role"""
    role = Role.query.filter('admin').first()
    return role


