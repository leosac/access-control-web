export function initialize(app) {
    let myService = app.lookup('service:intl');
    myService.addTranslations('fr', {
        'false': 'Éteint',
        'hardware_address': 'Adresse matériel',
        'device': 'Appareil',
        'gpio_number': 'Numéro du GPIO',
        'interrupt_mode': 'Mode d\'interruption',
        'offset': 'Offset',
        'in': 'Entrée',
        'out': 'Sortie',
        'none': 'Aucun',
        'rising': 'Montée',
        'falling': 'Descente',
        'both': 'Les deux',
        'true': 'Allumé',
        'type_address': 'Adresse matériel (0-3)',
        'type_direction': 'Direction (peut-être in ou out)',
        'type_interrupt_mode': 'Mode d\'interruption (peut être none, rising, falling, both)',
        'type_value': 'Valeur par défaut (est activée seulement quand la direction est out)',

        'libgpiod-gpios': {
            'create': {
                'title': 'Créer une nouvelle configuration Libgpiod GPIO'
            },
            'list': {
                'title': 'Liste des configurations Libgpiod GPIO'
            },
            'creates': 'Créer la configuration',
            'delete_confirm': 'Êtes-vous sûr de vouloir supprimer cette configuration ?',
            'create_config': 'Ajouter une configuration',
            'config_info': 'Information sur la configuration',
            'title': 'Configuration Libgpiod GPIO',
        },

        'libgpiod_gpio_information': {
            'device': 'L\'apppareil GPIO',
            'gpio_name': 'Nom de la GPIO',
            'interrupt_mode': 'Mode d\'interruption',
            'number': 'Numéro de la prise GPIO',
            'direction': 'Direction du PIN',
            'value': 'Allumé par défaut',
            'offset': 'Offset du GPIO',
        }
    });
}

export default {
    name: 'translations-fr',
    initialize
};
