export function initialize(app) {
    let myService = app.lookup('service:intl');
    myService.addTranslations('en', {
        /**
         * All my english translation related to this engine will go here!
         */
        'blink_duration': 'Duration',
        'blink_speed': 'Speed',

        'led-buzzer': {
            'list': {
                'title': 'LED and Buzzer Config list'
            },
            'delete_confirm': 'Are you sure you wish to delete this config ?',
        },

        'buzzers': {
            'title': 'Buzzer config page',
            'create': 'Create Buzzer config'
        },
        'leds': {
            'title': 'LED config page',
            'create': 'Create LED config'
        },
        'led_buzzer_information': {
            'duration': 'Duration of the blink in milliseconds',
            'gpio': 'GPIO on which this device is plugged',
            'speed': 'Time between blink in milliseconds',
        },
    });
}

export default { initialize };
