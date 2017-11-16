export function initialize(app) {
    let myService = app.lookup('service:i18n');
    myService.addTranslations('en', {
        /**
         * All my english translation related to this engine will go here!
         */
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
        }
    });
}

export default { initialize };
