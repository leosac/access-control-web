import Ember from 'ember';

export default Ember.Component.extend({
    websocket: Ember.inject.service('websocket'),
    gpioId: 0,
    actions: {
        // This is a test function, it will ask the server to test the gpio
        // not every useful, execpt for testing purpose
        testPiface() {
            const self = this;
            const ws = this.get('websocket');

            return new Ember.RSVP.Promise(function (resolve, reject) {
                ws.sendJson('pfdigital.test_output_pin', {gpio_id: Number.parseInt(self.get('gpioId'))}).then((data) => resolve(data),
                    (failure) => reject(failure));
            });
        }
    }
});
