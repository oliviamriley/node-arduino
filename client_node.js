var SerialPort = require('serialport');
var WebSocket = require('ws');
var socket = new WebSocket.Server({host: '127.0.0.1', port: 8080});

socket.on('connection', function(connection) {
	console.log("Connected");
	initDataStream(streamFromSerial, connection);
});

//connectToArduino applies some function to every port with a listed manufacturer 
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
		try {
			ws_connection.send(data);
		} catch(err) {
			console.log(err);
		}
	});
}