export function initialize(app) {
    let myService = app.lookup('service:i18n');
    myService.addTranslations('fr', {
        /**
         * All my french translation related to this engine will go here!
         */
        'gpio_high': 'GPIO High',
        'gpio_low': 'GPIO Low',
        'hardware_address': 'Adresse matériel',
        'mode': 'Mode',
        'type_mode': 'Sélectionner un mode',

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
        },

        'wiegand_information': {
            'buzzer': 'Buzzer affilié au Wiegand Reader',
            'led':  'LED affiliée au Wiegand Reader',
            'mode': 'Mode de fonctionnement du Wiegand Reader',
            'wiegand_name': 'Nom de la configuration',
            'gpio_high': 'GPIO pour 1 (ou Vrai)',
            'gpio_low': 'GPIO pour 0 (ou Faux)'
        }
    });
}

export default { initialize };
