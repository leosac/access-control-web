export function initialize(app) {
    const intl = app.lookup('service:intl');
    intl.addTranslations('en', {
        'smtp': {
            'title': 'SMTP module page.',
            'notes': 'Note: SMTP password are saved in cleartext !',
            'recipient': 'Recipient',
            'subject': 'Subject',
            'body': 'Body',
            'send': 'Send test mail',
            'from': 'Sender',
            'timeout': 'Timeout (Milliseconds)',
            'server': 'Server',
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
    });
}

export default {
    name: 'translations-en',
    initialize
};
