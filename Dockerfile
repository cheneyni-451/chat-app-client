FROM node:22-slim AS build

WORKDIR /app

COPY package.json package.json
COPY package-lock.json package-lock.json

RUN npm i

COPY . .

RUN npm run build

FROM python:3-slim-trixie

COPY --from=build /app/dist /usr/src/app

WORKDIR /usr/src/app

CMD [ "python", "-m", "http.server", "4173" ]