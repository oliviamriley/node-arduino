var SerialPort = require('serialport');
var WebSocket = require('ws');
var socket = new WebSocket.Server({host: '127.0.0.1', port: 8080});

socket.on('connection', function(connection) {
	console.log("WebSocket connection established!");
	initDataStream(streamFromSerial, connection);
});

function initDataStream(openSerialConn, ws_connection) {

	SerialPort.list(function(err, ports) {
		ports.forEach(function(port) {
			if(port.manufacturer && port.manufacturer.indexOf("Arduino") !== -1) { //there must be a better way to do this TODO
				streamFromSerial(port.comName, ws_connection)
			}
		});
	});
}

function streamFromSerial(port_name, ws_connection) {

	var Arduino = new SerialPort(port_name, {
		parser: SerialPort.parsers.readline('\r\n')
	});

	Arduino.on('open', function() {
		console.log("Port " + port_name + " opened.");
	});

	Arduino.on('data', function(data) {
		if (ws_connection.readyState === 1) {
			try {
				ws_connection.send(data);
			} catch(err) {
				console.log(err);
			}
		} else {
			console.log("Websocket connection was closed!");
			ws_connection.close();
			if (Arduino.isOpen()) {
				Arduino.flush();
				Arduino.close(); 
			}
		}
	});

	Arduino.on('error', function(err) {
		console.log(err);
	});
}