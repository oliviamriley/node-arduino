var SerialPort = require('serialport');
var WebSocket = require('ws');
var wss = new WebSocket.Server({host: '127.0.0.1', port: 8080});
var manual = false;

if(process.argv[2] == "-p" || process.argv[2] == "--port") {
	if(process.argv[3]) {
		manual = true;
	}
	else {
		console.log("Err: no port name supplied with manual flag.")
		process.exit(0);
	}
}


wss.on('connection', function(connection) {
	console.log("WebSocket connection established.");
	connection.send(9.99);
	if (wss.clients.size === 1) {
		initArduinoConnection();
	}
});

wss.broadcast = function broadcast(data) {
	wss.clients.forEach(function sendData(client) {
		if (client.readyState === 1) {   
			try {
				client.send(data);
			} catch(err) {
				console.log(err);
			}
		} else {
			client.terminate();
		}
	});
};

var streamFromSerial = function streamFromSerial(portName) {

	var Arduino = new SerialPort(portName, {
		parser: SerialPort.parsers.readline('\r\n') //'\r\n' is the spacing character added by Arduino's Serial.println() function, so we use it to parse data
	});

	Arduino.on('open', function() {
		console.log("Port " + portName + " opened.");
	});

	Arduino.on('data', function(data) {
		wss.broadcast(data.toString());
	});

	Arduino.on('error', function(err) {
		console.log(err);
	});
}

function initArduinoConnection() {

	var portName = "";

	if(process.argv[2] && (process.argv[2] == "-p" || process.argv[2] == "--port")) {
		portName = process.argv[3];
		streamFromSerial(portName);
	} else {
		SerialPort.list(function(err, ports) {
			ports.forEach(function(port) {
				if(port.manufacturer && port.manufacturer.indexOf("Arduino") !== -1) { //connect to the first device we see that has "Arduino" in the manufacturer name
					portName = port.comName;
					streamFromSerial(portName);
				}
			});
		});
	}
}