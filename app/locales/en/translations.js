export default {
    'firstname': 'Firstname',
    'lastname': 'Lastname',
    'email': 'email',
    'username': "Username",
    'form': {
        // General form stuff with label and placeholder.
        'username': {
            'label': 'Username',
            'ph': 'John'
        },
        'password': {
            'label': 'Password',
            'ph': 'Your password'
        }
    },
    'login-form': {
        'welcome': 'Please sign in',
        'submit': 'Sign in',
        'username_password_required': "Username and password are required."
    },
    'loading': {
        // loading.hbs
        'title': 'Please wait',
        'message': "The page is being loaded in the background. " +
        "It shouldn't take too long. <br>" +
        "If the page doesn't load in a few seconds, try refreshing it."
    },
    'index': {
        'title': 'Dashboard',
        'manage_access': 'Manage Access',
        'apply_update': 'Apply Update',
        'event': 'Events',
        'welcome': "Welcome <strong>{{username}}</strong>.<br />" +
        "Manage your EvoXS cylinders and user permissions.<br />" +
        "Register, setup, deploy. All from a web-based interface.<br />"
    },
    'users': {
        'list':{
            'title': 'Liste des utilisateurs'
        },
        'create_new_user': 'Create new user',
    }
};
