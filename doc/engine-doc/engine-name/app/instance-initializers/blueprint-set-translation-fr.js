export function initialize(app) {
    let myService = app.lookup('service:intl');
    myService.addTranslations('fr', {
        /**
         * All my french translation related to this engine will go here!
         */
        'blueprint': 'Bleu'
    });
}

export default {initialize};
