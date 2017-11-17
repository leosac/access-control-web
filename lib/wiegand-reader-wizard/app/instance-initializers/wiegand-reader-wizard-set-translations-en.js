export function initialize(app) {
    let myService = app.lookup('service:i18n');
    myService.addTranslations('en', {
        /**
         * All my english translation related to this engine will go here!
         */
        'gpio_type': 'GPIO type',
        'gpio_high': 'GPIO High',
        'gpio_low': 'GPIO Low',
        'number_high': 'Number GPIO High',
        'number_low': 'Number GPIO Low',
        'number_led': 'Number GPIO LED',
        'number_buzzer': 'Number Gpio Buzzer',
        'piface-digital-gpio': 'Piface Digital GPIO',

        'finish': '<p>' +
        'Wiegand Reader successfully configured!' +
        '</p>' +
        '<p>' +
        'The server already restarted, so that the reader can be used.' +
        '</p>' +
        '<p>' +
        'Wait for the application to reconnect.' +
        '</p>',

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
        },

        'information': {
            'wizard_name': ": the name of the Wiegand Reader\, and the prefix of all the device related to the Wiegand Reader. You are free to choose the name,but an explicit name is always preferable than a unexplicit name.",
            'wizard_name_example': 'For example: if the Wiegand Reader is connected to the garage door, an explicit name could be: <b>GARAGE-DOOR-READER</b>.',
            'wizard_gpio': ': the type of GPIO on which the Wiegand Reader will be pluged. By default, if you are using a Piface, choose <b>Piface Digital GPIO</b>.',
            'wizard_hardware_address': ': 0 by default.????????????????????',
            'wizard_led': ': toggle if you want to configure a LED. Be sure that your Wiegand Reader got one.',
            'wizard_buzzer': ': toggle if you want to configure a Buzzer. Be sure that your Wiegand Reader got one.',
            'wizard_gpio_high': ': This is where the Wiegand Reader high wire will be plugged on the piface',
            'wizard_gpio_low': ': This is where the Wiegand Reader low wire will be plugged on the piface',
            'wizard_gpio_led': ': This is where the Wiegand Reader LED wire will be plugged on the piface',
            'wizard_gpio_buzzer': ': This is where the Wiegand Reader Buzzer wire will be plugged on the piface'
        }
    });
}

export default { initialize };
