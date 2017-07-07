#!/bin/sh

apt-get update && apt-get upgrade
apt-get install -y nodejs
npm install serialport
npm install ws

adduser $1 dialout 
