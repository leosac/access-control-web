import Model, { attr, belongsTo } from '@ember-data/model';
import { validator, buildValidations } from 'ember-cp-validations';

const ActionValidation = buildValidations({
    target: [
        validator('presence', true)
    ],
    command: [
        validator('presence', true)
    ]
});

export default class LeosacBuiltinAccessPointActionModel extends Model.extend(ActionValidation) {
    @belongsTo('device', { async: true, inverse: null })
    target;
    @attr('string')
    command;
    @attr('action-params')
    params;
    @attr('number')
    index;
}
