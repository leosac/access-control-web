FROM debian:jessie

RUN apt-get update && apt-get install emacs24-nox wget -y
RUN apt-get update && apt-get install curl -y;

RUN curl -sL https://deb.nodesource.com/setup_12.x | bash -
RUN apt-get update && apt-get install -y nodejs 
RUN apt-get update && apt-get install git -y

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

RUN cd /leosac-web && npm install
RUN cd /leosac-web && bower install --allow-root

## EmberJS port
EXPOSE 4200

ENTRYPOINT ["/run.sh"]
