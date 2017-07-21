# node-arduino
Node.js app to visualize Arduino data in-browser

## Install

### Windows

1. Download the Windows installer by clicking [here](https://community.csdt.rpi.edu/media/filer_public/99/b9/99b94be8-9378-4701-bbd6-df4a4453af0b/node-arduino-windows-102.zip).
2. Since the files you just downloaded came in a .zip archive, you will need to extract them to a normal folder. Open the archive by double-clicking it, then click "extract" at the top of the file explorer window. Choose a location to extract that will be easily accessible to you. 
3. Navigate to the extracted folder, click install.bat, and proceed through the NodeJS installer window.
4. Launch the application by clicking node-arduino.bat. 


### Ubuntu

1. Download the Ubuntu installer by clicking [here](https://community.csdt.rpi.edu/media/filer_public/3c/f5/3cf5d7d6-9651-4b0a-b8ff-b9e98e521385/node-arduino_ubuntu_100.zip).
2. Unzip the archive.
3. Click install.sh, and enter the root password when prompted.
4. Run node-arduino from the command line with "nodejs node-client.js"


### macOS

At this time, there is no macOS installer for node-arduino.


## Running node-arduino

1. Plug an Arduino into any USB port on your computer
2. Either click the node-arduino launcher or:
3. Run node_client.js 
4. Open browser_client.html

### Command-line flags

#### -p

Set the port to connect to, rather than having the program automatically choose.
Useful for use cases when there are multiple Arduinos connected to one PC. 

Usage: 
	"nodejs node_client.js -p /dev/ttyACM0"
	"node node_client.js -p COM1"


	
## Writing Arduino sketches for node-arduino

node-arduino will recieve any information sent over the serial connection--just use the built-in Serial.println() function. 

node-arduino interprets data based on headers; data should be formatted "header: value", where the header is something like "pH: " and the value is "7.50".


##### Please send any questions, comments, or bug reports to ethanmriley@gmail.com