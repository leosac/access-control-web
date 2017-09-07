export default {
    'configuration': 'Configuration',
    'email': 'Email',
    'enabled': 'Enabled',
    'password': 'Password',
    'url': 'Url',
    'username_': "Username:",
    'username': "Username",

    'error': {
        'title': 'Oh no, something went wrong.',
        'statuscode': 'Status Code:',
        'message': 'Message:',
        'requestid': 'Request Identifier:',
        'entity_not_found': 'Entity not found.',
        'entity_not_found_descr': "The requested entity couldn't be found by the server.",
        'entity_id': 'Entity identifier:',
        'entity_type': 'Entity type:',
        'permission_denied': 'Permission denied.',
        'permission_denied_descr': "The request you made has been denied for permission reason. <br>If you believe this is incorrect, please contact your administrator and provide them with this request identifier: {{reqid}}<br>If you are the administrator, you'll have to resort to the log for possible details.",
        'request_timeout': 'Request timeout.',
        'request_timeout_descr': "The request didn't received a reply in a reasonable time, and has now timed out. This error <i>may</i> indicates problems with your internet connection.",
        'session_aborted': 'Session aborted.',
        'session_aborted_descr': "You should be redirected to the login page in 5 seconds. If that's not the case, please click",
        'unknown_error': 'Unknown error.',
        'unknown_error_descr': "Sorry, we don't know what happened.",
    },

    'smtp': {
        'title': 'SMTP module page.',
        'notes': 'Note: SMTP password are saved in cleartext !',
        'recipient': 'Recipient',
        'subject': 'Subject',
        'body': 'Body',
        'send': 'Send test mail',
        'from': 'From',
        'timeout': 'Timeout (Milliseconds)',
        'add_server:': 'Add Server',
        'remove_server': 'Remove Server',
        'verify_host': 'Verify Host',
        'verify_peer': 'Verify Peer',
        'save': 'Save Config',
        'add_server': 'Add server',
        'error': {
            'save_success': 'Configuration saved.',
            'save_error': 'Error while saving configuration.',
            'send_success': 'Mail has been sent.',
            'send_error': 'Error while sending mail.'
        }
    }
};
