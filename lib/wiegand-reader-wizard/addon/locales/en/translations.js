export default {
    'buzzer': 'Buzzer',
    'cancel': 'Cancel',
    'configuration': 'Configuration',
    'confirmation': 'Confirmation',
    'confirm': 'Confirm',
    'delete': 'Delete',
    'direction': 'Direction',
    'enable': 'Enable',
    'false': 'Off',
    'gpio': 'GPIO type',
    'gpio_high': 'GPIO High',
    'gpio_low': 'GPIO Low',
    'hardware_address': 'Hardware address',
    'in': 'In',
    'led': 'LED',
    'mode': 'Mode',
    'name': 'Name',
    'number_high': 'Number GPIO High',
    'number_low': 'Number GPIO Low',
    'number_led': 'Number GPIO LED',
    'number_buzzer': 'Number Gpio Buzzer',
    'out': 'Out',
    'piface-digital-gpio': 'Piface Digital GPIO',
    'submit': 'Submit',
    'true': 'On',
    'type_address': 'Hardware address (0-3)',
    'type_mode': 'Select one mode',
    'value': 'Default value',
    'finish': '<p>' +
    'Wiegand Reader successfully configured!' +
    '</p>' +
    '<p>' +
    'The server already restarted, so that the reader can be used.' +
    '</p>' +
    '<p>' +
    'Wait for the application to reconnect.' +
    '</p>',

    'wiegand-mode': {
        'simple': 'Simple mode',
        'pin_4': 'Pin 4 bits mode ',
        'pin_8': 'Pin 8 bits mode',
        'pin_buffered': 'Pin buffered mode',
        'card_4': 'CardPin 4 bits mode',
        'card_8': 'CardPin 8 bits mode',
        'card_buffered': 'CardPin buffered mode',
        'autodetect': 'Autodetect mode',
    },

    'wiegand-reader-wizard': {
        'create': {
            'title': 'Create New Wiegand Reader Config'
        },
        'list': {
            'title': 'Wiegand Reader Config list'
        },
        'creates': 'Create config',
        'delete_confirm': 'Are you sure you wish to delete this config ?',
        'create_config': 'Add config',
        'config_info': 'Config information',
        'title': 'Wiegand Reader Wizard',
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
        'name': ": the name of the Wiegand Reader\, and the prefix of all the device related to the Wiegand Reader. You are free to choose the name,but an explicit name is always preferable than a unexplicit name.",
        'name_example': 'For example: if the Wiegand Reader is connected to the garage door, an explicit name could be: <b>GARAGE-DOOR-READER</b>.',
        'gpio': ': the type of GPIO on which the Wiegand Reader will be pluged. By default, if you are using a Piface, choose <b>Piface Digital GPIO</b>.',
        'hardware_address': ': 0 by default.????????????????????',
        'led': ': toggle if you want to configure a LED. Be sure that your Wiegand Reader got one.',
        'buzzer': ': toggle if you want to configure a Buzzer. Be sure that your Wiegand Reader got one.',
        'gpio_high': ': This is where the Wiegand Reader high wire will be plugged on the piface',
        'gpio_low': ': This is where the Wiegand Reader low wire will be plugged on the piface',
        'gpio_led': ': This is where the Wiegand Reader LED wire will be plugged on the piface',
        'gpio_buzzer': ': This is where the Wiegand Reader Buzzer wire will be plugged on the piface'
    },

    errors: {
        description: "This field",
        inclusion: "{{description}} is not included in the list",
        exclusion: "{{description}} is reserved",
        invalid: "{{description}} is invalid",
        confirmation: "{{description}} doesn't match {{on}}",
        accepted: "{{description}} must be accepted",
        empty: "{{description}} can't be empty",
        blank: "{{description}} can't be blank",
        present: "{{description}} must be blank",
        collection: "{{description}} must be a collection",
        singular: "{{description}} can't be a collection",
        tooLong: "{{description}} is too long (maximum is {{max}} characters)",
        tooShort: "{{description}} is too short (minimum is {{min}} characters)",
        before: "{{description}} must be before {{before}}",
        after: "{{description}} must be after {{after}}",
        wrongDateFormat: "{{description}} must be in the format of {{format}}",
        wrongLength: "{{description}} is the wrong length (should be {{is}} characters)",
        notANumber: "{{description}} must be a number",
        notAnInteger: "{{description}} must be an integer",
        greaterThan: "{{description}} must be greater than {{gt}}",
        greaterThanOrEqualTo: "{{description}} must be greater than or equal to {{gte}}",
        equalTo: "{{description}} must be equal to {{is}}",
        lessThan: "{{description}} must be less than {{lt}}",
        lessThanOrEqualTo: "{{description}} must be less than or equal to {{lte}}",
        otherThan: "{{description}} must be other than {{value}}",
        odd: "{{description}} must be odd",
        even: "{{description}} must be even",
        positive: "{{description}} must be positive",
        date: "{{description}} must be a valid date",
        onOrAfter: '{{description}} must be on or after {{onOrAfter}}',
        onOrBefore: '{{description} must be on or before {{onOrBefore}}',
        email: "{{description}} must be a valid email address",
        phone: "{{description}} must be a valid phone number",
        url: "{{description}} must be a valid url"
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
