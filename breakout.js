// Canvas
var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
var bg = new Image();
bg.onload = function() {
    ctx.drawImage(bg,0,0);
}

// Ball
var ballRadius = 10
var x = canvas.width/2;
var y = canvas.height-16-16-ballRadius;
var dx = 2;
var dy = -2;

// Paddle
var paddleHeight = 16;
var paddleWidth = 75;
var paddleX = (canvas.width-paddleWidth) / 2;

// Misc
var rightPressed = false;
var leftPressed = false;

// Bricks
var brickRowCount = 6;
var brickColumnCount = 4;

var brickPadding = 10;
var brickOffsetTop = 100;
var brickOffsetLeft = 10;
var brickWidth = (canvas.width - 2 * brickOffsetLeft - (brickColumnCount - 1) * brickPadding) / brickColumnCount;
var brickHeight = 20;
var bricks = [];
for(var c=0; c<brickColumnCount; c++) {
    bricks[c] = [];
    for(var r=0; r<brickRowCount; r++) {
        bricks[c][r] = { x: 0, y: 0, status: 1 };
    }
}

// Score
var score = 0;

// Lives
var lives = 3;

document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);
document.addEventListener("mousemove", mouseMoveHandler, false);

function mouseMoveHandler(e) {
    var relativeX = e.clientX - canvas.offsetLeft;
    if(relativeX > 0 && relativeX < canvas.width) {
        paddleX = relativeX - paddleWidth/2;
    }
}

function keyDownHandler(e) {
    if(e.key == "Right" || e.key == "ArrowRight") {
        rightPressed = true;
    }
    else if(e.key == "Left" || e.key == "ArrowLeft") {
        leftPressed = true;
    }
    else if(e.key == "l") {
        score += 4;
    }
    else if(e.key == "o") {
        ballRadius -= 5;
    }
    else if(e.key == "p") {
        ballRadius += 5;
    }
}

function keyUpHandler(e) {
    if(e.key == "Right" || e.key == "ArrowRight") {
        rightPressed = false;
    }
    else if(e.key == "Left" || e.key == "ArrowLeft") {
        leftPressed = false;
    }
}

function collisionDetection() {
    for(var c=0; c<brickColumnCount; c++) {
        for(var r=0; r<brickRowCount; r++) {
            var b = bricks[c][r];
            if(b.status == 1) {
                if(x > b.x && x < b.x+brickWidth && y > b.y && y < b.y+brickHeight) {
                    dy = -dy;
                    b.status = 0;
                    score++;
                }
            }
        }
    }
}

function drawScore() {
    ctx.font = "32px Barlow";
    ctx.fillStyle = "white";
    ctx.fillText("Score: " + score, 10, 32);
}

function drawLives() {
    ctx.font = "32px Barlow";
    ctx.fillStyle = "white";
    ctx.fillText("Lives: "+lives, canvas.width - 116, 32);
}

function drawBall() {
    ctx.beginPath();
    ctx.arc(x, y, ballRadius, 0, Math.PI*2);
    ctx.fillStyle = "#f6511d";
    ctx.fill();
    ctx.closePath(); 
}

function drawPaddle() {
    ctx.beginPath();
    ctx.rect(paddleX, canvas.height-paddleHeight-16, paddleWidth, paddleHeight);
    ctx.fillStyle = "#ffe226";
    ctx.fill();
    ctx.closePath();
}

function drawBricks() {
    for(var c=0; c<brickColumnCount; c++) {
        for(var r=0; r<brickRowCount; r++) {
            if(bricks[c][r].status == 1) {
                var brickX = (c*(brickWidth+brickPadding))+brickOffsetLeft;
                var brickY = (r*(brickHeight+brickPadding))+brickOffsetTop;
                // var brickColorRed = 128 + r * 16;
                // var brickColorGreen = 128 + r * 16;
                // var brickColorBlue = 128 + r * 16;
                // var brickColor = "rgb(" + brickColorRed + ", " + brickColorGreen + ", " + brickColorBlue + ")";
                var brickColor = "#EDD983";
                bricks[c][r].x = brickX;
                bricks[c][r].y = brickY;
                ctx.beginPath();
                ctx.rect(brickX, brickY, brickWidth, brickHeight);
                ctx.fillStyle = brickColor;
                ctx.fill();
                ctx.closePath();
            }
        }
    }
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawBricks();
    drawBall();
    drawPaddle();
    drawScore();
    drawLives();
    collisionDetection();

    if(score >= brickRowCount*brickColumnCount) {
        alert("YOU WON!");
        document.location.reload();
    }

    if(x + dx > canvas.width-ballRadius || x + dx < ballRadius) {
        dx = -dx;
    }
    if(y + dy < ballRadius) {
        dy = -dy;
    } else if(y + dy > canvas.height-ballRadius-paddleHeight-16) {
        if(x > paddleX && x < paddleX + paddleWidth) {
            dy = -dy;
        }
        else {
            lives--;
            if(!lives) {
                alert("GAME OVER");
                document.location.reload();
            } else {
                x = canvas.width/2;
                y = canvas.height-16-paddleHeight-ballRadius;
                dx = 2;
                dy = -2;
                paddleX = (canvas.width-paddleWidth)/2;
            }
        }
    }
    
    if(rightPressed) {
        paddleX += 7;
        if (paddleX + paddleWidth > canvas.width){
            paddleX = canvas.width - paddleWidth;
        }
    }
    else if(leftPressed) {
        paddleX -= 7;
        if (paddleX < 0){
            paddleX = 0;
        }
    }

    x += dx;
    y += dy;

    requestAnimationFrame(draw);
} 

draw();