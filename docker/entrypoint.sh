#!/bin/bash

BASE_PATH=${BASE_PATH:="/"}

sed -i "s|\"BASE_API_URL__MAIN\":.*|\"BASE_API_URL__MAIN\":\"${BASE_API_URL__MAIN:=BASE_API_URL__MAIN}\",|"  ${CONF_PATH:=/var/www/assets/config.json}
sed -i "s|\"BASE_API_URL__SECONDARY\":.*|\"BASE_API_URL__SECONDARY\":\"${BASE_API_URL__SECONDARY:=BASE_API_URL__SECONDARY}\"|"  ${CONF_PATH:=/var/www/assets/config.json}

sed -i 's#<base href="\/">#<base href="'"${BASE_PATH}"'">#g' /var/www/index.html

printf "Starting nginx...\n * App port: 80\n * Api url main: ${BASE_API_URL__MAIN} \n"
printf "Starting nginx...\n * App port: 80\n * Api url secondary: ${BASE_API_URL__SECONDARY} \n"
#printf "Starting nginx...\n * App port: 80\n"
nginx -g "daemon off;"
