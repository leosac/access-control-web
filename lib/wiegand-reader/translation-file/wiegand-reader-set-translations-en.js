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
        'gpio_high': 'GPIO High',
        'gpio_low': 'GPIO Low',
        'hardware_address': 'Hardware address',
        'in': 'In',
        'led': 'LED',
        'mode': 'Mode',
        'name': 'Name',
        'out': 'Out',
        'submit': 'Submit',
        'true': 'On',
        'type_address': 'Hardware address (0-3)',
        'type_mode': 'Select one mode',
        'value': 'Default value',

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

        'wiegand-reader': {
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
            'title': 'Wiegand Reader Config',
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
            'buzzer': 'Buzzer affiliated to the Wiegand reader',
            'led': 'Green LED affiliated to the Wiegand reader',
            'mode': 'Operation mode of the Wiegand reader',
            'enable': 'Activate this device',
            'name': 'Name of the Wiegand reader.',
            'gpio_high': 'GPIO for 1 (or True)',
            'gpio_low': 'GPIO for 0 (or False)'
        }
    });
}

export default { initialize };
