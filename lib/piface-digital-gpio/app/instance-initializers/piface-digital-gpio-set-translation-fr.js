export function initialize(app) {
    let myService = app.lookup('service:i18n');
    myService.addTranslations('fr', {
        /**
         * All my french translation related to this engine will go here!
         */
        'false': 'Éteint',
        'hardware_address': 'Adresse matériel',
        'in': 'Entrée',
        'gpio_number': 'Numéro du GPIO',
        'out': 'Sortie',
        'test': 'Test GPIO',
        'true': 'Allumé',
        'type_address': 'Adresse matériel (0-3)',
        'type_direction': 'Direction (peut-être in ou out)',
        'type_value': 'Valeur par défaut (est activée seulement quand la direction est out)',

        'piface-digital-gpio': {
            'create': {
                'title': 'Créer une nouvelle configuration Piface Digital GPIO'
            },
            'list': {
                'title': 'Liste des configurations Piface Digital GPIO'
            },
            'creates': 'Créer la configuration',
            'delete_confirm': 'Êtes-vous sûr de vouloir supprimer cette configuration ?',
            'create_config': 'Ajouter une configuration',
            'config_info': 'Information sur la configuration',
            'title': 'Configuration Piface Digital GPIO',
        },

        'information': {
            'address': 'L\'adresse de la GPIO sur la Piface',
            'enable': 'Activer cet appareil',
            'gpio_name': 'Nom de la GPIO',
            'number': 'Numéro de la prise GPIO sur le Piface, de 0 à 7',
            'direction': 'Direction du PIN',
            'value': 'Allumé par défaut',
            'test': 'Cela va faire clignoter le lecteur plusieurs fois'
        }
    });
}

export default { initialize };
