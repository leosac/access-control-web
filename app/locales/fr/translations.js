export default {
    'firstname': 'Prénom',
    'lastname': 'Nom de famille',
    'email': 'Email',
    'username': "Nom d'utilisateur",
    'username_': "Nom d'utilisateur :",
    'name': 'Nom',
    'description': 'Description',
    'edit': 'Editer',
    'delete': 'Supprimer',
    'remove': 'Supprimer',
    'rank': 'Rang',
    'rank_group': 'Rang dans le groupe',
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
    'alias_': 'Alias:',
    'alias_placeholder': 'Un nom mémorisable',
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
    'wait': 'Merci de patienter, récupération et préparation des données.',
    'owner_': 'Propriétaire :',
    'owner': 'Propriétaire',
    'groups': 'Groupes',
    'schedules': 'Horaires',
    'submit': 'Envoyer',
    'save': 'Enregistrer',
    'mapping': 'Mapping',
    'timeframe': 'Zone de temps',
    'timeframes': 'Zones de temps',
    'yes': 'Oui',
    'no': 'Non',
    'not_available': 'Indisponible',
    'access_point': "Point d'accès",
    'access_point_placeholder': 'MyAccessPoint',
    'access_points': "Points d'accès",
    'clear_selection': 'Effacer la selection',
    'module': 'Module',
    'configuration': 'Configuration',
    'notes': 'Notes',
    'notes_placeholder': 'Quelques notes optionnelles...',
    'controller_module': 'Module contrôleur',
    'confirm': 'Confirmer',
    'confirmation': 'Confirmation',
    'to': 'à',
    'on': 'sur',
    'minutes_ago': 'il y a {{minutes}} minutes',
    'date': 'Date',
    'pincode': 'Code Pin',
    'add': 'Ajouter',
    'remove_selected': 'Supprimer la sélection',
    'search': 'Rechercher',
    'doors': 'Portes',
    'hardware': 'Matériels',
    'hardware_update': 'Mises à jour',
    'modules': 'Modules',
    'other': 'Autre',
    'audit_log': "Log d'audit",
    'value': 'Valeur',
    'parameter': 'Paramètre',
    'parameters': 'Paramètres',
    'instance_name': "Nom de l'instance",
    'instance_name_descr': "Le nom unique de l'instance {{appname}}.",
    'config_version': 'Configuration Version',
    'config_version_descr': 'Est utilisé lors de la synchronisation afin de déterminer ce qui nécessite synchronisation.',
    'uptime': 'Uptime',
    'uptime_descr': 'Temps depuis que {{appname}} a démarré. (HH:MM:SS)',
    'modules_descr': 'Les modules qui sont lancés.',
    'settings': 'Options',
    'logout': 'Se déconnecter',
    'switch_fr': 'Passer en francais',
    'switch_en': 'Switch to english',
    'display_id': 'Identifiant affiché',
    'action': 'Action',
    'here': 'ici',
    'message': 'Message',
    'test': 'test',
    'url': 'Url',
    'pending_updates': 'Mises a jour en attente',
    'update_history': 'Historique des mises à jour',
    'remove_timeframe' : 'Supprimer la zone de temps',

    // To avoid duplication, we may need to put single word into a namespace
    'w': {
        'door': 'Porte',
        'overview': 'Vue générale',
        'credentials': 'Crédentiaux',
        'update': 'Mettre a jour',
        'severity': 'Sévérité',
        'state': 'Etat',
        'user_id': 'Id utilisateur',
        'room_number': 'Numéro de la piece',
        'card_csn': 'Numéro de la carte'
    },

    'cancel_and_refresh': 'Annuler et rafraîchir',
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
        'manage_access': 'Gérer les accès',
        'apply_update': 'Appliquer les MaJ',
        'event': 'Evènements',
        'welcome': "Bienvenue <strong>{{username}}</strong> <br>" +
        "Gerez vos cylindres EvoXS et les permissions utilisateurs. <br>" +
        "Installez, configurez et deployez depuis l'interface web."
    },
    'profile': {
        'title': 'Profile Utilisateur',
        'profile_updated': 'Le profile a été mis a jour',
        'fail_update': 'Erreur de mise à jour du profile'
    },
    'users': {
        'title': 'Utilisateurs',
        'list': {
            'title': 'Liste des utilisateurs'
        },
        'create': {
            'title': 'Ajouter un utilisateur',
            'account_info': 'Information du compte',
            'user_create': 'User crée avec succès.',
            'fail_create': 'Echec de la creation du nouvel utilisateur.',
        },
        'add_user': 'Ajouter un utilisateur',
        'add_group': 'Ajouter un groupe',
        'add_credential': 'Ajouter un crédential',
        'create_new_user': 'Ajouter un utilisateur',
        'add_to_group': 'Ajouter au groupe',
        'remove_from_group': 'Êtes-vous sûr de vouloir supprimer {{username}} du groupe ?',
        'delete_group_confirm': 'Êtes-vous sûr de voulour supprimer ce groupe ?',
        'members': 'Nombre total de membres',
        'type_group': "Commencez à saisir le nom d'un groupe",
        'group_info': 'Information sur le groupe',
        'group_name': 'Nom du groupe',
        'create_new_group': 'Créer un nouveau groupe',
        'create_group': 'Créer le groupe',
        'list_groups_notice': "Merci de noter que le 'nombre total de membres' peut ne pas refléter le nombre de membres réel. Ceci est lié aux permissions.",
    },
    'group': {
        'title': 'Groupe',
        'list': {
            'title': 'Liste des groupes'
        },
        'create': {
            'title': 'Créer un group'
        }
    },
    'door': {
        'delete_confirm': 'Êtes-vous sûr de vouloir supprimer cette porte ?',
        'create_door': 'Ajouter une porte',
        'placeholder': 'MySuperDoor',
        'create': {
            'title': 'Ajouter une porte'
        },
        'list': {
            'title': 'Liste des portes',
        },
        'title': 'Porte'
    },
    'about': {
        'title': 'A propos',
    },
    'accesspoint': {
        'belongs_to': "Ce point d'accès appartient à la porte <strong>{{dooralias}}</strong>.",
        'belongs_to_nolink': "Ce point d'accès appartient à la porte",
        'no_belongs': "Ce point d'accès n'est pas lié à une porte.",
        'create': "Ajouter un point d'accès",
        'delete_confirm': "Êtes-vous sur de vouloir supprimer ce point d'accès ?",
    },
    'audit': {
        'title': "Log d'audit",
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
        'enable_updateevent': 'Activer UpdateEvent',
        'enable_zoneevent': 'Activer ZoneEvent',
        'details_intro': "Affiche un état avant / après de l'enregistrement d'audit de l'objet modifié. Merci de noter que cette fonctionnalité n'est pas disponibles pour tous les types d'enregistrement d'audit.",
    },
    'evoxs': {
        'title': 'EvoXS',
        'operations': {
            'title': 'Opérations',
            'set_time': "Configurer l'heure du cylindre",
            'extract_event': "Récupérer les évenements",
        },
        update:
            {
                title: "Mise à jour d'un point d'accès EvoXS",
            },
        'access-point': {
            'title': "Point d'accès EvoXS"
        },
        'cylinder-events':
            {
                title: 'Evenements cylindre'
            },
        'lockid': 'Lock Id',
    },
    'credential': {
        'title': 'Informations de crédential',
        'noowner': "Le crédential n'a pas de propriétaire.",
    },
    'credentials': {
        'title': 'Crédentiaux',
        'list': {
            'title': 'Liste des crédentiaux'
        },
        'pin_code_create': {
            'title': 'Créer Code PIN'
        },
        'pin_code': {
            'title': 'Code PIN',
            'add': 'Ajouter un code PIN',
        },
        'rfid_card': {
            'title': 'Carte RFID',
            'hex_id': 'Identifiant de carte hexadécimal',
            'number_bits': 'Nombre de bits',
            'add': 'Ajouter une carte RFID',
        },
        'rfid_card_create': {
            'title': 'Créer Carte RFID'
        },
        'delete_confirm': 'Êtes-vous sûr de vouloir supprimer ce crédential ?',
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
    },
    'schedule': {
        'title': 'Horaire',
        'asfield': 'Horaires :',
        'mapping': 'Mapping : {{alias}}',
        'mapping_list': "Ci-dessous la liste des mapping liés à l'horaire.",
        'add_mapping': 'Ajouter mapping',
        'add_door': 'Ajouter une porte',
        'type': "Saisissez le nom d'une horraire (ou %)",
        'type_door': "Commencez à saisir l'alias de la porte",
        'credential_schedule': 'Affiche les horaires et leur mapping qui sont liés <i>directement</i> au crédential.',
        'user_schedule': "Affiche les horaires et leur mapping qui vous sont liés <i>directement</i>. Ceci n'affichage pas les horaires qui sont liés au travers les groupes ou les crédentiaux.",
        'group_schedule': 'Affiche les horaires et leur mapping qui sont liés <i>directement</i> au groupe.',
        'no_timeframe': "Cette horaires n'a pas de zones horaires. Ceci veut dire qu'il n'aura aucun effet.",
        'no_mapping' : 'Il n\'y a pas de mapping',
        'remove_from_mapping': 'Supprimer du mapping',
        'remove_from_mapping_confirm': 'Êtes-vous sûr de vouloir quitter ce mapping ?',
        'grant_to_doors': 'Autorise les accès aux portes suivantes :',
        'doors': 'Portes',
        'no_doors': "Ce mapping n'est lié à aucune porte. Cela veut dire qu'il n'aura aucun effet.",
        'placeholder': 'MonHoraire',
        'join_mapping': 'Rejoindre le mapping',
        'monday': 'Lundi',
        'tuesday': 'Mardi',
        'wednesday': 'Mercredi',
        'thursday': 'Jeudi',
        'friday': 'Vendredi',
        'saturday': 'Samedi',
        'sunday': 'Dimanche',
        'start_time': 'Date de début',
        'end_time': 'Date de fin',
        'create_schedule': 'Créer une horaire',
        'create_note': 'Merci de compléter le formulaire suivant afin de créer une nouvelle horaire.',
        'delete_confirm': 'Êtes-vous sûr de vouloir supprimer cette horaire ?',

        'list': {
            'title': 'Liste des horaires',
        },
        'create': {
            'title': 'Créer une horaire'
        }
    },
    'overview': {
        'intro': "Cette page fournie une vue globale de certaines valeurs de configuration du système {{appname}}.",
        'logs_per_page': 'Evènements par page',
        'last_logs': 'Derniers évènements',
        'total_logs': 'Il y a un total de {{totalLogs}} évènements.',
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
    },
    'access-overview': {
        'title': 'Récapitulatif des accès'
    },
    'system-overview': {
        'title': 'Vue générale'
    },
    'access-point': {
        'title': "Point d'accès",
        'list': {
            'title': "Liste des point d'accès"
        },
        'create': {
            'title': "Creér un point d'accès",
        }
    },
    'autocomplete': {
        'search_group': 'Veuillez choisir un groupe (tapez % pour tout voir)',
        'search_access_point': "Veuillez choisir un point d'accès (tapez % pour tout voir)"
    },
    'update': {
        'title': 'Gestion des mises à jour',
        'status': 'état',
        'update_acked': 'La mise à jour a été acquittée.',
        'update_acked_failed': "L'acquitement de la mise à jour a echoué.",
        'update_cancelled': "La mise à jour a été annulée.",
        'update_cancel_failed': "L'annulation de la mise a jour a echoué.",
        'pending_check_update': 'Recherche des mises à jour en cours.',
        'check_update': 'Rechercher les mises à jour',
        'filter_access_point': "Filtrer par point d'accès",
        'potential_update': 'Potentielle mises à jour',
        'everything_up_to_date': 'Tout est à jour.',
        'table': {
            'checkpoint': 'Checkpoint',
            'update_needed': 'Mise à jour requise ?',
            'generated_at': 'Date de génération',
            'updated_at': 'Date de changement de status',
            'target_alias': "Alias du point d'accès",
        },
    }

};
