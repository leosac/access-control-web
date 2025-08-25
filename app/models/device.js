import Model, { attr } from '@ember-data/model';
import { validator, buildValidations } from 'ember-cp-validations';

const DeviceValidation = buildValidations(
    {
        name: validator('presence', true)
    }
);

export default class DeviceModel extends Model.extend(DeviceValidation) {
    @attr('string')
    name;
    @attr('device-class')
    deviceClass; // device type(gpio, reader, buzzer...)
    @attr('boolean', {defaultValue: true})
    enabled; // active or not
}
