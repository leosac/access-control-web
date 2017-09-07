export default {
    'configuration': 'Configuration',
    'email': 'Email',
    'enabled': 'Actif',
    'password': 'Mot de passe',
    'url': 'Url',
    'username_': "Nom d'utilisateur :",
    'username': "Nom d'utilisateur",

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
    },

    'smtp': {
        'title': 'SMTP',
        'notes': 'Note : le mot de passe SMTP est stocké en clair !',
        'recipient': 'Destinataire',
        'subject': 'Sujet',
        'body': 'Contenu',
        'send': 'Envoyer un mail de test',
        'from': 'Expéditeur',
        'timeout': 'Timeout (Milliseconds)',
        'add_server': 'Ajouter un serveur',
        'remove_server': 'Supprimer le serveur',
        'verify_host': "Vérifier l'hôte",
        'verify_peer': 'Vérifier le pair',
        'save': 'Enregistrer la configuration',
        'error' : {
            'save_success': 'La configuration a été sauvegardé.',
            'save_error': 'Une erreur est survenue durant la sauvegarde de la configuration.',
            'send_success' : 'Le mail a été envoyé.',
            'send_error': 'Erreur durant l\'envoie du mail'
        }
    }

};
