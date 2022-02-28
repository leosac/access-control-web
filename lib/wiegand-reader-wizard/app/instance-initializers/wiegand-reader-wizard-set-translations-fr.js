export function initialize(app) {
    let myService = app.lookup('service:intl');
    myService.addTranslations('fr', {
        /**
         * All my french translation related to this engine will go here!
         */
        'gpio_type': 'Type de GPIO',
        'gpio_high': 'GPIO High',
        'gpio_low': 'GPIO Low',
        'number_high': 'Numéro de la GPIO High',
        'number_low': 'Numéro de la GPIO Low',
        'number_led': 'Numéro de la GPIO pour la LED',
        'number_buzzer': 'Numéro de la GPIO pour le Buzzer',
        'piface-digital-gpio': 'Piface Digital GPIO',

        'finish': '<p>' +
        'Lecteur Wieagand correctement configuré!' +
        '</p>' +
        '<p>Le serveur a déjà redémarré' +
        '' +
        '</p>' +
        '<p>' +
        'Attendez que l\'application se reconnecte.' +
        '</p>',

        'wiegand-reader-wizard': {
            'create': {
                'title': 'Créer une nouvelle configuration Wiegand Reader'
            },
            'list': {
                'title': 'Liste des configurations Wiegand Reader'
            },
            'creates': 'Créer la configuration',
            'delete_confirm': 'Êtes-vous sûr de vouloir supprimer cette configuration ?',
            'create_config': 'Ajouter une configuration',
            'config_info': 'Information sur la configuration',
            'title': 'Assistant d\'installation lecteur Wiegand ',
        },

        'wiegand_wizard_information': {
            'wizard_name': ': le nom du lecteur Wiegand, ainsi que le préfixe de tout matériel relié au lecteur. Vous êtes libre de choisir le nom qu\'il vous plaît, mais un nom explicite est toujours mieux qu\'un nom vague',
            'wizard_name_example': 'Par exemple: si le lecteur contrôle l\'accés de la porte du garage, un nom explicite pourrait être: <b>LECTEUR-PORTE-GARAGE</b>.',
            'wizard_gpio': ': le type de GPIO sur lequel le lecteur sera branché. Par défaut, si vous utilisez une Piface, choisissez <b>Piface Digital GPIO</b>.',
            'wizard_hardware_address': ': 0 par défaut.',
            'wizard_led': ': activer si vous voulez configurer une LED. Soyez sure que votre lecteur en ait une LED.',
            'wizard_buzzer': ': activer si vous voulez configurer un Buzzer. Soyez sure que votre lecteur en ait un Buzzer.',
            'wizard_gpio_high': ': c\'est le numéro de GPIO High',
            'wizard_gpio_low': ': c\'est le numéro de GPIO Low',
            'wizard_gpio_led': ': c\'est le numéro de GPIO pour la LED',
            'wizard_gpio_buzzer': ': c\'est le numéro de GPIO pour le Buzzer',
        }
    });
}

export default {initialize};
