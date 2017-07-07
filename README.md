# node-arduino
Node.js app to visualize Arduino data in-browser

##Install

###Windows

1. Download the [Windows version of node-arduino](https://community.csdt.rpi.edu/media/filer_public/6c/9a/6c9a7df2-8e42-4485-962f-61eac43a6307/node-arduino_windows_100.zip)
2. Run the nodejs installer (it will look like node-vXXXX.msi), and click "Next" until the installer finishes
3. Click install.bat
4. You're done! Whenever you want to run the app from now on, just click node-arduino.bat


###Ubuntu

1. Download the [Ubuntu version of node-arduino](https://community.csdt.rpi.edu/media/filer_public/3c/f5/3cf5d7d6-9651-4b0a-b8ff-b9e98e521385/node-arduino_ubuntu_100.zip)
2. Click install.sh, and enter the root password when prompted
3. Run node-arduino from the command line with "nodejs node-client.js"



##Running node-arduino

1. Plug an Arduino into any USB port on your computer
2. Either click the node-arduino launcher or:
3. Run node_client.js 
4. Open browser_client.html


##Writing Arduino sketches for node-arduino

node-arduino will recieve any information sent over the serial connection--just use the built-in Serial.println() function. 

node-arduino interprets data based on headers; data should be formatted "header: value", where the header is something like "pH: " and the value is "7.50".


#####Please send any questions, comments, or bug reports to ethanmriley@gmail.com