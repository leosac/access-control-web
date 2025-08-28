import { service } from '@ember/service';
import LeosacRoute from 'web/leosac-route';

export default class extends LeosacRoute {
    @service
    store;

    _title = 'piface-digital-gpios.list.title';
    _requireAuth = true;

    model()
    {
        return this.store.findAll('piface-digital-gpio', {reload: true});
    }
}
