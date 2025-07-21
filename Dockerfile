FROM node:22-alpine

WORKDIR /usr/src/app

ARG PORT
ARG NODE_ENV
ARG DB_URL
ARG AUTH_SECRET

ENV PORT=${PORT}
ENV NODE_ENV=${NODE_ENV}
ENV DB_URL=${DB_URL}
ENV AUTH_SECRET=${AUTH_SECRET}

RUN mkdir -p be ui be/assets

COPY /be/package*.json /usr/src/app/be
COPY /ui/package*.json /usr/src/app/ui

RUN cd be && npm install
RUN cd ui && npm install

COPY be /usr/src/app/be
COPY ui /usr/src/app/ui

RUN cd be && npm run build
RUN cd ui && npm run build

RUN mv ui/dist/* be/assets

RUN rm -rf ui

WORKDIR /usr/src/app/be

CMD ["npm", "start"]
