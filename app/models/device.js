import DS from 'ember-data';
import {validator, buildValidations} from 'ember-cp-validations';

const DeviceValidation = buildValidations(
    {
        name: [
            validator('presence', true),
            validator('ds-error')
        ]
    }
);

export default DS.Model.extend(DeviceValidation, {
    name: DS.attr('string'),
    deviceClass: DS.attr('device-class'), // device type(gpio, reader, buzzer...)
    enabled: DS.attr('boolean') // active or not
});
