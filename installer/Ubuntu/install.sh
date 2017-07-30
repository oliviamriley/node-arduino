#!/bin/sh

USER=$(whoami)

sudo install_files/main.sh $USER

cd ../../

echo "nodejs bin/node_client.js &
firefox bin/browser/browser_client.html &" >> node_arduino.sh

chmod +x node_arduino.sh

