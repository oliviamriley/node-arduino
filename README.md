# ```node-arduino```
```Node.js``` app to visualize Arduino data in-browser

## Installing

Install this globally and you'll have access to the ```node-arduino``` command anywhere on your system.

```npm install -g node-arduino```


## Usage
```node-arduino``` functions as a server, reading data from a serial port, and sending this data out through a web socket on port 8080.
The native ```WebSocket``` browser object is used as the client in this connection.

### Visualizers

```visualizers/``` in the ```node-arduino``` install directory contains the HTML and browser-side JavaScript for a variety of client visualizers:
* graph - graphing utility using ```plotly.js```
* chroma - pH visualizer using ```chroma.js```
* color-scale - pH visualizer using a sliding, color-coded scale


### Command-line flags

* ```-p --port```

   Specify a serial port to connect to.

   "```node-arduino -p /dev/ttyACM0```"

* ```-b --baud```

   Specify a baud rate for serial connection. Defaults to 9600 baud.

   "```node-arduino -B 19200```"

* ```-v --visualizer```

   Specify a visualizer to use with ```node-arduino```. Defaults to ```graph```.

   "```node-arduino -v color-scale```"

* ```-d --delimiter```

   Specify delimiter character(s) for parsing serial data. Defaults to ```\r\n```, the ```Serial.println()``` delimiter. 

   "```node-arduino -d \n```"

## Arduino sketches for ```node-arduino```

node-arduino will receive any information sent over the serial connection--just use the built-in ```Serial.println()``` function.

The graph visualizer interprets data based on headers; data should be formatted "header: value", where the header is something like "temp: " and the value is "21.50".


##### Please send any questions, comments, or bug reports to ethanmriley@gmail.com
