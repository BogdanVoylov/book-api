FROM node:14-buster-slim
RUN apt-get update; \
  apt-get install --no-install-recommends --no-install-suggests -q -y procps

RUN apt-get install curl -y
RUN apt-get install unzip -y

WORKDIR /workspace
COPY . .

ENV NODE_OPTIONS=--max-old-space-size=1024
RUN yarn
RUN yarn build

CMD ["yarn", "start"]