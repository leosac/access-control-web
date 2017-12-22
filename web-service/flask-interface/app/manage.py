from flask_migrate import Migrate, MigrateCommand
from flask_script import Manager, Shell, Server
from flask import current_app
from app.app import app, db
from app.fetch_role import fetch_admin_role, fetch_user_role
from app.models.user_model import User, Role
from app.models.browse_config_model import BrowseConfig

app.config.from_pyfile('config.py')

migrate = Migrate(app, db)
manager = Manager(app)
manager.add_command('db', MigrateCommand)

if __name__ == '__main__':
    manager.run()

# runs Flask development server locally at port 5000
manager.add_command("runserver", Server(host="0.0.0.0", port=5000))


# start a Python shell with contexts of the Flask application
@manager.shell
def make_shell_context():
    return dict(app=current_app, db=db, models=User)


# init/reset database
@manager.command
def initdb():
    db.drop_all(bind=None)
    db.create_all(bind=None)

    # add sample user
    user = User(
        username="user",
        email="marin.brunel@epitech.eu",
        active=True,
        password='123456',
        confirmed=True)
    user_role = Role(name='user')
    db.session.add(user_role)
    admin_role = Role(name='admin')
    db.session.add(admin_role)
    user.roles.append(fetch_admin_role())
    user.roles.append(fetch_user_role())
    db.session.add(user)
    db.session.commit()
    config = BrowseConfig(
        name="config-test",
        address='ws://172.0.0.3:8888',
        user_id=user.id
    )
    db.session.add(config)
    db.session.commit()


@manager.command
def run():
    app.run()


def entry():
    manager.run()
