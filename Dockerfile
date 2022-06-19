FROM debian:bullseye

RUN curl -sL https://deb.nodesource.com/setup_16.x | bash -
RUN apt-get update && apt-get install emacs24-nox vim wget curl git nodejs -y

RUN npm install -g yarn
RUN npm install -g bower
RUN npm install -g ember-cli@3.28.5

RUN mkdir /leosac-web/
ADD app /leosac-web/app
ADD config /leosac-web/config
ADD public /leosac-web/public
ADD bower.json /leosac-web/
ADD package.json /leosac-web/
ADD ember-cli-build.js /leosac-web/
ADD run.sh /

RUN cd /leosac-web && yarn install
RUN cd /leosac-web && bower install --allow-root

## EmberJS port
EXPOSE 4200

ENTRYPOINT ["/run.sh"]
