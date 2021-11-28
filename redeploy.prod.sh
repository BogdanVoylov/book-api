#!/bin/bash

docker-compose down
docker-compose --profile prod up -d
docker container logs -f book-api