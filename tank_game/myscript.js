var field = document.getElementById("field");
var fcntxt = field.getContext('2d');

var tan = document.getElementById("tan");
var tt = tan.getContext('2d'); 

var scoreboard = document.getElementById("scoreboard");
var scntxt = scoreboard.getContext('2d');

var title = document.getElementById("title");
var tcntxt = title.getContext('2d');


var tank1 = new Image();
tank1.src = "tank_game/tank1.gif";

var tank2 = new Image();
tank2.src = "tank_game/tank2.gif";

var bomb = new Image();
bomb.src = "tank_game/bomb.gif";

var blast = new Image();
blast.src = "tank_game/blast.gif";

var b_g = new Image();
b_g.src = "tank_game/b_g.jpg";

var	count = 60;
var play = 0;
var clear;
var scr = 0;
var posX = 100; 
var posY = 495;
var b_posX=1000;
var b_posY;
var fired = false; 

var grad = scntxt.createLinearGradient(0,0,0,40);
grad.addColorStop(0,"#1a344f");
grad.addColorStop(1,"#448fb9"); 
tcntxt.fillStyle="#182e46";
tcntxt.fillRect(0,0,952,45);
tcntxt.strokeStyle="white";
tcntxt.textAlign="center";
tcntxt.font="38px Arial bold";
tcntxt.strokeText("TANK",401,32);
scntxt.fillStyle="#182e46";
scntxt.fillRect(0,0,150,550);
scntxt.textAlign="center";
scntxt.fillStyle="red"
scntxt.font="30px Arial bold"
scntxt.fillText("TIME",75,75);
scntxt.fillText("SCORE",75,275);
scntxt.fillStyle="white"
scntxt.font="12px Arial bold"
scntxt.fillText("Press Enter To Start",75,380);
scntxt.fillText("Arrows To Navigate",75,410);
scntxt.fillText("Space Fire",75,440);

document.addEventListener('keydown',keypress);

function keypress(event)
{ 
	if (play == 1)
		{
			if (event.keyCode == 37)
					goLeft();
			if (event.keyCode == 39)
					goRight();
			if (event.keyCode == 32)
					fire();
			if (fired == true)
				{
					scr+=1;
					scntxt.fillStyle="#182e46";
					scntxt.fillRect(0,295,150,55);
					scntxt.textBaseline="top";
					scntxt.font = " 60px sans-serif bold";
					scntxt.textAlign = "center";
					scntxt.fillStyle="white";
					scntxt.fillText(scr,75,295);
					fired = false;
				}
		}
	if (event.keyCode == 13)
		{
			play=1;
			bombDisp();
			//fcntxt.clearRect(0,0,800,550);
			tt.clearRect(0,0,800,60);
			tt.drawImage(tank1,posX,0);
			clear=setInterval(counter,1000);
		}
}

function counter()
{
	scntxt.fillStyle="#182e46";
	scntxt.fillRect(0,95,150,55);
	scntxt.textBaseline="top";
	scntxt.font = " 60px sans-serif bold";
	scntxt.textAlign = "center";
	scntxt.fillStyle="white";
	scntxt.fillText(count,75,95)
	count-=1;
	if (count<=-1)
	{
		count=60;
		play=0;
		clearInterval(clear);
		tt.clearRect(0,0,800,60);
		fcntxt.clearRect(0,0,800,550);
		fcntxt.fillStyle="red";
		fcntxt.textAlign="center";
		fcntxt.font="50px sanssherif bold";
		alert("GAME OVER !! Your Score is " +scr,400,300);
		document.location.reload();
	}
}

function goLeft()
{
	posX-=15;
	tt.clearRect(0,0,800,80);
	tt.drawImage(tank1,posX,0);
}

function goRight()
{
	posX+=15;
	tt.clearRect(0,0,800,80);
	tt.drawImage(tank1,posX,0);
}

function fire()
{
	while(1){
				fcntxt.strokeStyle = "red";
				fcntxt.lineWidth = 2;
				fcntxt.beginPath();
				fcntxt.moveTo(posX+14,posY-=5);
				fcntxt.lineTo(posX+14,posY-=10);
				fcntxt.stroke();
				if(posY<0)
					{
						tt.clearRect(0,0,800,80);
						tt.drawImage(tank1,posX,0);
						setTimeout(function(){
						fcntxt.clearRect(posX+13,0,3,550);
						posY=495;},20);
						tt.clearRect(0,0,800,80);
						tt.drawImage(tank1,posX,0);
						return;
					}
					if(b_posX<=posX+15 && posX+15<=b_posX+40)
						{
							fcntxt.drawImage(blast,b_posX,b_posY);
							b_posX=1;
							fired = true;
							setTimeout(function(){fcntxt.clearRect(0,0,800,550);
											  },100);
						}
				
						
			}
		
}

function bombDisp()
{
	if(play == 1)
	{
		b_posX=Math.floor((Math.random()*600)+85);
		b_posY=Math.floor((Math.random()*300)+85);
		fcntxt.drawImage(bomb,b_posX,b_posY);
		setTimeout(function(){fcntxt.clearRect(0,0,800,600);
							bombDisp();},2000);
						
	}
}