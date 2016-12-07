/**
 * It would have been great to put this in the user's model file
 * but somehow emberjs is not able to find the module when doing this...
 */

const UserRank = [
    'User',
    'Viewer',
    'Manager',
    'Supervisor',
    'Administrator'
];

/**
 * This enumeration represents the various EventType
 *
 * It must match the content of the C++ enumeration Leosac::Audit::EventType;
 */
const AuditEventType = {
    'WSAPI_CALL': 1,
    'USER_CREATED': 2,
    'USER_DELETED': 4,
    'USER_EDITED': 8,
    'USER_PASSWORD_CHANGED': 16,
    'USER_PASSWORD_CHANGE_FAILURE': 32,
    'GROUP_CREATED': 64,
    'GROUP_UPDATED': 128,
    'GROUP_DELETED': 256,
    'GROUP_MEMBERSHIP_JOINED': 512,
    'GROUP_MEMBERSHIP_LEFT': 1024,
    'CREDENTIAL_DELETED': 2048,
    'CREDENTIAL_CREATED': 4096,
    'CREDENTIAL_UPDATED': 8192,
    'SCHEDULE_CREATED': 16384,
    'SCHEDULE_DELETED': 32768,
    'SCHEDULE_UPDATED': 65536,
    'DOOR_CREATED': 131072,
    'DOOR_UPDATED': 262144,
    'DOOR_DELETED': 524288,
};

const UpdateStatus = {
    'PENDING': 0,
    'ACKNOWLEDGED': 1,
    'CANCELLED': 2,
    'TRANSIENT': 3,
};


const UpdateSeverity = {
    'LOW': 0,
    'NORMAL': 1,
    'HIGH': 2,
    'CRITICAL': 3,
};

export {UserRank, AuditEventType, UpdateStatus, UpdateSeverity};
