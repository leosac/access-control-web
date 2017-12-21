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
* cd into the new directory
* `yarn install`

## Running / Development

* You should have a Leosac server(docker) running. 
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
 `ember generate in-repo-addon my-addon`. This will create a new engines in the *lib* repository.
  In your module repository you will find something like that:   
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
                      needServer: true,              // if it need a backend module
                      displayName: 'Cool name', // name that will be displayed on the side-menu
                      entryPoint: '/',                    // when you click on your module in the side-mmenu,
                                                               // this is the route that will be used in the module
                      modelToRoute: {                // if you have a model, this will be used to redirect
                                                                // to the model page of your module in the global-search 
                          myModel: 'my-model' 
                      },
                      isWizard: false, // if this is a wizard
                      neededModule: [
                      // if it is a wizard, list of the module needed by it
                      ]
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
                          'module-manager',
                          'search',
                          'i18n'
                      ]
                  }
              },
         ```
       2. In leosacProperty, this will be used by the `module-manager` service.
       3. the `dependencies` value is necessary, and should be copy pasted as presented above
   2. In the router.js, make sure that there is a newly created line: 
      `this.mount('my-module');`, it should be added automatically when generating the engine.
2. Create a `module-config.json` at the root of the engines(*/lib/my-module*) (**docker base build!**)
   1. It should respect this syntax:
   
          {
               needServer: true,     
               displayName: 'Cool name',
               entryPoint: '/',         
               isWizard: true                        
               modelToRoute: {
                    myModel: 'my-model' 
               },
               neededModule: [
               // list of needed module, if this is a wizard.
               ]
          }
      NOTE: This content should match exactly the `leosacProperty` dict in `app.js`. 
          
3. Still at the root of the engine, there certain file that need to be changed.
   1. In the *package.json*, you must provide the necessary addon for your module. A good base should be adding:
   Note that when referencing a dependency that is provided by the application, you must use `*`
   for the version.   
   ```
   "dependencies": {
       "ember-bootstrap": "*", //the application respect a bootstrap theme 
       "ember-bootstrap-cp-validations": "*", // bootstrap theme for the validation
       "ember-cli-babel": "*", // necessary
       "ember-cli-htmlbars": "*", // necessary
       "ember-cli-htmlbars-inline-precompile": "*", // necessary
       "ember-cli-flash": "*", // allow the flash messages
       "ember-cp-validations": "*", // special validation
       "ember-data": "*", // necessary if you want to create a model or manipulate data
       "ember-i18n": "*", // tranlation addons
       "ember-power-select": "*", // allow the user to select something among a list 
       "ember-route-action-helper": "*", // this permit to call actions defined in the route from the template
       "ember-toggle": "*", // this is a toggle switch
       "ember-truth-helpers": "*" // allow simple condition in hbs template (==, !=, >, ...)
     },
     "ember-addon": {
       # Allow reference an application-level addon. This allows modules and application
       # to shared addons / component / ...
       "paths": [
         "../shared-tools" // this is an addon that allow the application
                           // and the module to share components (button-with-confirmation) 
       ]
     }
     ```
     
     (The addons may needs some updates)
     
   2. In the *addon/engine.js*, you must provide the same `dependencies` than in the *app.js*, 
      it must be placed under the `modulePrefix`:
   ```
   dependencies: {
          services: [
            'authentication',
            'websocket',
            'leosac-info',
            'flashMessages',
            'store',
            'module-manager',
            'i18n'
          ],
          externalRoutes: [
            'login'
          ]
    }
   ``` 

* At this point, your in-repo-engines is configured to work with the application. 

### Tips

* Use the bootstrap theme provided by ember-bootstrap. The whole application is based on this theme.
* Every time you create a new file, if you want that the application take into account the new file,
 restart the application (kill the process, and relaunch with `ember s`)
* For now, only the only languages supported are english and french, if you want to provide more language, please do so!

### Code Generators

Make use of the many generators for code, try `ember help generate` for more details

### Running Tests

The test are wrote with snaptest and selenium, you can find more about it int the snaptest-harness file.

### Building

* `ember build --prod`

### Run

*  `ember serve` or `ember s`  
Don't forget to provide the leosac address. It should either be in your `ENV`, or you can provide it like that for example:
` LEOSAC_ADDR='ws://172.17.0.3:8888' ember s`


### Updating

Dependencies' versions are frozen in package.json to prevent WTF JSON PACKAGE CHANGE.
Use ncu (npm check update) to check for and upgrade the dependencies version.



## Further Reading / Useful Links

* [ember.js](http://emberjs.com/)
* [ember-cli](http://ember-cli.com/)
* [ember-engines](http://ember-engines.com)
* Development Browser Extensions
  * [ember inspector for chrome](https://chrome.google.com/webstore/detail/ember-inspector/bmdblncegkenkacieihfhpjfppoconhi)
  * [ember inspector for firefox](https://addons.mozilla.org/en-US/firefox/addon/ember-inspector/)
