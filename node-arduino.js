#!/usr/bin/env node
const SerialPort = require('serialport');
const WebSocket = require('ws');
// const os = require('os');
let opn = require('opn');
let program = require('commander');
let wss = {};
let visualizer = '';
let Arduino;

program
    .version('1.7.1')
    .option('-p, --port <p>', 'Specify serial port')
    .option('-b, --baud <b>',
            'Specify baud rate for serial connection', parseInt)
    .option('-v, --visualizer <v>', 'Specify visualizer')
    .option('-d, --delimiter <d>', 'Specify delimiter character')
    .parse(process.argv);

if (typeof program.visualizer === 'undefined') {
    visualizer = 'graph/graph.html';
} else if (program.visualizer === 'color-scale') {
    visualizer = 'pH/color_scale/color_scale.html';
} else if (program.visualizer === 'chroma') {
    visualizer = 'pH/chroma/chroma.html';
}

opn(__dirname + '/visualizers/' + visualizer);


if (typeof program.baud === 'undefined') {
    program.baud = 9600; // default to 9600 baud
}
if (typeof program.delimite === 'undefined') {
    // default to \r\n newline character (from Serial.println())
    program.delimiter = '\r\n';
}

wss = new WebSocket.Server({host: '127.0.0.1', port: 8080});

wss.on('connection', function(connection) {
    console.log('WebSocket connection established.');
    connection.send(9.99);
    if (wss.clients.size === 1) {
        initArduinoConnection();
    }
    connection.on('message', function sendToSerial(data) {
        console.log('sending to serial: ' + data);
        Arduino.write(data+'T');
    });
});

wss.broadcast = function broadcast(data) {
    wss.clients.forEach(function sendData(client) {
        if (client.readyState === 1) {
            try {
                client.send(data);
            } catch (err) {
                console.log(err);
            }
        } else {
            client.terminate();
        }
    });
};

let streamFromSerial = function streamFromSerial(portName) {
    Arduino = new SerialPort(portName, {
        parser: SerialPort.parsers.readline(program.delimiter),
        baudRate: program.baud,
    });
    Arduino.on('open', function() {
        console.log('Port ' + portName + ' opened.');
    });
    Arduino.on('data', function(data) {
        wss.broadcast(data.toString());
    });
    Arduino.on('error', function(err) {
        console.log(err);
    });
};


/**
 * Initialize arduino Connections
 */
function initArduinoConnection() {
    if (typeof program.port !== 'undefined') {
        streamFromSerial(program.port);
    } else {
        SerialPort.list(function(err, ports) {
            ports.forEach(function(port) {
                    /**
                     * connect to the first device we see that has 
                     * "Arduino" in the manufacturer name
                     */
                if (port.manufacturer &&
                    port.manufacturer.indexOf('Arduino') !== -1) {
                    streamFromSerial(port.comName);
                }
            });
        });
    }
}
