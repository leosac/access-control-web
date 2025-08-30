export function initialize(app) {
    const intl = app.lookup('service:intl');
    intl.addTranslations('fr', {
        'smtp': {
            'title': 'SMTP',
            'notes': 'Note : le mot de passe SMTP est stocké en clair !',
            'recipient': 'Destinataire',
            'subject': 'Sujet',
            'body': 'Contenu',
            'send': 'Envoyer un mail de test',
            'from': 'Expéditeur',
            'timeout': 'Timeout (Milliseconds)',
            'server': 'Serveur',
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
    });
}

export default {
    name: 'translations-fr',
    initialize
};
