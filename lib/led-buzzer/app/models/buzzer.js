import { attr, belongsTo } from '@ember-data/model';
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

export default class BuzzerModel extends Device.extend(Validations) {
    @attr('number', {defaultValue: 3000})
    defaultBlinkDuration;
    @attr('number', {defaultValue: 1000})
    defaultBlinkSpeed;
    @belongsTo('gpio',  {polymorphic:true})
    gpio;
}
