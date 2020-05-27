#!/bin/bash

#copy certs creating from let's encrypt (certbot) into .gamegame folder

mkdir -p ~/.gamegame
cp /etc/letsencrypt/live/gamegame.kevindial.com/privkey.pem ~/.gamegame/https.key
cp /etc/letsencrypt/live/gamegame.kevindial.com/cert.pem ~/.gamegame/https.cert
chown kevin -R ~/.gamegame/

echo "copied certs into ~/.gamegame/"
ls ~/.gamegame/
