var data = [[]],
	refresh = {},
	terminalDisplay = {},
	autoscroll = true,
	layout = {},
	socket = {},
	time = new Date(),
	initial_time = time.getTime();

layout = {
  title:'node-arduino',
  height: 400,
  width: 480,
  xaxis: {
  	showticklabels: false,
  },
  showlegend: true
};

//setup empty graph (for cosmetic UI purposes)
Plotly.newPlot('myChart', data, layout, {displayModeBar: false});

terminalDisplay = document.getElementById("terminalDisplay");

function scroll(div) {
	if (autoscroll) {
		$('#' + div).animate({
			scrollTop: $('#' + div)[0].scrollHeight
		}, 800);
	}
}

//disable auto-scrolling on button click, scroll to bottom immediately when enabled
$("#toggleScroll").click(function() {
	autoscroll = !autoscroll;
	scroll("terminalDisplay");
});


socket = new WebSocket("ws://127.0.0.1:8080"); //attempt WebSocket connection with localhost on page load
socket.onmessage = function receiveMessage(event) {
	var new_data = {},
	entry = {};

	entry = document.createElement('li');
	entry.appendChild(document.createTextNode(event.data));
	terminalDisplay.appendChild(entry);        //add new data point to scrolling terminalDisplay div

	scroll("terminalDisplay");

	new_data = parseMessage(event.data);
	if (new_data.value.trim().length > 0) {    //sanity check; does the data received have an actual value, or is it just whitespace (common on startup)
		addData(new_data);
	}

	console.log(event.data);
}

function parseMessage(message) {
	var end_of_header = 0,
		header_ = "",
		value_ = "",
		data = {};

	end_of_header = message.indexOf(":");

	if (end_of_header > -1) {                                   //if ":" isn't present, end_of_header === -1
		header_ = message.substr(0, end_of_header);
	}

	value_ = message.substr(end_of_header + 1, message.length); //assuming data sent in the format "header: value"

	data = {
		header: header_,
		value: value_
	};

	return data;
}

function addData(new_data) {
	var dataset = [],
		is_new_data = true,
		new_trace = {},
		new_time =  new Date(),
		time_on_add = new_time.getTime() - initial_time,
		i = 0;

	for(i = 0; i < data.length; i++) {
		dataset = data[i];
		if (dataset.header === new_data.header) { //if the header on the message matches any existing dataset, add the message's data to that dataset
			dataset.x.push(time_on_add);          //x-axis is time by default
			dataset.y.push(new_data.value);
			is_new_data = false;
		}
	}

	if(is_new_data) {                 //if the message has an unknown header, create a new dataset, add the message data to it, and redraw the chart
		new_trace = {
			name: new_data.header,    //displayed in the legend; this is intended to be customizable for the users through the GUI
			header: new_data.header,  //pulled right from the message; used for identifying datasets
			x: [time_on_add],
			y: [new_data.value],
			mode: 'lines'
		};
		if(new_data.header === "") {  //just for cosmetic purposes; if we recieve data without a header, give it some default name
			new_trace.name = "data";
		}

		data.push(new_trace);
		Plotly.newPlot('myChart', data, layout, {displayModeBar: false}); //newPlot() adds new traces to the graph and takes longer

	} else {
		Plotly.update('myChart', data, layout, {displayModeBar: false});  //update() will only add to existing data, but is quicker
	}
}

refresh = document.getElementById("refresh");
refresh.onclick = function(){
	location.reload();
}

window.onbeforeunload = closeConnection; //close websocket on browser close or refresh

function closeConnection() {
	socket.onclose = function(){};       //disable default handler
	socket.close()
}