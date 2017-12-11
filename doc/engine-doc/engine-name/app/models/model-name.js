import DS from 'ember-data';
import Device from 'web/models/device';
import { validator , buildValidations } from 'ember-cp-validations';

const Validations = buildValidations({
    // you can put validator here
});

/**
 * importing Device, which is a model declared in the application, add its parameter to the current model.
 * By doing that, I added the attribute: name, the deviceClass (an instance used by the leosac server),
 * and if the device is enabled.
 *
 * Remember that the store service must be shared in order to access to the application models.
 * Here, I set a relationships to the Gpio model, also defined in the application.
 */

export default Device.extend(Validations, {
    gpio: DS.belongsTo('gpio',  { polymorphic: true })
});
