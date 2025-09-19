export function initialize(app) {
    const intl = app.lookup('service:intl');
    intl.addTranslations('en', {
        'false': 'Off',
        'hardware_address': 'Hardware address',
        'device': 'Device',
        'gpio_number': 'GPIO number',
        'interrupt_mode': 'Interrupt mode',
        'offset': 'Offset',
        'in': 'In',
        'out': 'Out',
        'none': 'None',
        'rising': 'Rising',
        'falling': 'Falling',
        'both': 'Both',
        'true': 'On',
        'type_address': 'Hardware address (0-3)',
        'type_direction': 'Direction (can be in or out)',
        'type_interrupt_mode': 'Interrupt mode (can be none, rising, falling, both)',
        'type_value': 'Value (Is only activated when the direction is out)',

        'libgpiod-gpios': {
            'create': {
                'title': 'Create New Libgpiod GPIO Config'
            },
            'list': {
                'title': 'Libgpiod GPIO Config list'
            },
            'creates': 'Create config',
            'delete_confirm': 'Are you sure you wish to delete this config ?',
            'create_config': 'Add config',
            'config_info': 'Config information',
            'title': 'Libgpiod GPIO Config',
        },

        'libgpiod_gpio_information': {
            'device': 'The GPIO device',
            'address': 'The GPIO address',
            'gpio_name': 'Name of the GPIO.',
            'interrupt_mode': 'Interrupt mode',
            'number': 'The GPIO number. Range from 0 to 7.',
            'direction': 'Direction of the PIN',
            'value': 'On by default',
            'offset': 'Offset of the GPIO',
        }
    });
}

export default {
    name: 'translations-en',
    initialize
};

