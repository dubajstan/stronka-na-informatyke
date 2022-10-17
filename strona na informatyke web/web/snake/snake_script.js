var canvas = document.getElementById('game');
var context = canvas.getContext('2d');
var scoreTable = document.getElementById('score');
var score = 0;

var kratka = 20;
var count = 0;

var snake  = {
    x: 160,
    y: 160,

    dx: kratka,//szybkosc weza, jedna kratka na klatke
    dy: 0,

    cells: [],//komorki

    maxCells: 4,//dlugosc weza maksymalna
};

var apple = {
    x: 320,
    y: 320,
};

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min + 1;
}

function resetApple() {
    apple.x = getRandomInt(0,25) * kratka;
    apple.y = getRandomInt(0,25) * kratka;
    for(var i = 1; i < snake.cells.length; i++) {
        if(snake.cells[i].x === apple.x &&  snake.cells[i].y === apple.y){
            apple.x = getRandomInt(0,25) * kratka;
            apple.y = getRandomInt(0,25) * kratka;
            i = 0;
         }
     }
}
function setScore(x) {
    scoreTable.innerHTML = x;
}

//gra
function loop() {
    requestAnimationFrame(loop);

    if(++count < 4) {
        return;
    }

    count = 0;
    context.clearRect(0,0,canvas.clientWidth,canvas.height);

    snake.x += snake.dx;
    snake.y += snake.dy;

    if(snake.x < 0) {
        snake.x = canvas.width - kratka;
    }else if(snake.x >= canvas.width) {
        snake.x = 0;
    }

    if(snake.y < 0) {
        snake.y = canvas.height - kratka;
    }else if(snake.y >= canvas.height) {
        snake.y = 0;
    }
    //poczatek tablicy cells
    snake.cells.unshift({x: snake.x, y: snake.y});//??????

    if(snake.cells.length > snake.maxCells) {
        snake.cells.pop();
    }

    context.fillStyle = 'red';
    context.fillRect(apple.x, apple.y, kratka-1, kratka-1);

    context.fillStyle = 'green';
    snake.cells.forEach(function(cell, index) {
    context.fillRect(cell.x, cell.y, kratka-1, kratka-1);

        if(cell.x === apple.x && cell.y === apple.y) {//jablko zjedzone
            snake.maxCells++;
            score++;
            setScore(score);
            resetApple();
        }

        for(var i = index + 1; i < snake.cells.length; i++) {
            if(cell.x === snake.cells[i].x && cell.y === snake.cells[i].y) {
                snake.x = 280;
                snake.y = 280;
                snake.cells = [];
                snake.maxCells = 4;
                snake.dx = kratka;
                snake.dy = 0;
                
                apple.x = 320;
                apple.y = 320;

                setScore(0);
                score = 0;
            }
        }
    })
}

document.addEventListener('keydown', function(e) {

    if(e.which === 37 && snake.dx === 0) {
        snake.dx = -kratka;
        snake.dy = 0;
    }else if(e.which === 38 && snake.dy === 0) {
        snake.dx = 0;
        snake.dy = - kratka;
    }else if(e.which === 39 && snake.dx === 0) {
        snake.dx = kratka;
        snake.dy = 0;
    }else if(e.which === 40 && snake.dy === 0) {
        snake.dx = 0;
        snake.dy = kratka;
    }

})


requestAnimationFrame(loop);