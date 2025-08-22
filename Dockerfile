FROM debian:bookworm

ENV PUPPETEER_SKIP_DOWNLOAD=1

RUN apt-get update && apt-get install vim wget curl git -y
RUN curl -sL https://deb.nodesource.com/setup_22.x | bash -
RUN apt-get update && apt-get install nodejs -y

RUN npm install -g yarn
RUN npm install -g ember-cli

RUN mkdir /leosac-web/
COPY app /leosac-web/app
COPY config /leosac-web/config
COPY public /leosac-web/public
COPY package.json /leosac-web/
COPY ember-cli-build.js /leosac-web/
COPY run.sh /

RUN cd /leosac-web && yarn install --network-timeout 100000

## EmberJS port
EXPOSE 4200

ENTRYPOINT ["/run.sh"]
