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
        'gpio_high': 'GPIO Haute',
        'gpio_low': 'GPIO Basse',
        'hardware_address': 'Adresse matériel',
        'in': 'Entrée',
        'led': 'LED',
        'mode': 'Mode',
        'name': 'Nom',
        'out': 'Sortie',
        'submit': 'Envoyer',
        'true': 'Allumé',
        'type_address': 'Adresse matériel (0-3)',
        'type_mode': 'Sélectionner un mode',
        'value': 'Valeur par défaut',

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

        'wiegand-reader': {
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
            'title': 'Configuration Wiegand Reader',
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
            'buzzer': 'Buzzer affilié au Wiegand Reader',
            'led':  'LED affiliée au Wiegand Reader',
            'enable': 'Activer cet appareil',
            'mode': 'Mode de fonctionnement du Wiegand Reader',
            'name': 'Nom de la configuration',
            'gpio_high': 'GPIO pour 1 (ou Vrai)',
            'gpio_low': 'GPIO pour 0 (ou Faux)'
        }
    });
}

export default { initialize };
