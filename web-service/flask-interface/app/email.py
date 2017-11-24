from flask_mail import Message


def send_email(to, subject, template):
    from app.app import app, mail
    msg = Message(
        subject,
        recipients=[to],
        html=template,
        sender=app.config['MAIL_DEFAULT_SENDER']
    )
    mail.send(msg)
