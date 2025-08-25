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
    @belongsTo('gpio', {polymorphic:true})
    gpioHigh;
    @belongsTo('gpio', {polymorphic:true})
    gpioLow;
    @belongsTo('buzzer', {polymorphic:true})
    buzzer;
    @belongsTo('led', {polymorphic:true})
    greenLed;
}
