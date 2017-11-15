export default {
    'cancel': 'Cancel',
    'configuration': 'Configuration',
    'confirmation': 'Confirmation',
    'confirm': 'Confirm',
    'delete': 'Delete',
    'direction': 'Direction',
    'enable': 'Enable',
    'false': 'Off',
    'hardware_address': 'Hardware address',
    'in': 'In',
    'name': 'Name',
    'number': 'GPIO number',
    'out': 'Out',
    'submit': 'Submit',
    'test': 'Test GPIO',
    'true': 'On',
    'type_address': 'Hardware address (0-3)',
    'type_direction': 'Direction (can be in or out)',
    'type_value': 'Value (Is only activated when the direction is out)',
    'value': 'Default value',

    'piface-digital-gpio': {
        'create': {
            'title': 'Create New Piface Digital GPIO Config'
        },
        'list': {
            'title': 'Piface Digital GPIO Config list'
        },
        'creates': 'Create config',
        'delete_confirm': 'Are you sure you wish to delete this config ?',
        'create_config': 'Add config',
        'config_info': 'Config information',
        'title': 'Piface Digital GPIO Config',
        'error' : {
            'update_success' : 'Config correctly updated.',
            'create_success' : 'Config correctly created.',
            'remove_success' : 'Config correctly removed.',
            'update_error' : 'An error occured while updating the config.',
            'create_error' : 'An error occured while creating the config.',
            'remove_error' : 'An error occured while removing the config.'
        }
    },

    'information': {
        'address': 'The GPIO address on the Piface',
        'enable': 'Activate this device',
        'name': 'Name of the GPIO.',
        'number': 'The GPIO number of the Piface. Range from 0 to 7.',
        'direction': 'Direction of the PIN',
        'value': 'On by default',
        'test': 'This will make the reader blink several time'
    },

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
    }
};
