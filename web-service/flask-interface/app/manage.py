from flask_migrate import Migrate, MigrateCommand
from flask_script import Manager, Shell, Server
from flask import current_app
from app.app import app, db
from app.models.user_model import User
from app.models.browse_config_model import BrowseConfig
from app.create_roles import admin

app.config.from_object('config')

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
        email="marinbrunel1@gmail.com",
        active=True,
        password='123456')
    user.roles.append(admin)
    db.session.add(user)
    db.session.commit()
    config = BrowseConfig(
        name="config-test",
        address='ws://172.0.0.3:8888',
        user_id=user.id
    )
    db.session.add(config)
    db.session.commit()


def entry():
    manager.run()
