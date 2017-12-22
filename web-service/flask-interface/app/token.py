from itsdangerous import URLSafeTimedSerializer
import os
import binascii
import crypt

secret_key = "3f1b62ce6ef907745f52c56b9393f28ccafbf759b7dfecc9"
salt = '$6$8sJWE4ficeNbR37f'


def generate_confirmation_token(email):
    serializer = URLSafeTimedSerializer(secret_key)
    return serializer.dumps(email, salt=salt)


def confirm_token(token, expiration=3000):
    serializer = URLSafeTimedSerializer(secret_key)
    try:
        email = serializer.loads(
            token,
            salt=salt,
            max_age=expiration
        )
    except:
        return False
    return email
