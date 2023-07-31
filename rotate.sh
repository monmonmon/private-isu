#!/usr/bin/env bash

rotate() {
    logfilepath=$1
    if [ -f "$logfilepath" ]; then
        echo "rotate $logfilepath"
        mv -f "$logfilepath" "$logfilepath".$(date +'%Y%m%d%H%M%S')
    fi
}

cd $(dirname $0)

rotate webapp/logs/nginx/access.log
rotate webapp/logs/mysql/mysql-slow.log

echo "restart docker"
docker-compose -f webapp/docker-compose.yml down
docker-compose -f webapp/docker-compose.yml up -d
# docker-compose -f webapp/docker-compose.yml exec nginx sh -c 'nginx -s reopen; echo "hoe $?"'
# docker-compose -f webapp/docker-compose.yml exec mysql sh -c 'mysqladmin flash-logs'
