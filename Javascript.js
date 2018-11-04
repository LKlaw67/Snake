var c = document.getElementById("canvas");
var context = c.getContext("2d");
let player = [], speed=20, length=0, newblock=false;
let apple, applex = (Math.floor(Math.random() * 25))*20, appley = (Math.floor(Math.random() * 25))*20;


function main() {
	player[0] = new Image(20, 20, "#000fff", 240,0);
	apple = new Image(20, 20, "#e51010", (Math.floor(Math.random() * 25))*20, (Math.floor(Math.random() * 25))*20);
	setInterval(Loop, 100);
}

function Loop() {
	context.clearRect(0,0,canvas.width,canvas.height);
	
	document.addEventListener('keydown',Press);
	//document.addEventListener('keyup', Release);
	for(var i=length; i>1; --i) {
		if(player[0].x === player[i].x && player[0].y === player[i].y) {
			length=0;
		}
	}
	
	if(player[0].x === apple.x && player[0].y === apple.y) {
		++length;
		player[length] = new Image(20, 20, "#000fff", player[length-1].x,player[length-1].y);
		for(var i=length; i>=0; --i) {
			if(apple.x === player[i].x && apple.y === player[i].y) {
				apple.x = Math.floor(Math.random() * 25)*20;
				apple.y = Math.floor(Math.random() * 25)*20;
				i=length;
			}
		}
	}
	
	apple.Update();
	for(var i=length; i>=1; --i) {
		player[i].x = player[i-1].x;
		player[i].y = player[i-1].y;
		player[i].Update();
	}
	if(player[0].move[0] === true) {
		player[0].y -= speed;
	}
	if(player[0].move[1] === true) {
		player[0].y += speed;
	}
	if(player[0].move[2] === true) {
		player[0].x -= speed;
	}
	if(player[0].move[3] === true) {
		player[0].x += speed;
	}
	if(player[0].x >= canvas.width) {
		player[0].x = 0;
	} else if(player[0].x+player[0].width <= 0) {
		player[0].x = canvas.width-player[0].width;
	}
	if(player[0].y >= canvas.height) {
		player[0].y = 0;
	} else if(player[0].y+player[0].height <= 0) {
		player[0].y = canvas.height-player[0].height;
	}
	player[0].Update();
}

function Image(width, height, colour, x, y) {
	this.width = width;
	this.height = height;
	this.colour = colour;
	this.x = x;
	this.y = y;
	this.move = [false/*up*/, true/*down*/, false/*left*/, false/*right*/];
	
	this.Update = function() {
		context.fillStyle = this.colour;
		context.fillRect(this.x, this.y, this.width, this.height);
	}
}

function Press(e) {
	if ((e.keyCode === 38 /* up */ || e.keyCode === 87 /* w */)&& player[0].move[1] === false){
		player[0].move[0] = true; 
		player[0].move[1] = false; 
		player[0].move[2] = false; 
		player[0].move[3] = false;
	}
	if ((e.keyCode === 40 /* down */ || e.keyCode === 83 /* s */)&& player[0].move[0] === false){
		player[0].move[1] = true; 
		player[0].move[0] = false; 
		player[0].move[2] = false; 
		player[0].move[3] = false;
	}
	if ((e.keyCode === 39 /* right */ || e.keyCode === 68 /* d */)&& player[0].move[2] === false){
		player[0].move[3] = true; 
		player[0].move[1] = false; 
		player[0].move[2] = false; 
		player[0].move[0] = false;
	}
	if ((e.keyCode === 37 /* left */ || e.keyCode === 65 /* a */)&& player[0].move[3] === false){
		player[0].move[2] = true; 
		player[0].move[1] = false; 
		player[0].move[0] = false; 
		player[0].move[3] = false;
	}
}
function Release(e) {
	if (e.keyCode === 38 /* up */ || e.keyCode === 87 /* w */){
		player.move[0] = false; 
	}
	if (e.keyCode === 39 /* right */ || e.keyCode === 68 /* d */){
		player.move[3] = false; 
	}
	if (e.keyCode === 40 /* down */ || e.keyCode === 83 /* s */){
		player.move[1] = false; 
	}
	if (e.keyCode === 37 /* left */ || e.keyCode === 65 /* a */){
		player.move[2] = false; 
	}
}
