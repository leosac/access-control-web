import Mixin from '@ember/object/mixin';

export default Mixin.create({
    /**
     * This is the save method for the schedule mapping
     * There is an issue related to it on github: https://github.com/emberjs/data/issues/1829
     *
     * This is related with ember data and an Has Many relationships in a model.
     *
     * It will put every part of the relationships in an array,
     * if there is a duplicate, it will delete it,
     * and then it will save the record.
     *
     * @returns {promise} This return a promise of the save method.
     */
    save: function () {
        let recordsToDelete = [];
        this.eachRelationship((name, descriptor) => {
            if (descriptor.kind === 'hasMany') {
                this.get(name).forEach((object) => {
                    if (object.get('isNew')) {
                        recordsToDelete.push(object);
                    }
                });
            }
        });

        let promise = this._super(...arguments);
        promise.then(() => {
            recordsToDelete.forEach((record) => {
                record.deleteRecord();
            });
        });
        return promise;
    }
});
