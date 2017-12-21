# Install Leosac Web

In order to install leosac-web, you should already have some program installed.

Since this application use the npm package, you should have Node and npm installed on the machine that will use it.

## Installing Node, npm (or yarn)

This work with Debian-like system(Ubuntu, Debian, Raspbian, ...):

To install Node, use this commands:

    curl -sL https://deb.nodesource.com/setup_8.x | sudo -E bash -
    sudo apt-get install -y nodejs
    
This will also install npm, but you should update it using this command:

    [sudo] npm install npm@latest -g

If you prefer to use Yarn (faster than npm), you can install with the package manager like that:
    
    curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | sudo apt-key add -
    echo "deb https://dl.yarnpkg.com/debian/ stable main" | sudo tee /etc/apt/sources.list.d/yarn.list
    sudo apt-get update && sudo apt-get install yarn


On any other UNIX-like operating system, there is a lot of documentation on the Internet.


## Installing ember-cli

This application use the [Ember.js](https://www.emberjs.com) framework.

You have to install ember-cli globally with npm:

    [sudo] npm install -g ember-cli@latest
    
or if you use yarn:

    [sudo] yarn global add ember-cli@latest

## Install the dependencies 

Once Node and npm or yarn are installed, you nearly have everything needed to launch the application. 

WARNING: You should also have the Leosac server running, and you should know its server address.
(The address is normally following a format like that: `ws://172.17.0.5:8888`). You should put your leosac address 
in the `ENV`. Use this command:  

    setenv LEOSAC_ADDR ws://172.17.0.5:8888

In order to build the addons needed by the application:
  
    npm install
    
or if you use yarn:

    yarn

This should install all the needed dependencies from the packages.json and the bower.json.
It is necessary for the application to run.

## Launch the application

In order to launch the application, you have to build the application:

    ember build --prod
    
You should have a _dist_ repository now. It contain everything that is needed by a browser to use the application.

Using this dist file, you can configurate a web server, like NGINX, an easy to use HTTP server configuration tools.

#### Using the application in dev mode

If you are interested in developing on the application, this is part will be useful to you.

We can launch the application in dev mode, there is no need to build the application:
   
    ember serve
    
And then you have to browse the provided http address. This should be something like: **http://localhost:4200**
