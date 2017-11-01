let data = [[]];
let refresh = {};
let terminalDisplay = {};
let autoscroll = true;
let layout = {};
let socket = {};
let time = new Date();
let InitialTime = time.getTime();

let sentData = 0;

layout = {
  title: 'node-arduino',
  height: 400,
  width: 480,
  xaxis: {
      showticklabels: false,
  },
  showlegend: true,
};

// setup empty graph (for cosmetic UI purposes)
Plotly.newPlot('myChart', data, layout, {displayModeBar: false});

terminalDisplay = document.getElementById('terminalDisplay');

/**
 * Scroll display
 * @param {String} div - Display Channel to be scrolled
 */
function scroll(div) {
    if (autoscroll) {
        $('#' + div).animate({
            scrollTop: $('#' + div)[0].scrollHeight,
        }, 800);
    }
}

/**
 * disable auto-scrolling on button click
 * scroll to bottom immediately when enabled
 */
$('#toggleScroll').click(function() {
    autoscroll = !autoscroll;
    scroll('terminalDisplay');
});


socket = new WebSocket('ws://127.0.0.1:8080'); // attempt WebSocket connection with localhost on page load
socket.onmessage = function receiveMessage(event) {
    let NewData = {};
    let entry = {};
    entry = document.createElement('li');
    entry.appendChild(document.createTextNode(event.data));
    // add new data point to scrolling terminalDisplay div
    terminalDisplay.appendChild(entry);
    scroll('terminalDisplay');
    NewData = parseMessage(event.data);
    /**
     * sanity check; 
     * does the data received have an actual value
     * or is it just whitespace (common on startup)
     */
    if (NewData.value.trim().length > 0) {
        addData(NewData);
    }
    console.log(event.data);
};

/**
 * Parse message to meet format
 * @param {string} message - message from server
 * @return {dictionary} data - break message to a header&value format
 */
function parseMessage(message) {
    let EndOfHeader = 0;
    let header_ = '';
    let value_ = '';
    let data = {};
    EndOfHeader = message.indexOf(':');

    if (EndOfHeader > -1) { // if ":" isn't present, EndOfHeader === -1
        header_ = message.substr(0, EndOfHeader);
    }
    // assuming data sent in the format "header: value"
    value_ = message.substr(EndOfHeader + 1, message.length);
    data = {
        header: header_,
        value: value_,
    };
    return data;
}

/**
 * Add Data to the dataset 
 * @param {string} NewData - the new data collected 
 */
function addData(NewData) {
    /*
    var dataset = [],
        IsNewData = true,
        NewTrace = {},
        NewTime = new Date(),
        TimeOnAdd = NewTime.getTime() - InitialTime,
        i = 0;
    */
    let dataset = [];
    let IsNewData = true;
    let NewTrace = {};
    let NewTime = new Date();
    let TimeOnAdd = NewTime.getTime() - InitialTime;
    let i = 0;
    /*
    const dataset = [];
    const IsNewData = true;
    const NewTrace = {};
    const NewTime = new Date();
    const TimeOnAdd = NewTime.getTime() - InitialTime;
    const i = 0;
    */
    /*
    var dataset = [];
    var IsNewData = true;
    var NewTrace = {};
    var NewTime = new Date();
    var TimeOnAdd = NewTime.getTime() - InitialTime;
    var i = 0;
    */
    for (i = 0; i < data.length; i++) {
        dataset = data[i];
        /** 
         * if the header on the message matches any existing dataset
         * add the message's data to that dataset
         */
        if (dataset.header === NewData.header) {
            dataset.x.push(TimeOnAdd); // x-axis is time by default
            dataset.y.push(NewData.value);
            IsNewData = false;
        }
    }
    /**
     * if the message has an unknown header
     * create a new dataset, add the message data to it, and redraw the chart
     */
    if (IsNewData) {
        NewTrace = {
            /**
             * name: displayed in the legend; 
             * this is intended to be customizable for the users through the GUI
             */
            name: NewData.header,
            /**
             * header: pulled right from the message; 
             * used for identifying datasets
             */
            header: NewData.header,
            x: [TimeOnAdd],
            y: [NewData.value],
            mode: 'lines',
        };
        /**
         * NewData: just for cosmetic purposes; 
         * if we recieve data without a header, give it some default name 
         */
        if (NewData.header === '') {
            NewTrace.name = 'data';
        }
        data.push(NewTrace);
        /** newPlot() adds new traces to the graph and takes longer */
        Plotly.newPlot('myChart', data, layout, {displayModeBar: false});
    } else {
        /** update() will only add to existing data, but is quicker */
        Plotly.update('myChart', data, layout, {displayModeBar: false});
    }
}

// socket_s = new WebSocket("ws://127.0.0.1:8081"); 

toggle = document.getElementById('toggle');
toggle.onclick = function() {
    if (sentData == 0) {
        sentData = 1;
    } else {
        sentData = 0;
    }
    // sentData +=1;

    socket.send(sentData.toString());
    console.log(sentData.toString(), 'has been sent');
};

refresh = document.getElementById('refresh');
refresh.onclick = function() {
    location.reload();
};

// close websocket on browser close or refresh
window.onbeforeunload = closeConnection;

/** Close websocket connection. */
function closeConnection() {
    socket.onclose = function() {}; // disable default handler
    socket.close();
}
