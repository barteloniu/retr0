var ctx = document.getElementById("canvas").getContext("2d");
var keys = [];
var player = {
  img: new Image(),
  x: 0,
  w: 0
};
var enemy ={
  img: new Image,
  w: 0
};
var enemys = [];

var bullet ={
  img: new Image,
  w: 0
};
var bullets = [];

if(window.DeviceOrientationEvent){
  window.addEventListener("deviceorientation", function (e) {
    player.x += Math.round(e.gamma) * 5;
  });
}

window.addEventListener("keydown", function(key){
  keys[key.keyCode] = true;
}, false);
window.addEventListener("keyup", function(key){
  delete keys[key.keyCode];
}, false);

player.img.src = "player.png";
enemy.img.src = "enemy.png";
bullet.img.src = "bullet.png";
bullet.img.onload = function () {
  setInterval(function () {
    update();
    render();
  }, 1000/60);
  setInterval(function () {
   enemys.push({x: Math.random() * 10000, y: 0});
  }, 3000);
  setInterval(function () {
   bullets.push({x: player.x, y: 10000});
  }, 300);
};

function update() {
  ctx.canvas.width = window.innerWidth - 4;
  ctx.canvas.height = window.innerHeight - 4;
  player.w = ctx.canvas.width / 10;
  enemy.w = ctx.canvas.width / 10;
  bullet.w = ctx.canvas.width / 40;
  if(keys[65]) player.x-= 50;
  if(keys[68]) player.x+= 50;
  if(player.x < 0) player.x = 0;
  if(player.x > 10000) player.x = 10000;
}

function render() {
  console.log(player.x);
  enemys.forEach(function (i, index) {
    ctx.drawImage(enemy.img, (ctx.canvas.width - enemy.w) * i.x / 10000, (ctx.canvas.height + enemy.w) * i.y / 10000 - enemy.w, enemy.w, enemy.w);
    i.y+= 10;
    if (i.y == 10000) delete enemys[index];
  });
  console.log(keys.length);
  bullets.forEach(function (i, index) {
    ctx.drawImage(bullet.img, (ctx.canvas.width - player.w) * i.x / 10000 + player.w / 2 - bullet.w / 2, (ctx.canvas.height - bullet.w) * i.y / 10000 - player.w, bullet.w, bullet.w);
    i.y-= 100;
    if (i.y == 10000) delete bullets[index];
  });
  ctx.drawImage(player.img, (ctx.canvas.width - player.w) * player.x / 10000, ctx.canvas.height - player.w * 2, player.w, player.w * 2);
}
