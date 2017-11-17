export function initialize(app) {
    let myService = app.lookup('service:i18n');
    myService.addTranslations('fr', {
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
        'information': {
            'duration': 'Durée du clignotement en millisecondes',
            'gpio': 'GPIO sur laquelle le matériel est branché',
            'speed': 'Délai entre les clignotements en millisecondes',
        }
    });
}

export default {initialize};
