import Ember from 'ember';

export default Ember.Component.extend({
    websocket: Ember.inject.service('websocket'),
    actions: {
        testPiface() {
            console.log("OUI");
            const ws = this.get('websocket');

            return new Ember.RSVP.Promise(function (resolve, reject) {
                ws.sendJson('pfdigital.test_output_pin').then((data) => resolve(data),
                    (failure) => reject(failure));
            });
        }
    }
});
