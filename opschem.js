var canvasid = "ops-canvas";
var canvas, context, grid, components;

$().ready(function () {
	
	canvas = document.getElementById(canvasid);
	context =  canvas.getContext("2d"); 
	components = $.makeArray();
	
	grid = new Grid();
	
	resistor = new Component("Resistor");
	resistor.top = 120;
	resistor.left = 120;
	components.push(resistor);
	
	capacitor = new Component("Capacitor");
	capacitor.top = 240;
	capacitor.left = 120;
	components.push(capacitor);
	
	opamp = new Component("OpAmp");
	opamp.top = 360;
	opamp.left = 120;
	components.push(opamp);
	
	npn = new Component("NPN");
	npn.top = 120;
	npn.left = 240;
	components.push(npn);
	
	pnp = new Component("PNP");
	pnp.top = 240;
	pnp.left = 240;
	components.push(pnp);
	
	diode = new Component("Diode");
	diode.top = 360;
	diode.left = 240;
	components.push(diode);
	
	vcc = new Component("Vcc");
	vcc.top = 120;
	vcc.left = 360;
	components.push(vcc);
	
	ground = new Component("Ground");
	ground.top = 240;
	ground.left = 360;
	components.push(ground);
	
	draw();
});

$(window).resize(function() {
	draw();
});

function draw() {
	
	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;
	grid.draw();
	
	$(components).each(function(key, value) {
		this.draw();
	});
	
}

var Component = function(type) {
	
	this.name = type;
	
	this.img = new Image();
	this.img.src = "components/" + type + ".png";
	
	this.top = 0, 
	this.left = 0;
	
	this.draw = function() {
		
		// SNAP TO GRID.
		this.top /= 10; this.top *= 10;
		this.left /= 10; this.left *= 10;
		
		context.drawImage(this.img, this.left, this.top, this.img.width, this.img.height);
		context.globalCompositeOperation = "darker";
	}
	
}

var Grid = function() {
	
	this.draw = function() {
		
		for (var x = 0.5; x < canvas.width; x += 10) {
			context.moveTo(x, 0);
			context.lineTo(x, canvas.height);
		}

		for (var y = 0.5; y < canvas.height; y += 10) {
			context.moveTo(0, y);
			context.lineTo(canvas.width, y);
		}
		
		context.strokeStyle = "#eee";
		context.stroke();
	}
}
