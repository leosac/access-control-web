import Ember from 'ember';
import {UpdateSeverity} from 'web/leosac-constant';

// return a severity depending of the given severity
export function severityToString(params/*, hash*/) {
    let value = params[0];

    if (value === UpdateSeverity.CRITICAL)
        return 'CRITICAL';
    else if (value === UpdateSeverity.HIGH)
        return 'HIGH';
    else if (value === UpdateSeverity.NORMAL)
        return 'NORMAL';
    else if (value === UpdateSeverity.LOW)
        return 'LOW';
    return 'N/A';
}

export default Ember.Helper.helper(severityToString);
