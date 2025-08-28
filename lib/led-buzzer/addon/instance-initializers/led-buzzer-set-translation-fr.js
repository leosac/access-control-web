export function initialize(app) {
    const intl = app.lookup('service:intl');
    intl.addTranslations('fr', {
        /**
         * All my french translation related to this engine will go here!
         */
        'blink_duration': 'Durée du clignotement',
        'blink_speed': 'Vitesse du clignotement',

        'led-buzzer': {
            'list': {
                'title': 'Liste des configurations des LED et buzzers'
            }
        },
        'buzzers': {
            'title': 'Page de la configuration du buzzer',
            'create': 'Créer la configuration Buzzer'
        },
        'leds': {
            'title': 'Page de la configuration de la LED',
            'create': 'Créer la configuration LED'
        },
        'led_buzzer_information': {
            'duration': 'Durée du clignotement en millisecondes',
            'gpio': 'GPIO sur laquelle le matériel est branché',
            'speed': 'Délai entre les clignotements en millisecondes',
        }
    });
}

export default {
    name: 'translation-fr',
    initialize
};
