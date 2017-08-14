# ```node-arduino```
Node.js app to visualize Arduino data in-browser

## Installing

Install this globally and you'll have access to the ```node-arduino``` command anywhere on your system. 

```
npm install -g node-arduino
```


## Usage
```node-arduino``` functions as server, reading data from a serial port, and sending this data out through a web socket on port 8080. 
The native ```WebSocket``` browser object is used as the client in this connection. 

```visualizers/``` in the ```node-arduino``` install directory contains the HTML and browser-side JavaScript for a variety of client visualizers. Opening any of these in a web browser will connect with the app. 


### Command-line flags

```--port -p ```
Specify a serial port to read data from. 



	
## Arduino sketches for ```node-arduino```

node-arduino will recieve any information sent over the serial connection--just use the built-in ```Serial.println()``` function. 

The graph visualizer interprets data based on headers; data should be formatted "header: value", where the header is something like "temp: " and the value is "21.50".


##### Please send any questions, comments, or bug reports to ethanmriley@gmail.com