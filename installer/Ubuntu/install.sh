#!/bin/sh

USER=$(whoami)

sudo install_files/main.sh $USER

cd ../../

echo "nodejs bin/node_client.js &" >> node_arduino.sh

chmod +x node_arduino.sh

