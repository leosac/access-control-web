export function initialize(app) {
    let myService = app.lookup('service:i18n');
    myService.addTranslations('en', {
        /**
         * All my english translation related to this engine will go here!
         */
        'false': 'Off',
        'hardware_address': 'Hardware address',
        'in': 'In',
        'gpio_number': 'GPIO number',
        'out': 'Out',
        'test': 'Test GPIO',
        'true': 'On',
        'type_address': 'Hardware address (0-3)',
        'type_direction': 'Direction (can be in or out)',
        'type_value': 'Value (Is only activated when the direction is out)',

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
        },

        'information': {
            'address': 'The GPIO address on the Piface',
            'enable': 'Activate this device',
            'gpio_name': 'Name of the GPIO.',
            'number': 'The GPIO number of the Piface. Range from 0 to 7.',
            'direction': 'Direction of the PIN',
            'value': 'On by default',
            'test': 'This will make the reader blink several time'
        }
    });
}

export default { initialize };
