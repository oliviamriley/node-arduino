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
			if(port.manufacturer) {
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
			Arduino.flush();
			Arduino.close(); //flush and close Arduino connection on ws disconnect
		}
	});
}