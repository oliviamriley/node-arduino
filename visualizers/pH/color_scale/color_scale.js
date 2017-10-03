var windowWidth = 0,
divWidth = 0,
wrapper = {},
divColors = [],
socket = {},
value = {};

divColors = ["#ff0000", "#ff4000", "#FF7F00", "#FFBF00", "#ffd633", "#ffff00",
"#80ff00", "#00ff00", "#33ccff", "#00bfff", "#00b0FF", "#0080ff", "#0040ff", "#0000ff", "#0000e6"];

windowWidth  = window.innerWidth;
wrapper = document.getElementById("wrapper");
divWidth = windowWidth / 15.0;


for(var i = 0; i < 15; i++) {
	var new_div = {},
	divLeft = 0;


	new_div = document.createElement("div");
	divLeft = divWidth*i;

	new_div.id = i;
	new_div.style.position = "absolute";
	new_div.style.top = "200px";
	new_div.style.height = "100px";
	new_div.style.width = divWidth + "px";
	new_div.innerHTML = i;
	new_div.style.display = "flex";
	new_div.style.justifyContent = "center";
	new_div.style.paddingTop = "150px";


	new_div.style.left = divLeft + "px";
	new_div.style.backgroundColor = divColors[i];

	wrapper.appendChild(new_div);
}

value = document.getElementById

socket = new WebSocket("ws://127.0.0.1:8080");

socket.onmessage = function receieveMessage(event){
	var pointerLeft = (event.data/15.0) * windowWidth;

	$("#pointer").animate({
	left: pointerLeft + "px"
	}, 500);
	$("#value").text(event.data);
}

