export function initialize(app) {
    let myService = app.lookup('service:i18n');
    myService.addTranslations('en', {
        /**
         * All my english translation related to this engine will go here!
         */
       'blueprint': 'Blueprint'
    });
}

export default { initialize };
