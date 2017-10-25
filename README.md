# Leosac

This README outlines the details of collaborating on this Ember application.  
This application is a Graphical User Interface for [Leosac](http://www.leosac.com).

## Prerequisites

You will need the following things properly installed on your computer.

* [Git](http://git-scm.com/)
* [Node.js](http://nodejs.org/) (with NPM)
* [Bower](http://bower.io/)
* [Ember CLI](http://ember-cli.com/)
* [PhantomJS](http://phantomjs.org/)

## Installation

* `git clone <repository-url>` this repository
* change into the new directory
* `npm install`
* `bower install`

## Running / Development

* You should have a Leosac docker running. 
* There is an address provided by docker. It should putted in your ENV, with the prefix **ws** or **wss**(websocket).
 (eg "export LEOSAC_ADDR=ws://10.10.10.25:8888/) 
* `ember serve`
* Visit your app at [http://localhost:4200](http://localhost:4200).

### Add new module

* If you want to add a new module, you must be sure that there will be no conflict with the application. If you want
 that your module communicate with the back-end, please be sure that Leosac will "understand" the message that your 
 module will send.
 
* If **docker base build** is specified, the information is optional. It is only necessary for deploy purpose
 
#### Generate the module

* To generate a new module, we will use [ember-engines](http://ember-engines.com):
 `ember generate in-repo-addon my-addon`. This will create a new engines in the *lib* repository. In your module repository
 you will find something like that:   
  .  
  ├── addon  
  │   ├── engine.js  
  │   ├── resolver.js  
  │   ├── routes.js  
  │   └── templates  
  │       └── application.hbs  
  ├── config  
  │   └── environment.js  
  ├── index.js  
  └── package.json  
  
#### Configure the newly created engine

1. Go to the app repository of the host application(/app/).
   1. In the *app.js*
      1. Provide in the `engines`;
       ```
       myModule: { // ! name is camelCased here !
                  leosacProperty: {
                      needServer: true,
                      displayName: 'Cool name'
                  },
                  dependencies: {
                      externalRoutes: {
                          login: 'login'
                      },
                      services: [
                          'authentication',
                          'websocket',
                          'leosac-info',
                          'flashMessages',
                          'store',
                          'module-manager'
                      ]
                  }
              },
         ```
       2. In leosacProperty, this will be used by the `module-manager` service, this is for display purpose, and error.
       3. the `dependencies` value is necessary, and should be copy pasted as presented above
   2. In the router.js, make sure that there is a newly created line: 
      `this.mount('my-module');`, it should be added automatically when generating the engine.
2. Create a `module-config.json` at the root of the engines(*/lib/my-module*) (**docker base build!**)
   1. It should respect this syntax:
   
          {
              "displayName": "My module",
              "needServer": false // or true if needed
          }
3. Stil at the root of the engine, there certain file that need to be changed.
   1. In the *package.json*, you must provide the necessary addon for your module. A good base should be adding:
   ```
   "dependencies": {
       "ember-bootstrap": "1.0.0-rc.3", //the application respect a bootstrap theme 
       "ember-bootstrap-cp-validations": "1.0.0-alpha.0", // bootstrap theme for the validation
       "ember-cli-babel": "6.8.2", // necessary
       "ember-cli-htmlbars": "2.0.3", // necessary
       "ember-cli-htmlbars-inline-precompile": "1.0.2", // necessary
       "ember-cli-flash": "1.4.3", // allow the flash messages
       "ember-cp-validations": "3.5.0", // special validation
       "ember-data": "2.15.0", // necessary if you want to create a model or manipulate data
       "ember-i18n": "5.0.2", // tranlation addons
       "ember-power-select": "1.9.6", // allow the user to select something among a list 
       "ember-route-action-helper": "2.0.6", // this permit to call actions defined in the route from the template
       "ember-toggle": "5.2.0", // this is a toggle switch
       "ember-truth-helpers": "1.3.0" // allow simple condition in hbs template (==, !=, >, ...)
     },
     "ember-addon": {
       "paths": [
         "../shared-tools" // this is an addon that allow the application and the module to share components (button-with-confirmation) 
       ]
     }
     ```
     (The addons may needs some updates)
     
   2. In the *addon/engine.js*, you must provide the same `dependencies` than in the *app.js*, it must be placed under the `modulePrefix`:
   ```
   dependencies: {
          services: [
            'authentication',
            'websocket',
            'leosac-info',
            'flashMessages',
            'store',
            'module-manager'
          ],
          externalRoutes: [
            'login'
          ]
    }
   ``` 
   3. (OPTIONAL) If you want to use your translation, put in *config/environment.js*, under `environment: environment`:
        ```
        i18n: {
            defaultLocale: 'en'
        }
        ```

* At this point, your in-repo-engines is configured to work with the application. 

### Tips

* Use the bootstrap theme provided by ember-bootstrap. The whole application is based on this theme.
* Every time you create a new file, if you want that the application take into account the new file,
 restart the application (kill the process, and relaucnh with `ember s`)
* For now, only the only languages supported are english and french, if you want to provide more language, please do so!

### Code Generators

Make use of the many generators for code, try `ember help generate` for more details

### Running Tests

* `ember test`
* `ember test --server`

### Building

* `ember build` (development)
* `ember build --environment production` (production)

## Further Reading / Useful Links

* [ember.js](http://emberjs.com/)
* [ember-cli](http://ember-cli.com/)
* [ember-engines](http://ember-engines.com)
* Development Browser Extensions
  * [ember inspector for chrome](https://chrome.google.com/webstore/detail/ember-inspector/bmdblncegkenkacieihfhpjfppoconhi)
  * [ember inspector for firefox](https://addons.mozilla.org/en-US/firefox/addon/ember-inspector/)
