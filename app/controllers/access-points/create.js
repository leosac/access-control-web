import { action } from '@ember/object';
import { service } from '@ember/service';
import Controller from '@ember/controller';
import { v4 } from "uuid";

export default class extends Controller {
    @service
    flashMessages;
    @service
    router;
    @service
    store;

    @action
    createAP() {
        const ap = this.store.createRecord('leosac-builtin-access-point', {
            id: v4(),
            controllerModule: 'LEOSAC-BUILTIN-ACCESS-POINT',
            alias: 'AP-name'
        });

        this.router.transitionTo('leosac-builtin-access-point', ap.get('id'));
        // this.modelFor('access-points.create').save().then((ap) =>
        //     {
        //         this.flashMessages.success('Access Point created.');
        //
        //         // We create an object of type access point in the browser's memory.
        //         // However, server-side the object will have a concrete subtype.
        //         // So we just unload this temporary object, and we will get a fresh copy
        //         // with the correct underlying type when et reach the /access-point page.
        //         const id = ap.get('id');
        //         ap.unloadRecord();
        //         this.router.transitionTo('access-point', ap.get('id'));
        //     },
        //     () =>
        //     {
        //         this.flashMessages.danger('Failed to create Access Point.');
        //     });
    }
}