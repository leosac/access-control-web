export default {
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
    },

    'error': {
        'title': "Oh non, quelque chose s'est mal passé.",
        'statuscode': 'Status Code :',
        'message': 'Message :',
        'requestid': 'Identifiant de requête :',
        'entity_not_found': 'Entité non trouvée.',
        'entity_not_found_descr': "L'entité demandée n'a pas pu être trouvée par le serveur.",
        'entity_id': "Identifiant d'entité :",
        'entity_type': "Type d'entité :",
        'permission_denied': 'Permission refusée.',
        'permission_denied_descr': "La requète effectuée a été refusée pour des raisons de permission. <br>Si vous pensez que ceci est incorrecte, merci de contacter votre administrateur et de lui fournir cet identifiant de requète : {{reqid}}<br>Si vous êtes l'administrateur, vous devriez regarder les logs pour plus de détails.",
        'request_timeout': "Temps d'attente dépassé.",
        'request_timeout_descr': "La requète n'a pas recu de réponse dans un temps raisonable et a expiré. Cette erreur <i>peut</i> indiquer des problèmes avec votre connexion internet.",
        'session_aborted': 'Session annulée.',
        'session_aborted_descr': "Vous devriez être redirigé vers la page d'authentification dans 5 secondes. Si ceci n'est pas le cas, merci de cliquer",
        'unknown_error': 'Erreur inconnue.',
        'unknown_error_descr': "Désolé, nous ne savons pas ce qu'il s'est passé.",
    }
};
