export function initialize(app) {
    const intl = app.lookup('service:intl');
    intl.addTranslations('en', {
        /**
         * All my english translation related to this engine will go here!
         */
        'gpio_high': 'GPIO High',
        'gpio_low': 'GPIO Low',
        'hardware_address': 'Hardware address',
        'mode': 'Mode',
        'type_mode': 'Select one mode',

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
        },

        'wiegand_information': {
            'buzzer': 'Buzzer affiliated to the Wiegand reader',
            'led': 'Green LED affiliated to the Wiegand reader',
            'mode': 'Operation mode of the Wiegand reader',
            'wiegand_name': 'Name of the Wiegand reader.',
            'gpio_high': 'GPIO for 1 (or True)',
            'gpio_low': 'GPIO for 0 (or False)'
        }
    });
}

export default {
    name: 'translation-en',
    initialize
};
