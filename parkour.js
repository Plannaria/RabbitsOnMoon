window.requestAnimFrame = (function(){
        return  window.requestAnimationFrame       ||
                window.webkitRequestAnimationFrame ||
                window.mozRequestAnimationFrame    ||
                window.oRequestAnimationFrame      ||
                window.msRequestAnimationFrame     ||
                function( callback ){
                  window.setTimeout(callback, 1000 / 60);
                };
    })();

var w=window.innerWidth
|| document.documentElement.clientWidth
|| document.body.clientWidth;

var h=window.innerHeight
|| document.documentElement.clientHeight
|| document.body.clientHeight;

var alerting = document.getElementById("alerting");
alerting.style.left = w/2 -150;
alerting.style.top = h/3 ;

var score = document.getElementById("score");

//Get the canvas
var canvas=document.getElementById("canvas");
var ctx=canvas.getContext("2d");

//Set the style
if(w<h){
	canvas.width=w;
	canvas.height=w;
	canvas.style.left=0;
	canvas.style.top=w/4;
	document.bgColor = "#333333";
	var titleImage = document.createElement("img");
	titleImage.src = "image/title.png";
	titleImage.style.width = w;
	titleImage.style.height = w/4;
	var titleDiv = document.createElement("div");
	titleDiv.style.width = w;
	titleDiv.style.height = w/4;
	titleDiv.style.position = "absolute";
	titleDiv.style.top = "0";
	titleDiv.style.left = "0";
	titleDiv.appendChild(titleImage);
	document.body.appendChild(titleDiv);
	score.style.height = h - w/4*5;
	score.style.width = w;
	score.style.fontSize = (h - w/4*5)/2;
}
else{
	document.bgColor = "#93a5ba";
	canvas.width=h/5*4;
	canvas.height=h/5*4;
	canvas.style.position="absolute";
	canvas.style.bottom=h/10;
	canvas.style.left=w/2-h/5*2;
	score.style.height=h/10;
	score.style.width=h/5*4;
	score.style.left=w/2-h/5*2;
	score.style.fontSize = (h/10)/3*2;
	topTitle.style.height=h/10;
	topTitle.style.width=h/5*4;
	topTitle.style.left=w/2-h/5*2;
	topTitle.style.fontSize = (h/10)/3*2;
	topTitle.innerHTML = "Rabbits On Moon";
}
var dot = canvas.width / 64;
canvas.style.background="#333333";
alerting.style.height = canvas.height /2;
alerting.style.width = canvas.height /2;
alerting.style.left = w/2-canvas.height /4;
alerting.style.borderWidth = dot;
var alertText = document.getElementById("alertText");
alertText.style.fontSize = canvas.height/20;
var warning = document.getElementById("warning");
warning.style.width = w;

function paintCarrot(x,y,bodyColor,leafColor){
	function point(a,b){
		ctx.fillRect(a*dot,b*dot,dot,dot);
	}
	ctx.fillStyle = bodyColor;
	point(x+2,y+4);
	point(x+3,y+4);
	point(x+1,y+5);
	point(x+2,y+5);
	point(x+3,y+5);
	point(x+4,y+5);
	point(x+1,y+6);
	point(x+2,y+6);
	point(x+3,y+6);
	point(x+4,y+6);
	point(x,y+7);
	point(x+1,y+7);
	point(x+2,y+7);
	point(x+3,y+7);
	point(x,y+8);
	point(x+1,y+8);
	ctx.fillStyle = leafColor;
	point(x+4,y);
	point(x+3,y+1);
	point(x+4,y+1);
	point(x+5,y+1);
	point(x+3,y+2);
	point(x+4,y+2);
	point(x+5,y+2);
	point(x+4,y+3);
	point(x+6,y+3);
	point(x+7,y+3);
	point(x+5,y+4);
	point(x+6,y+4);
	point(x+7,y+4);
	point(x+8,y+4);
	point(x+6,y+5);
	point(x+7,y+5);
}

function refresh(){
	stoneLeft=96;
	treeLeft=128;
	carrotLeft = 64;
	carrotAppear = false;
	heroHeight=0;
	distance = 0;
	lastDistance = 0;
	speed = 2;
	alive = true;
	visible = true;
	jumping = 0;
	update();
	alerting.style.display="none";
	countDown = 0;
}

	var bg = new Image();
	var bgReady = false;
	bg.src = "image/parkourbg.png";
	bg.onload = function(){
		ctx.drawImage(bg,0,0,canvas.width,canvas.height);
		bgReady = true;
	}
	var shadow = new Image();
	var shadowReady = false;
	shadow.src = "image/shadow.png";
	shadow.onload = function(){
		shadowReady = true;
	}
	var smallEarth = new Image();
	var seReady = false;
	smallEarth.src = "image/smallEarth.png";
	smallEarth.onload = function(){
		seReady = true;
	}
	var hero = new Image();
	var heroReady = false;
	hero.src = "image/rabbitred.png";
	hero.onload = function(){
		heroReady = true;
		setTimeout(update,1000/60);
		draw();
	}
	var stone = new Image();
	var stoneReady = false;
	stone.src = "image/stone.png";
	stone.onload = function(){
		stoneReady = true;
	}
	var tree = new Image();
	var treeReady = false;
	tree.src = "image/tree.png";
	tree.onload = function(){
		treeReady = true;
	}


var rabbitFrame = 0;
var bgFrame = 0;
var then = 0;
var delta = 0;
var acDelta = 0;
var jumping = 0;
var heroHeight = 0;
var stoneLeft = 96;
var alive = false;
var distance = 0;
var treeLeft = 128;
var speed = 2;
var lastDistance = 0;
var carrotLeft = 64;
var carrotAppear = false;
var carrotHeight = 64;
var carrotColor = null;
var countDown = 0;
var doAbility = false;
var ability = 0;
var visible = true;


function draw(){
	if(bgReady){
		ctx.drawImage(bg,0,0,384,216,0,0,canvas.width,36*dot);
		ctx.drawImage(bg,bgFrame*6,216,384,168,0,36*dot,canvas.width,28*dot);
	}
	if(shadowReady){
		ctx.drawImage(shadow,13*dot,47*dot,12*dot,4*dot);
	}
	if(seReady){
		ctx.drawImage(smallEarth,4*dot,4*dot,9*dot,9*dot);
	}
	if(heroReady&&visible){
		ctx.drawImage(hero,parseInt(rabbitFrame)*96,0,96,96,12*dot,(32-heroHeight)*dot,16*dot,16*dot);
	}
}

function jump(){
	if (jumping <= 0){
		jumping = 21;
	}
}
canvas.addEventListener('touchstart', function(){jump();});
var tryAgain = document.getElementById("tryAgain");
tryAgain.style.height = canvas.height /8;
tryAgain.style.width = canvas.height /2;
tryAgain.style.top = canvas.height /64*21;
tryAgain.style.fontSize = canvas.height /9;
tryAgain.addEventListener('touchstart', function(){refresh();});

function drawStone(){
	if(stoneReady){
		ctx.drawImage(stone,stoneLeft*dot,44*dot,11*dot,7*dot);
	}
	stoneLeft-=speed;
	if (stoneLeft <= -26){
		stoneLeft = 64 + Math.floor(Math.random()*23);
	}
	if (stoneLeft<21 && stoneLeft>10 && heroHeight<4){
		alive = false;
		alertText.innerHTML = "Oh! You tripped over a stone. Try again."
		alerting.style.display="";
	}
	if((stoneLeft-treeLeft<16&&stoneLeft-treeLeft>0)||(treeLeft-stoneLeft<10&&treeLeft-stoneLeft>0)){
		stoneLeft=96;
		treeLeft = 128;
	}
}

function drawTree(){
	if(treeReady){
		ctx.drawImage(tree,treeLeft*dot,23*dot,26*dot,33*dot);
		treeLeft-=speed;
	}
	if (treeLeft <= -26){
		treeLeft = 75;
	}
	if (treeLeft<21 && treeLeft>10 && heroHeight>8){
		alive = false;
		alertText.innerHTML = "Oh! You crashed into a laurel tree. Try again."
		alerting.style.display="";
	}
} 

var orange = "#f2bc36";
var green = "#4db241";
var darkGreen = "#00C496";
var white = "#FFFFFF";
function drawCarrot(){
	if(carrotAppear == false&&countDown==0){
		switch(Math.floor(Math.random()*64)){
			case 1:
			visible = true;
			carrotColor = orange;
			carrotHeight = Math.floor(Math.random()*31);
			carrotAppear = true;
			ability = 1;
			break;
			case 2:
			visible = true;
			carrotColor = darkGreen;
			carrotHeight = Math.floor(Math.random()*31);
			carrotAppear = true;
			ability = 2;
			break;
			case 3:
			carrotColor = white;
			carrotHeight = Math.floor(Math.random()*31);
			carrotAppear = true;
			ability = 3;
			break;
		}
	}
	if(carrotAppear == true){
		paintCarrot(carrotLeft,39-carrotHeight,carrotColor,green);
		carrotLeft -= speed;
		if(carrotLeft <= -9){
			carrotLeft = 64;
			carrotAppear = false;
		}
		if(carrotLeft>3 && carrotLeft<23 && 16+heroHeight>carrotHeight && 16+heroHeight<25+carrotHeight){
			carrotAppear = false;
			carrotLeft = 64;
			countDown = 32;
			doAbility = true;
		} 
	}
}

var abilityName="",abilityNameColor;
function carrotRealize(){
	if (doAbility==true){
		switch(ability){
			case 1:
			if(countDown>0){
				speed = 3;
				countDown--;
				abilityName = "speed up";
				abilityNameColor = orange;
			}
			else{
				speed = 2;
				doAbility = false;
				abilityName = "";
			}
			break;
			case 2:
			if(countDown>0){
				speed = 1;
				countDown--;
				abilityName = "slow down";
				abilityNameColor = darkGreen;
			}
			else{
				speed = 2;
				doAbility = false;
				abilityName = "";
			}
			break;
			case 3:
			if(countDown>0){
				speed = 2;
				visible = false;
				countDown--;
				abilityName = "invisible";
				abilityNameColor = white;
			}
			else{
				visible = true;
				doAbility = false;
				abilityName = "";
			}
			break;
		}
	}
}

function writeAbility(){
	ctx.globalAlpha = countDown/32;
	ctx.font = 3*dot + "px Silkscreen";
	ctx.fillStyle = abilityNameColor;
	ctx.fillText(abilityName,12*dot,(32-heroHeight)*dot);
	ctx.globalAlpha = 1;
}

function update(){
	if (alive){
		requestAnimFrame(update);
	}
	delta = Date.now() - then;
	if(acDelta>30){
		acDelta = 0;
		bgFrame+=speed;
		if (bgFrame>63){
			bgFrame = 0;
		}
		rabbitFrame+=0.5;
		if (rabbitFrame>=3){
			rabbitFrame = 0;
		}
		if (jumping>0){
			if (jumping>17){
				heroHeight+=4;
				rabbitFrame = 1;
			}
			else if (jumping<17){
				heroHeight-=1;
				rabbitFrame = 2;
			}
			jumping --;
		}
		carrotRealize();
		draw();
		drawCarrot();
		drawTree();
		drawStone();
		writeAbility();
		distance++;
		score.innerHTML = distance;
	}
	else{
		acDelta+=delta;
	}
	then = Date.now();
}