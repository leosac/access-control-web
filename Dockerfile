FROM debian:jessie
RUN apt-get update
RUN apt-get install emacs24-nox wget -y

RUN apt-get install nodejs npm -y
RUN apt-get install git -y
RUN ln -s /usr/bin/nodejs /usr/bin/node

RUN apt-get install haproxy -y

RUN npm install -g bower
RUN npm install -g ember-cli@2.9.0

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

#ADD haproxy.cfg /

## EmberJS port
EXPOSE 4200

ENTRYPOINT ["/run.sh"]
