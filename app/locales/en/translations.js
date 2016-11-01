export default {
    'firstname': 'Firstname',
    'lastname': 'Lastname',
    'email': 'Email',
    'username': "Username",
    'name': 'Name',
    'description': 'Description',
    'edit': 'Edit',
    'delete': 'Delete',
    'remove': 'Remove',
    'rank': 'Rank',
    'password': 'Password',
    'leave': 'Leave',
    'kick': 'Kick',
    'enabled': 'Enabled',
    'security': 'Security',
    'validity': 'Validity',
    'members': 'Members',
    'start_date': 'Start date',
    'end_date': 'End date',
    'access': 'Access',
    'information': 'Information',
    'alias': 'Alias',
	'alias_': 'Alias:',
    'type': 'Type',
    'author': 'Author',
    'timestamp': 'Timestamp',
    'mask': 'Mask',
    'finalized': 'Finalized',
    'details': 'Details',
    'refresh': 'Refresh',
    'current_page': 'Current Page',
    'page_size': 'Page Size',
    'total_page': 'Total Page',
    'count': 'Count',
    'pending': 'Pending',
    'acknowledged': 'Acknowledged',
    'cancelled': 'Cancelled',
    'cancel': 'Cancel',
    'acknowledge': 'Acknowledge',
    'update': 'Update',
	'wait': 'Please wait, fetching and preparing data.',
	'owner_': 'Owner:',
	'groups': 'Groups',
	'schedules': 'Schedules',
	'submit': 'Submit',
	'save': 'Save',
	'mapping': 'Mapping',
	'timeframes': 'Time Frames',
    'yes': 'Yes',
    'no': 'No',
    'not_available': 'Not Available',
    'access_point': 'Access Point',
    'clear_selection': 'Clear selection',

    // To avoid duplication, we may need to put single word into a namespace
    'w': {
        'door': 'Door'
    },

    'cancel_and_refresh': 'Cancel & Refresh',
    'group_information': 'Group information',
    'leave_group_confirmation': 'Are you sure you wish to leave this group ?',
    'kick_group_confirmation': 'Are you sure you wish to kick this user from the group ?',
    'delete_group_confirmation': 'Are you sure you wish to delete this group ?',

    'table': {
        // Some translation for table header mostly.
        'join_date': "Join date",
        'group_name': 'Group Name',
        'group_id': 'Group #Id',
        'total_member': 'Total members',
    },
    'form': {
        // General form stuff with label and placeholder.
        'username': {
            'label': 'Username',
            'ph': 'John'
        },
        'password': {
            'label': 'Password',
            'ph': 'Your password'
        }
    },
    'login-form': {
        'welcome': 'Please sign in',
        'submit': 'Sign in',
        'username_password_required': "Username and password are required."
    },
    'password-change': {
        'current_pw': 'Current password',
        'new_pw': 'New password',
        'submit': 'Change password'
    },
    'loading': {
        // loading.hbs
        'title': 'Please wait',
        'message': "The page is being loaded in the background. " +
        "It shouldn't take too long. <br>" +
        "If the page doesn't load in a few seconds, try refreshing it."
    },
    'index': {
        'title': 'Dashboard',
        'manage_access': 'Manage Access',
        'apply_update': 'Apply Update',
        'event': 'Events',
        'welcome': "Welcome <strong>{{username}}</strong>.<br />" +
        "Manage your EvoXS cylinders and user permissions.<br />" +
        "Register, setup, deploy. All from a web-based interface.<br />"
    },
    'profile': {
        'title': 'User Profile',
        'profile_updated': 'Profile has been updated',
        'fail_update': 'Error while updating profile'
    },
    'users': {
        'list': {
            'title': 'User list'
        },
        'create': {
            'title': 'Create New User',
            'account_info': 'Account Information',
            'user_create': 'User successfuly created.',
            'fail_create': 'Failed to create new user.',
        },
        'create_new_user': 'Create new user',
    },
    'door': {
        'delete_confirm': 'Are you sure you wish to delete this door ?',
        'create': 'Add Door',
    },
    'about': {
        'title': 'About',
    },
    'accesspoint': {
        'belongs_to': 'This access point belongs to door <strong>{{dooralias}}</strong>.',
        'no_belongs': 'This access point is not yet tied to a door.',
    },
    'audit': {
        'entries_below': 'Audits entries below:',
        'before': 'Before:',
        'after': 'After:',
		'enable_wsapicall': 'Enable WSAPICall',
		'enable_userevent': 'Enable UserEvent',
		'enable_doorevent': 'Enable DoorEvent',
		'enable_groupevent': 'Enable GroupEvent',
		'enable_credentialevent': 'Enable CredentialEvent',
		'enable_scheduleevent': 'Enable ScheduleEvent',
		'enable_usergroupevent': 'Enable UserGroupMembershipEvent',
		'details_intro': 'This show a before and after the audit entry snapshot of the object that was modified. Note that this features is not available for all kind of audit entry.',
    },
    'evoxs': {
        'update':
        {
            'update_acked': 'Update has been acknowledged.',
            'update_acked_failed': 'Failed to acknowledged update.',
            'update_cancelled': 'Update bas been cancelled.',
            'update_cancel_failed': 'Cancelling the update has failed.',
            'pending_check_update': 'Checking for updates. Please wait.',
            'check_update': 'Check Updates',
            'table':
            {
                'checkpoint': 'Checkpoint',
                'update_needed': 'Need update ?',
                'generated_at': 'Generation date',
                'updated_at': 'Status change date',
                'target_alias': 'Target Access Point Alias'
            }
        }
    },
	'credential': {
		'title': 'Credential infos',
		'noowner': 'The credential has no owner.',
	},
    'credentials': {
        'list': {
            'title': 'Credential list'
        },
        'pin_code_create': {
            'title': 'Create PIN Code'
        },
        'pin_code': {
            'title': 'PIN Code'
        },
        'wiegand_card': {
            'title': 'Wiegand Card'
        },
        'wiegand_card_create': {
            'title': 'Create Wiegand Card'
        }
    },
	'error': {
		'title': 'Oh no, something went wrong.',
		'statuscode': 'Status Code:',
		'message': 'Message:',
		'requestid': 'Request Identifier:',
	},
	'schedule': {
		'mapping': 'Mapping: {{alias}}',
		'mapping_list': 'Below are all the mapping linked to the schedule.',
		'add_mapping': 'Add mapping',
	},
	'overview': {
		'intro': "This page provide an overview of some of the configuration value of the {{appname}} system.",
		'logs_per_page': 'Log per page',
		'last_logs': 'Last logs',
		'total_logs': 'There is a total of {{totalLogs}} log messages.',
	},
    'access-overview': {
        'title': 'Access Overview'
    }
};
