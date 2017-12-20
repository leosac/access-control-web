import DS from 'ember-data';
import {validator, buildValidations} from 'ember-cp-validations';

const ActionValidation = buildValidations({
    target: [
        validator('presence', true)
    ],
    command: [
        validator('presence', true)
    ]
});

export default DS.Model.extend(ActionValidation, {
    target: DS.belongsTo('device'),
    command: DS.attr('string'),
    params: DS.attr('action-params'),
    index: DS.attr('number')
});
