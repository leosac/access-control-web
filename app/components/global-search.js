import Ember from 'ember';

export default Ember.Component.extend({
    // init() {
    //     this._super(...arguments);
    //
    //     const ws = this.get('websocket');
    //     console.log("la page est chargé");
    //     console.log(this.get('store'));
    //
    //     let store =  new Ember.RSVP.Promise(function (resolve, reject)
    //         {
    //           ws.sendJson('users',{}).then((data) => resolve(data),
    //               (failure) => reject(failure));
    //         });
    //     console.log("Le store est remplis");
    //     console.log(store);
    // },

    globalInfo: Ember.inject.service('leosac-info'),
    flashMessages: Ember.inject.service(),
    i18n: Ember.inject.service(),
    store: Ember.inject.service('store'),

    dataToObject: {},
    allObjects: [],
    selectedObjects: false,

    // didReceiveAttrs()
    // {
    //     const self = this;
    //
    //     const dataToObject = {};
    //     const objects = [];
    //     console.log(this.get('store'));
    //     this.get('store').forEach(function(type) {
    //        console.log(type);
    //     });
    //     // this.get('store').findAll('user', {reload: true}).then((users) =>
    //     // {
    //     //     users.forEach((user) =>
    //     //     {
    //     //         objects.push(user.get('username'));
    //     //         dataToObject[user.get('username')] = user;
    //     //     });
    //     //     self.set('allUsernames', objects);
    //     //     self.set('usernameToObject', dataToObject);
    //     // });
    // },
    // actions: {
    //     addToGroup()
    //     {
    //         const store = this.get('store');
    //         const fm = this.get('flashMessages');
    //
    //         const user = this.get('usernameToObject')[this.get('selectedUsername')];
    //         if (!user)
    //         {
    //             fm.danger(this.get('i18n').t('users.error.find_error'));
    //             return;
    //         }
    //
    //         const membership = store.createRecord('user-group-membership');
    //         membership.set('group', this.get('group'));
    //         membership.set('rank', this.get('selectedRank'));
    //         membership.set('user', user);
    //
    //         membership.save().then(() =>
    //             {
    //                 fm.success(this.get('i18n').t('users.error.add_success'));
    //             },
    //             () =>
    //             {
    //                 fm.danger(this.get('i18n').t('users.error.add_error'));
    //                 membership.deleteRecord();
    //             });
    //     }
    // }
});
