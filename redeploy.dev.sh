#!/bin/bash

docker-compose down
docker-compose --profile dev up -d
docker container logs -f book-api