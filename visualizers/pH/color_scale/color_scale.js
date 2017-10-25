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
	new_div.style.bottom = "0%";
	new_div.style.height = "20%";
	new_div.style.width = divWidth + "px";
	//new_div.innerHTML = i; 
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
	var pointerLeft = (event.data/14.75) * windowWidth;

	$("#pointer").animate({
	left: pointerLeft + "px"
	}, 500);
	$("#value").text(event.data);
	if(event.data >= 0 && event.data < 1){
		document.getElementById("Ion Visualizer").src = "0.png";
	}
	else if(event.data >= 1 && event.data < 2){
		document.getElementById("Ion Visualizer").src = "1.png";
	}
	else if(event.data >= 2 && event.data < 3){
		document.getElementById("Ion Visualizer").src = "2.png";
	}
	else if(event.data >= 3 && event.data < 4){
		document.getElementById("Ion Visualizer").src = "3.png";
	}
	else if(event.data >= 4 && event.data < 5){
		document.getElementById("Ion Visualizer").src = "4.png";
	}
	else if(event.data >= 5 && event.data < 6){
		document.getElementById("Ion Visualizer").src = "5.png";
	}
	else if(event.data >= 6 && event.data < 7){
		document.getElementById("Ion Visualizer").src = "6.png";
	}
	else if(event.data >= 7 && event.data < 8){
		document.getElementById("Ion Visualizer").src = "7.png";
	}
	else if(event.data >= 8 && event.data < 9){
		document.getElementById("Ion Visualizer").src = "8.png";
	}
	else if(event.data >= 9 && event.data < 10){
		document.getElementById("Ion Visualizer").src = "9.png";
	}
	else if(event.data >= 10 && event.data < 11){
		document.getElementById("Ion Visualizer").src = "10.png";
	}
	else if(event.data >= 11 && event.data < 12){
		document.getElementById("Ion Visualizer").src = "11.png";
	}
	else if(event.data >= 12 && event.data < 13){
		document.getElementById("Ion Visualizer").src = "12.png";
	}
	else if(event.data >= 13 && event.data < 14){
		document.getElementById("Ion Visualizer").src = "13.png";
	}
	else{
		document.getElementById("Ion Visualizer").src = "14.png";
	}
}

