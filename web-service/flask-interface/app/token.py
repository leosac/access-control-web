from itsdangerous import URLSafeTimedSerializer
import os
import binascii
import crypt

secret_key = binascii.hexlify(os.urandom(24))
salt = crypt.mksalt(crypt.METHOD_SHA512)


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
