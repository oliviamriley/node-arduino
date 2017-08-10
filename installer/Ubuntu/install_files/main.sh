#!/bin/sh

cd ../../bin

apt-get update && apt-get upgrade
apt-get install -y nodejs
npm install npm@latest
npm install serialport@4.0.7
npm install ws@3.1.0

adduser $1 dialout 
