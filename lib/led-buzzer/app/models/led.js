import DS from 'ember-data';
import Device from 'web/models/device';
import { validator , buildValidations } from 'ember-cp-validations';

const Validations = buildValidations(
);

export default Device.extend(Validations, {
    defaultBlinkDuration: DS.attr('number'),
    defaultBlinkSpeed: DS.attr('number'),
    gpio: belongsTo('gpio')
});
