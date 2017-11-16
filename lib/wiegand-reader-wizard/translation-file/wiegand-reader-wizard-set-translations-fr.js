export function initialize(app) {
    let myService = app.lookup('service:i18n');
    myService.addTranslations('fr', {
        /**
         * All my french translation related to this engine will go here!
         */
        'buzzer': 'Buzzer',
        'cancel': 'Annuler',
        'configuration': 'Configuration',
        'confirmation': 'Confirmation',
        'confirm': 'Confirmer',
        'delete': 'Supprimer',
        'direction': 'Direction',
        'enable': 'Activer',
        'false': 'Éteint',
        'gpio': 'Type de GPIO',
        'gpio_high': 'GPIO High',
        'gpio_low': 'GPIO Low',
        'hardware_address': 'Adresse matériel',
        'in': 'Entrée',
        'led': 'LED',
        'mode': 'Mode',
        'name': 'Nom',
        'number_high': 'Numéro de la GPIO High',
        'number_low': 'Numéro de la GPIO Low',
        'number_led': 'Numéro de la GPIO pour la LED',
        'number_buzzer': 'Numéro de la GPIO pour le Buzzer',
        'out': 'Sortie',
        'piface-digital-gpio': 'Piface Digital GPIO',
        'submit': 'Envoyer',
        'true': 'Allumé',
        'type_address': 'Adresse matériel (0-3)',
        'type_mode': 'Sélectionner un mode',
        'value': 'Valeur par défaut',
        'finish': '<p>' +
        'Lecteur Wieagand correctement configuré!' +
        '</p>' +
        '<p>Le serveur a déjà redémarré' +
        '' +
        '</p>' +
        '<p>' +
        'Attendez que l\'application se reconnecte.' +
        '</p>',

        'wiegand-mode': {
            'simple': 'Mode simple',
            'pin_4': 'Mode Pin à 4 bits',
            'pin_8': 'Mode Pin à 8 bits ',
            'pin_buffered': 'Mode Pin mise en mémoire tampon',
            'card_4': 'Mode CardPin à 4 bits',
            'card_8': 'Mode CardPin à 8 bits',
            'card_buffered': 'Mode CardPin mise en mémoire tampon',
            'autodetect': 'Autodetect mode',
        },

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
            'error' : {
                'update_success' : 'Configuration correctement mise à jour.',
                'create_success' : 'Configuration correctement crée.',
                'remove_success' : 'Configuration correctement supprimée.',
                'update_error' : 'Une erreur est survenue lors de la mise à jour de la configuration.',
                'create_error' : 'Une erreur est survenue lors de la création de la configuration.',
                'remove_error' : 'Une erreur est survenue lors de la suppression de la configuration.'
            }
        },

        'information': {
            'name': ': le nom du lecteur Wiegand, ainsi que le préfixe de tout matériel relié au lecteur. Vous êtes libre de choisir le nom qu\'il vous plaît, mais un nom explicite est toujours mieux qu\'un nom vague',
            'name_example': 'Par exemple: si le lecteur contrôle l\'accés de la porte du garage, un nom explicite pourrait être: <b>LECTEUR-PORTE-GARAGE</b>.',
            'gpio': ': le type de GPIO sur lequel le lecteur sera branché. Par défaut, si vous utilisez une Piface, choisissez <b>Piface Digital GPIO</b>.',
            'hardware_address': ': 0 par défaut.',
            'led': ': activer si vous voulez configurer une LED. Soyez sure que votre lecteur en ait une LED.',
            'buzzer': ': activer si vous voulez configurer un Buzzer. Soyez sure que votre lecteur en ait un Buzzer.',
            'gpio_high': ': c\'est le numéro de GPIO High',
            'gpio_low': ': c\'est le numéro de GPIO Low',
            'gpio_led': ': c\'est le numéro de GPIO pour la LED',
            'gpio_buzzer': ': c\'est le numéro de GPIO pour le Buzzer',
        }
    });
}


export default {initialize};
