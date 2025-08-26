import Model, { attr, belongsTo, hasMany } from '@ember-data/model';
import { buildValidations, validator } from 'ember-cp-validations';
import moment from 'moment';

const CredentialValidations = buildValidations({
    alias:
        {
            validators:
                [
                    validator('ds-error'),
                    validator('presence', true),
                    validator('length', {
                        min: 3,
                        max: 15
                    })
                ]
        }
});

export default class CredentialModel extends Model.extend(CredentialValidations) {
    get numericId() {
        return Number(this.get('id'));
    }

    get isEnabled() {
        const now = moment.utc();
        return this.get('validityEnabled') && now.isAfter(this.get('validityStart')) &&
                now.isBefore(this.get('validityEnd'));
    }

    @attr('string')
    alias;
    @attr('string')
    description;
    @belongsTo('user', { async: true, inverse: 'credentials', as: 'credential' })
    owner;

    // Validity information
    @attr('boolean')
    validityEnabled;
    @attr('utc')
    validityStart;
    @attr('utc')
    validityEnd;

    // The ODB version.
    @attr('number')
    version;

    // Quick info about a credential. For a card this would be the card
    // id. This doesn't come from the server.
    displayIdentifier = 'N/A';
    // This is a fake relationship, because server side it
    // does'nt exist directly.
    @hasMany('schedule', { async: true, inverse: null })
    schedules;
}
