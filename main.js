// 盤面
const canvas = document.createElement("canvas");
const ctx = canvas.getContext('2d');

canvas.width = 400;
canvas.height = 400;
canvas.setAttribute('style','display:block;margin:auto;background-color:rgb(172, 206, 94)')
document.body.appendChild(canvas);
const cell = 20;
const area = canvas.width / cell;

// 蛇　
const snake = {
  x: null,
  y: null,
  dx: 1,
  dy: 0,
  tail: null,

  update: function() {
    this.body.push({x: this.x, y: this.y});
    this.x += this.dx;
    this.y += this.dy;

    ctx.fillStyle = 'rgb(91, 127, 255)';
    this.body.forEach(obj => {
      ctx.fillRect(obj.x*cell, obj.y*cell, cell-2, cell-2);
      if(this.x === obj.x && this.y === obj.y) init();
    })
    if(this.body.length > this.tail) this.body.shift();
  }
}

// アイテム
const item = {
  x: null,
  y: null,

  update: function(){
    ctx.fillStyle = 'red';
    ctx.fillRect(this.x*cell, this.y*cell, cell, cell);
  }
}

// 初期値
const init = ()=> {
  snake.x = area / 2;
  snake.y = area / 2;
  snake.tail = 4;
  snake.body = [];

  item.x = Math.floor(Math.random() * area);
  item.y = Math.floor(Math.random() * area);
}

// ループ処理
const loop = ()=> {
  ctx.clearRect(0,0,canvas.width,canvas.height);
  snake.update()
  item.update();

  if(snake.x < 0)      snake.x = area-1;
  if(snake.y < 0)      snake.y = arae-1;
  if(snake.x > area-1)   snake.x = 0;
  if(snake.y > area-1)   snake.y = 0;

  if(snake.x === item.x && snake.y === item.y){
    snake.tail++;
    item.x = Math.floor(Math.random() * area);
    item.y = Math.floor(Math.random() * area);
  }
}

// ゲーム環境
init();
setInterval(loop, 1000/12)
document.addEventListener('keydown', e => {
  switch(e.key) {
    case 'ArrowLeft':
      snake.dx = -1;snake.dy = 0;
      break;
    case 'ArrowRight':
      snake.dx = +1;snake.dy = 0;
      break;
    case 'ArrowUp':
      snake.dx = 0;snake.dy = -1;
      break;
    case 'ArrowDown':
      snake.dx = 0;snake.dy = +1;
      break;
  }
});

// ブロック当たり判定
// 外枠
// セルごとに濃薄