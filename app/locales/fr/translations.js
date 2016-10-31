export default {
    'firstname': 'Prénom',
    'lastname': 'Nom de famille',
    'email': 'Email',
    'username': "Nom d'utilisateur",
    'name': 'Nom',
    'description': 'Description',
    'edit': 'Editer',
    'delete': 'Supprimer',
    'remove': 'Supprimer',
    'rank': 'Rang',
    'password': 'Mot de passe',
    'leave': 'Quitter',
    'kick': 'Expulser',
    'enabled': 'Actif',
    'security': 'Securité',
    'validity': 'Validité',
    'members': 'Membres',
    'start_date': 'Date de début',
    'end_date': 'Date de fin',
    'access': 'Accès',
    'information': 'Information',
    'alias': 'Alias',
    'type': 'Type',
    'author': 'Auteur',
    'timestamp': 'Timestamp',
    'mask': 'Masque',
    'finalized': 'Finalisé',
    'details': 'Détails',
    'refresh': 'Actualiser',
    'current_page': 'Page actuelle',
    'page_size': 'Taille de la page',
    'total_page': 'Total des pages',
    'count': 'Nombre',
    'pending': 'En attente',
    'acknowledged': 'Acquittée',
    'cancelled': 'Annulé',
    'cancel': 'Annuler',
    'acknowledge': 'Acquitter',
    'update': 'Mettre a jour',
	'wait': 'Merci de patienter, récupération et préparation des données.',
	'owner_': 'Propriétaire :'
	'groups': 'Groupes',
	'schedules': 'Horaires',
	'submit': 'Envoyer',
	'save': 'Enregistrer',
	'mapping': 'Mapping',
	'timeframes': 'Zone de temps',
    'yes': 'Oui',
    'no': 'Non',
    'not_available': 'Indisponible',
    'access_point': "Point d'Accès",
    'clear_selection': 'Effacer la selection',

    'cancel_and_refresh': 'Annuler et rafraichir',
    'group_information': 'Information de groupe',
    'leave_group_confirmation': 'Etes vous sur de vouloir quitter ce groupe ?',
    'kick_group_confirmation': 'Etes vous sur de vouloir expulser cet utilisateur du groupe ?',
    'delete_group_confirmation': 'Etes vous sur de vouloir supprimer ce groupe ?',

    'table': {
        // Some translation for table header mostly.
        'join_date': "Date d'enregistrement",
        'group_name': 'Nom du groupe',
        'group_id': '#Id du groupe',
        'total_member': 'Nombre de membres',
    },
    'form': {
        'username': {
            'label': "Nom d'utilisateur",
            'ph': 'Thomas'
        },
        'password': {
            'label': 'Mot de passe',
            'ph': 'Votre mot de passe'
        }
    },
    'login-form': {
        'welcome': 'Veuillez vous connecter',
        'submit': 'Connexion',
        'username_password_required': "Le nom d'utilisateur et le mot de passe sont requis."
    },
    'password-change': {
        'current_pw': 'Mot de passe actuel',
        'new_pw': 'Nouveau mot de passe',
        'submit': 'Changer le mot de passe'
    },
    'loading': {
        // loading.hbs
        'title': 'Veuillez patienter',
        'message': "La page est en cours de chargement. " +
        "Cela ne devrait prendre qu'un instant. <br>" +
        "Si ce n'est pas le cas, rechargez la page."
    },
    'index': {
        'title': 'Index',
        'manage_access': 'Gerer les access',
        'apply_update': 'Appliquer les mises a jour',
        'event': 'Evenements',
        'welcome': "Bienvenue <strong>{{username}}</strong> <br>" +
        "Gerez vos cylindres EvoXS et les permissions utilisateurs. <br>" +
        "Installez, configurez et deployez depuis l'interface web."
    },
    'profile': {
        'title': 'Profile Utilisateur',
        'profile_updated': 'Le profile a été mis a jour',
        'fail_update': 'Erreur de mise a jour du profile'
    },
    'users': {
        'list': {
            'title': 'Liste des utilisateurs'
        },
        'create_new_user': 'Ajouter un utilisateur',
    },
    'door': {
        'delete_confirm': 'Êtes-vous sûr de vouloir supprimer cette porte ?',
        'create': 'Ajouter une porte',
    },
    'about': {
        'title': 'A propos',
    },
    'accesspoint': {
        'belongs_to': "Ce point d'accès appartient à la porte <strong>{{dooralias}}</strong>.",
        'no_belongs': "Ce point d'accès n'est pas lié à une porte.",
    },
	'audit': {
        'entries_below': "Enregistrements d'audit ci-dessous :",
        'before': 'Avant :',
        'after': 'Après :',
		'enable_wsapicall': 'Activer WSAPICall',
		'enable_userevent': 'Activer UserEvent',
		'enable_doorevent': 'Activer DoorEvent',
		'enable_groupevent': 'Activer GroupEvent',
		'enable_credentialevent': 'Activer CredentialEvent',
		'enable_scheduleevent': 'Activer ScheduleEvent',
		'enable_usergroupevent': 'Activer UserGroupMembershipEvent',
		'details_intro': "Affiche un état avant / après de l'enregistrement d'audit de l'objet modifié. Merci de noter que cette fonctionnalité n'est pas disponibles pour tous les types d'enregistrement d'audit.",
    },
    'evoxs': {
        'update':
        {
            'update_acked': 'La mise a jour a été acquittée.',
            'update_acked_failed': "L'acquitement de la mise a jour a echoué.",
            'update_cancelled': "La mise a jour a été annulée.",
            'update_cancel_failed': "L'annulation de la mise a jour a echoué.",
            'pending_check_update': 'Recherche des mises a jour en cours.',
            'check_update': 'Rechercher les mises a jour',
            'table':
            {
                'checkpoint': 'Checkpoint',
                'update_needed': 'Mise a jour requise ?',
                'generated_at': 'Date de génération',
                'updated_at': 'Date de changement de status',
                'target_alias': "Alias du point d'access",
            }
        }
    },
	'credential': {
		'title': 'Informations de crédential',
		'noowner': "Le crédential n'a pas de propriétaire.",
	},
	'error': {
		'title': "Oh non, quelque chose s'est mal passé.",
		'statuscode': 'Status Code :',
		'message': 'Message :',
		'requestid': 'Identifiant de requête :',
	},
	'schedule': {
		'mapping': 'Mapping : {{alias}}',
		'mapping_list': "Ci-dessous la liste des mapping liés à l'horaire.",
		'add_mapping': 'Ajouter mapping',
	},
	'overview': {
		'intro': "Cette page fournie un vue globale de certaines valeurs de configuration du système {{appname}}.",
		'logs_per_page': 'Evènements par page',
		'last_logs': 'Derniers évènements',
		'total_logs': 'Il y a un total de {{totalLogs}} évènements.',
	},
};
