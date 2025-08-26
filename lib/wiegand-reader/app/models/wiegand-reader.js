import RFIDReader from 'web/models/rfid-reader';
import { attr, belongsTo } from '@ember-data/model';
import { validator , buildValidations } from 'ember-cp-validations';

const Validations = buildValidations(
    {
        gpioHigh: validator('presence', true),
    }
);

export default class WiegandReader extends RFIDReader.extend(Validations) {
    @attr('mode', {defaultValue: 'wiegand-mode.simple'})
    mode;
    @belongsTo('gpio', { async: true, inverse: null, polymorphic: true })
    gpioHigh;
    @belongsTo('gpio', { async: true, inverse: null, polymorphic: true })
    gpioLow;
    @belongsTo('buzzer', { async: true, inverse: null, polymorphic: true })
    buzzer;
    @belongsTo('led', { async: true, inverse: null, polymorphic: true })
    greenLed;
}
