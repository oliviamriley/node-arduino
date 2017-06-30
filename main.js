var data = [[]],
	layout = {},
	socket = {},
	time = new Date(),
	initial_time = time.getTime();

layout = {
  title:'Line Plot',
  height: 400,
  width: 480,
  xaxis: {
  	showticklabels: false
  }
};

//setup empty graph (for cosmetic UI purposes)
Plotly.newPlot('myChart', data, layout, {displayModeBar: false});

socket = new WebSocket("ws://127.0.0.1:8080");
socket.onmessage = function(event) {
	console.log(event.data);
	var new_data = parseMessage(event.data);
	addData(new_data);
}

function parseMessage(message) {
	var index = 0,
		header_ = "",
		value_ = "",
		data = {};

	index = message.indexOf(":");
	
	if (index > -1) {
		header_ = message.substr(0, index);
	}
	
	value_ = message.substr(index + 1, message.length);
	
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
		time_on_add = new_time.getTime(),
		i = 0;

	for(i = 0; i < data.length; i++) { //check if the header on new data matches an existing trace
		dataset = data[i];
		if (dataset.header === new_data.header) { //if so, add the new point to the trace
			dataset.x.push(time_on_add);
			dataset.y.push(new_data.value);
			is_new_data = false;
		}
	}

	if(is_new_data) { //if the new data point has an unknown header, create a new trace and redraw the chart
		new_trace = {
			name: new_data.header,   //displayed in the legend
			header: new_data.header, //header sent from Arduino
			x: [time_on_add],
			y: [new_data.value],
			mode: 'lines'
		};
		if(new_data.header === "") { //just for cosmetic purposes; a blank legend doesn't help much
			new_trace.name = "default";
		}

		data.push(new_trace);
		Plotly.newPlot('myChart', data, layout, {displayModeBar: false}); //newPlot() adds new traces to the graph

	} else {
		Plotly.update('myChart', data, layout, {displayModeBar: false});  //update() will only add to existing traces 
	}

	window.onbeforeunload = closeConnection; //close websocket on browser close or refresh

	function closeConnection() {
		socket.onclose = function(){}; //disable default handler
		socket.close()
	}
}