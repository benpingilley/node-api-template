FROM        node:latest

MAINTAINER  ben.pingilley@viawest.com

RUN         mkdir -p /var/log/api/ && useradd -ms /bin/bash nodeuser

COPY        application/package.json /opt/application/

RUN         cd /opt/application && npm install --silent

COPY        application /opt/application

RUN         chown -R nodeuser:nodeuser /opt/application /var/log/api

USER        nodeuser

EXPOSE      8080

ENTRYPOINT  ["/opt/application/node_modules/.bin/forever", "-a", "-l", "/var/log/api/forever.log", "-o", "/var/log/api/forever.log", "-e", "/var/log/api/forever.log", "/opt/application/server.js"]