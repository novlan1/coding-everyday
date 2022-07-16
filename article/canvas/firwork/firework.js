// 文章地址：[写一个烟花送给自己吧](https://juejin.cn/post/7120157333472165918)

const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
let canvasWidth = window.innerWidth;
let canvasHeight = window.innerHeight;
const fireworks = [];
const particles = [];

// canvas全屏
canvas.width = canvasWidth;
canvas.height = canvasHeight;

// 获取范围内的随机数
function randomRange(min, max) {
  return Math.random() * (max - min) + min;
}

// 获取hue
function getHue() {
  const hue = Math.random() * 360;
  const hueVariance = 200;
  return Math.floor(Math.random() * (hue + hueVariance - (hue - hueVariance))) + (hue - hueVariance);
}

class Particle {
  // 初始化时的x,y坐标
  constructor(x, y, hue) {
    this.x = x;
    this.y = y;

    // 粒子坐标集合
    this.coords = [
      [x, y],
      [x, y],
      [x, y],
    ];

    // 随机弧度
    this.angle = randomRange(0, Math.PI * 2);
    // 随机基本速度
    this.speed = randomRange(1, 10);

    // 摩擦系数、重力（减缓粒子速度、模拟抛物线下坠）
    this.friction = 0.95; // 百分比 不同材质的物体摩擦系数不同（有现成值）
    this.gravity = 1; // 作用于y轴加速度 模拟往下坠

    // 随机色调（基础色调-20和+20之间）
    this.hue = randomRange(hue - 20, hue + 20);
    // 随机亮度
    this.brightness = Math.floor(Math.random() * 21) + 50;
    // 初始透明度
    this.alpha = 1;
    // 随机的透明度衰变系数（透明度减淡）
    this.alphaDecay = randomRange(0.015, 0.03);
  }

  // 更新某个（索引）粒子属性
  update(index) {
    this.coords.pop();
    this.coords.unshift([this.x, this.y]);
    this.speed *= this.friction;

    this.x += Math.cos(this.angle) * this.speed;
    this.y += Math.sin(this.angle) * this.speed + this.gravity;

    // 透明度衰减
    this.alpha -= this.alphaDecay;
    // 当透明度小于最小衰减值 就把这个例子对象删除
    if (this.alpha < this.alphaDecay) {
      particles.splice(index, 1);
    }
  }

  // 绘制粒子（例子以line的方式）
  draw() {
    ctx.beginPath();
    // 从集合中最后一个项开始
    const [startX, startY] = this.coords[this.coords.length - 1];
    ctx.moveTo(startX, startY);
    ctx.lineTo(this.x, this.y);
    // hsla的颜色模式
    ctx.strokeStyle = `hsla(${this.hue}, 100%, ${this.brightness}%, ${this.alpha}`;
    ctx.lineWidth = 2;
    ctx.lineCap = 'round';
    ctx.stroke();
  }
}

class Firework {
  constructor(sx, sy, tx, ty) {
    // 当前坐标
    this.x = sx;
    this.y = sy;
    // 起始点坐标
    this.sx = sx;
    this.sy = sy;
    // 目标点坐标
    this.tx = tx;
    this.ty = ty;

    // 起始点到目标点的距离
    this.totalDistance = this.calcPointsDistance(sx, sy, tx, ty);
    // 用于判断是否走完路程
    this.distanceTraveled = 0;
    // 随机弧度
    this.angle = Math.atan2(ty - sy, tx - sx);
    // 向上空气的阻力，其实也是模拟重力
    this.friction = 0.98;
    // 随机速度
    this.speed = this.mockOriginalSpeed(sy - ty);
    // 透明度
    this.alpha = 1;
    // 透明度衰减度
    this.alphaDecay = randomRange(0.015, 0.03);
    // 随机hue
    this.hue = getHue();
    // 随机亮度
    this.brightness = randomRange(60, 70);
    // 烟花的轨迹坐标
    this.coords = [[this.x, this.y]];
  }

  calcPointsDistance(sx, sy, tx, ty) {
    return Math.sqrt(Math.pow(tx - sx, 2) + Math.pow(ty - sy, 2));
  }

  // 模拟初始速度
  mockOriginalSpeed(h) {
    return Math.floor(Math.sqrt(2 * this.friction * h));
  }

  update(index) {
    this.coords.pop();
    this.coords.unshift([this.x, this.y]);
    this.alpha -= this.alphaDecay;
    this.speed *= this.friction;
    const vx = Math.cos(this.angle) * this.speed;
    const vy = Math.sin(this.angle) * this.speed;

    // 计算出移动后的距离
    this.distanceTraveled = this.calcPointsDistance(this.sx, this.sy, this.x + vx, this.y + vy);

    if (this.distanceTraveled >= this.totalDistance) {
      for (let i = 0; i < 100; i++) {
        particles.push(new Particle(this.tx, this.ty, this.hue));
      }
      fireworks.splice(index, 1);
    } else {
      this.x += vx;
      this.y += vy;
    }
  }

  draw() {
    if (this.speed < 0) {
      return;
    }
    ctx.beginPath();
    const [startX, startY] = this.coords[this.coords.length - 1];
    ctx.moveTo(startX, startY);
    ctx.lineTo(this.x, this.y);
    ctx.lineCap = 'round';
    ctx.strokeStyle = `hsla(${this.hue}, 100%, ${this.brightness}%,${this.alpha})`; // 仅亮度会变化
    ctx.lineWidth = 2;
    ctx.stroke();
  }
}

function renderCanvas() {
  ctx.globalCompositeOperation = 'destination-out'; // 现有内容保持在新图形不重叠的地方
  ctx.fillStyle = 'rgba(0, 0, 0, 0.3)';
  ctx.fillRect(0, 0, canvasWidth, canvasHeight);
  ctx.globalCompositeOperation = 'lighter';

  // 循环绘制烟花
  for (let i = 0; i < fireworks.length; i++) {
    fireworks[i].draw();
    fireworks[i].update(i);
  }

  // 循环绘制粒子
  for (let i = 0; i < particles.length; i++) {
    particles[i].draw();
    particles[i].update(i);
  }

  requestAnimationFrame(renderCanvas);
}

function mockFirework() {
  for (let i = 0; i < 8; i++) {
    fireworks.push(new Firework(
      canvasWidth / 2,
      canvasHeight,
      randomRange(0, canvasWidth),
      randomRange(0, canvasHeight * 0.7),
    ));
  }
}

let fireworkTimer = setInterval(() => {
  mockFirework();
}, 2000);

mockFirework();
renderCanvas();

// 处理定时器的问题
function handleVisibilityChange() {
  // tab 隐藏
  if (document.hidden) {
    clearInterval(fireworkTimer);
    fireworkTimer = 0;
    fireworks.length = 0;
  } else {
    fireworkTimer = setInterval(() => {
      mockFirework();
    }, 2000);
    mockFirework();
  }
}
function resizeCanvas() {
  canvasWidth = window.innerWidth;
  canvasHeight = window.innerHeight;
  canvas.width = canvasWidth;
  canvas.height = canvasHeight;
}

window.addEventListener('visibilitychange', handleVisibilityChange);
window.addEventListener('resize', resizeCanvas);
