from flask_migrate import Migrate, MigrateCommand
from flask_script import Manager, Shell, Server
from flask import current_app
from app.app import app, db
from app.models.user_model import User
# from .user_model import User

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
        email="test@gmail.com",
        password='123456')
    db.session.add(user)
    db.session.commit()


def entry():
    manager.run()
