import { defer, hash } from 'rsvp';
import { service } from '@ember/service';
import LeosacRoute from 'web/leosac-route';

export default class extends LeosacRoute {
    @service
    store;

    _title = 'led-buzzer.list.title';
    _requireAuth = true;

    model()
    {
        const promise = defer();
        let tmpArray = [];

        hash({
            led: this.store.findAll('led', {reload: true}),
            buzzer: this.store.findAll('buzzer', {reload: true}),
        }).then((hash) => {
            tmpArray = tmpArray.concat(hash.buzzer.toArray(), hash.led.toArray());
            promise.resolve(tmpArray);
        });

        return promise.promise;
    }
}
