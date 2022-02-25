import { Promise } from 'rsvp';
import { inject as service } from '@ember/service';
import Component from '@ember/component';

export default Component.extend({
    websocket: service('websocket'),
    gpioId: 0,
    actions: {
        // This is a test function, it will ask the server to test the gpio
        // not every useful, execpt for testing purpose
        testPiface() {
            const self = this;
            const ws = this.get('websocket');

            return new Promise(function (resolve, reject) {
                ws.sendJson('pfdigital.test_output_pin', {gpio_id: Number.parseInt(self.get('gpioId'))}).then((data) => resolve(data),
                    (failure) => reject(failure));
            });
        }
    }
});
