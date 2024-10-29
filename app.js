let canvas = document.querySelector('canvas');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;


var ctx = canvas.getContext('2d');

var mouse = {
    x: undefined,
    y: undefined
}

var maxRadius = 30;
var minRadius = 2;

var colorArr = [
    "#BF0426", "#730220", "#014040", "#05A6A6", "#027368"
];

window.addEventListener("mousemove",
    function (event) {
        mouse.x = event.x;
        mouse.y = event.y;
        console.log(mouse);
    })

window.addEventListener("resize", function () {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
})

function Circle(x, y, dx, dy, radius) {
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.radius = radius;
    this.minRadius = minRadius;
    this.color = colorArr[Math.floor(Math.random() * colorArr.length)]

    this.draw = function () {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        // ctx.stroke();
        // ctx.strokeStyle = "black";
        ctx.fillStyle = this.color;
        ctx.fill();
    }

    this.update = function () {

        if (this.x + this.radius > innerWidth || this.x - this.radius < 0) {
            this.dx = -this.dx;
        }
        if (this.y + this.radius > innerHeight || this.y - this.radius < 0) {
            this.dy = -this.dy;
        }
        this.x += this.dx;
        this.y += this.dy;

        if (mouse.x - this.x < 50 && mouse.x - this.x > -50 && mouse.y - this.y < 50 && mouse.y - this.y > -50) {
            if (this.radius < maxRadius) {
                this.radius += 1;
            }
        } else if (this.radius > this.minRadius) {
            this.radius -= 1;
        }

        this.draw();

    }
}



var circleArr = []

for (var i = 0; i <= 800; i++) {
    var radius = Math.random() * 3 + 1;
    var x = Math.random() * (innerWidth - radius * 2) + radius;
    var y = Math.random() * (innerHeight - radius * 2) + radius;
    var dy = (Math.random() - 0.5) * 2;
    var dx = (Math.random() - 0.5) * 2;

    circleArr.push(new Circle(x, y, dx, dy, radius))
}

// var circle = new Circle(200, 200, 4, 4, 30);
console.log(circleArr);

function animate() {
    requestAnimationFrame(animate);
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Start from 0 and loop until less than circleArr.length
    for (var i = 0; i < circleArr.length; i++) {
        circleArr[i].update();
    }
}

animate();
