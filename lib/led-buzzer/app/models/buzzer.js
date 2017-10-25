import DS from 'ember-data';
import Device from 'web/models/device';
import { validator , buildValidations } from 'ember-cp-validations';


const Validations = buildValidations(
);

export default Device.extend(Validations, {
    defaultBlinkDuration: DS.attr('number', {defaultValue: 3000}),
    defaultBlinkSpeed: DS.attr('number', {defaultValue: 1000}),
    gpio: DS.belongsTo('gpio',  {polymorphic:true})
});
