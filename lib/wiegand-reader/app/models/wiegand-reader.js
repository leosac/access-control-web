import Ember from 'ember';
import RFIDReader from 'web/models/rfid-reader';
import DS from 'ember-data';
import { validator , buildValidations } from 'ember-cp-validations';
import Model from 'ember-data/model';

const Validations = buildValidations(
    {

    }
);

export default RFIDReader.extend(Validations, {
    mode: DS.attr('mode'),
    gpioHigh: DS.belongsTo('gpio'),
    gpioLow: DS.belongsTo('gpio')
});
