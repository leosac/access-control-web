import DS from 'ember-data';
import Device from 'web/models/device';
import { validator , buildValidations } from 'ember-cp-validations';

const Validations = buildValidations({
    defaultBlinkDuration: {
        validators: [
            validator('ds-error'),
            validator('presence', true),
            validator('number',{
                allowString:true,
                integer: true,
                gte: 0,
                lte: 15000
            })
        ]
    },
    defaultBlinkSpeed: {
        validators: [
            validator('ds-error'),
            validator('presence', true),
            validator('number',{
                allowString:true,
                integer: true,
                gte: 0,
                lte: 5000
            })
        ]
    }
});

export default Device.extend(Validations, {
    defaultBlinkDuration: DS.attr('number', {defaultValue: 3000}),
    defaultBlinkSpeed: DS.attr('number', {defaultValue: 1000}),
    gpio: DS.belongsTo('gpio',  {polymorphic:true})
});
