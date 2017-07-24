# node-arduino
Node.js app to visualize Arduino data in-browser

## Install

1. Download node-arduino by clicking [here](https://github.com/ethanmriley/node-arduino/archive/master.zip).
2. Extract the files from the master.zip archive into an easily-accessible directory. 
3. Navigate to the installers directory in the extracted folder.
4. Choose the folder that matches your operating system (currently, only Windows and Ubuntu are supported). 
5. Click the install file in that directory. I 


### Windows

1. Download node-arduino by clicking [here](https://github.com/ethanmriley/node-arduino/archive/master.zip).
2. Extract the files from the master.zip archive into an easily-accessible directory. 
3. Navigate to the installers directory in the extracted folder.
4. Click "install.bat". A warning may pop up; if it does, click "More Info" and then "Run Anyways" (on Windows 10).
5. Navigate through the NodeJS installer, and simply click "Next" until the installer finishes. At this point, text will appear in a terminal window.
6. Once the terminal closes, node-arduino has been installed, and a link to run the program, "node-arduino.bat," has been created in the top level of the install directory. 


### Ubuntu

1. Download node-arduino by clicking [here](https://github.com/ethanmriley/node-arduino/archive/master.zip).
2. Extract the files from the master.zip archive into an easily-accessible directory. 
3. Navigate to the installers directory in the extracted folder.
4. Click "install.sh," and enter the root password when prompted.


### macOS

At this time, there is no macOS installer for node-arduino.


## Running node-arduino

1. Plug an Arduino into any USB port on your computer
2. Click the node-arduino launcher in the top level of the install directory. On Ubuntu, this will be "node-arduino.sh," and on Windows, "node-arduino.bat."

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