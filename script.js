
var world = [
    [2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2],
    [2, 0, 1, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 7, 1, 1, 1, 3, 1, 1, 1, 1, 1, 2],
    [2, 1, 1, 2, 1, 1, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2],
    [2, 1, 1, 2, 1, 3, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2],
    [2, 1, 1, 2, 1, 1, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 6, 1, 1, 1, 1, 1, 1, 2],
    [2, 1, 1, 2, 2, 1, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2],
    [2, 1, 1, 1, 1, 1, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2],
    [2, 1, 1, 1, 1, 1, 2, 1, 1, 1, 4, 1, 3, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2],
    [2, 1, 8, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 5, 1, 1, 1, 1, 1, 2],
    [2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2],
    [2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2]
];

var score = 0;

var pacmanEl = document.getElementById('pacman');


var pacman = {
    x: 1,
    y: 1
}

var ghosts = [4, 5, 6, 7, 8];

var songPlayed = false;
var song = new Audio("./sound_effects/theme_song.mp3");
var coinSound = new Audio("./sound_effects/coin.mp3");
var cherriesSound = new Audio("./sound_effects/cherries.mp3");
var deathSound = new Audio("./sound_effects/death.mp3");
var gameOverSound = new Audio("./sound_effects/game_over.mp3");

// console.log('world :', world);

function displayWorld() {
    var output = '';
    for (var i=0; i < world.length; i++) {
        output += "\n<div class='row'>\n";
        for (var j=0; j < world[i].length; j++) {
            if (world[i][j] == 2) {
                output += "<div class='brick'></div>";
            } else if (world[i][j] == 1) {
                output += "<div class='coin'></div>";
                coinSound.play();
            } else if (world[i][j] == 0) {
                output += "<div class='empty'></div>";
            } else if (world[i][j] == 3) {
                output += "<div class='cherries'></div>";
            } else if (world[i][j] == 4) {
                // var ghosts = ['dwight', 'jim', 'pam', 'jan', 'angela'];
                // var ghost = ghosts[Math.floor(Math.random() * ghosts.length)];
                output += "<div id='dwight'></div>";
            } else if (world[i][j] == 5) {
                output += "<div class='ghost' id='jim'></div>";
            } else if (world[i][j] == 6) {
                output += "<div id='pam'></div>";
            }
            else if (world[i][j] == 7) {
                output += "<div id='angela'></div>";
            }
            else if (world[i][j] == 8) {
                output += "<div id='jan'></div>";
            }
        }
        output += "\n</div>"
    }
    // console.log("output: ", output);
    var htmlWorld = document.getElementById("world");
    htmlWorld.innerHTML = output;
}

displayWorld();


function displayPacman() {
    pacmanEl.style.top = pacman.y * 50 + "px";
    pacmanEl.style.left = pacman.x * 50 + "px";
}

displayPacman();


function displayScore() {
    document.getElementById("score").innerHTML = score;
}

displayScore();

document.onkeydown = function(e) {
    if (songPlayed === false) {
        // document.getElementById("player").play();
        song.play();
        songPlayed = true;
    }

    pacmanEl.style.backgroundImage = "url('./images/packer-smile.gif')";
    if (e.keyCode == 37 && world[pacman.y][pacman.x - 1] !== 2 ) {
        pacman.x--;
        pacmanEl.style.backgroundImage = "url('./images/Packer_Left_2.png')";
        pacmanEl.style.transform = "rotate(0deg)";
    } else if (e.keyCode == 39 && world[pacman.y][pacman.x + 1] !== 2) {
        pacman.x++;
        pacmanEl.style.transform = "rotate(0deg)";
    } else if (e.keyCode == 38  && world[pacman.y - 1][pacman.x] !== 2) {
        pacman.y--;
        console.log("pacmanEl.style.backgroundImage:", pacmanEl.style.backgroundImage);
        pacmanEl.style.transform = "rotate(-90deg)";
    } else if (e.keyCode == 40 && world[pacman.y + 1][pacman.x] !== 2) {
        pacman.y++;
        console.log("pacmanEl.style.backgroundImage:", pacmanEl.style.backgroundImage)
        pacmanEl.style.transform = "rotate(90deg)";
    }

    console.log("pacman.x: ", pacman.x);
    console.log("pacman.y: ", pacman.y);

    if(world[pacman.y][pacman.x] == 1) {
        world[pacman.y][pacman.x] = 0;
        score += 500;
        displayWorld();
        displayScore();
    }

    if(world[pacman.y][pacman.x] == 3) {
        cherriesSound.play();
        world[pacman.y][pacman.x] = 0;
        score += 2000;
        displayWorld();
        displayScore();
    }

    function gameOver() {
        document.getElementById("game-over").hidden = false;
        var htmlWorld = document.getElementById("world");
        htmlWorld.innerHTML = "<h1>GAME OVER</h1>";
        htmlWorld.innerHTML += "<h2>What has two thumbs and hates Todd Packer?</h2>";
        var deadPac = document.getElementById("pacman");
        deadPac.style.transform = "rotate(360deg) scale(4)";
        deadPac.style.transition = "1s";
        gameOverSound.play();
        setTimeout(function() {
            document.getElementById("this-guy").hidden = false;
        }, 3000);
    }

    if (ghosts.includes(world[pacman.y][pacman.x])) {
        song.pause();
        deathSound.play();

        pacmanEl.style.backgroundImage = "url('./images/Packer_Left_1.png')";
        console.log('pacmanEl.style.backgroundImage :', pacmanEl.style.backgroundImage);
        pacmanEl.style.transform = "rotate(0deg)";
        displayScore();
        displayWorld();
        gameOver();
    }

    displayPacman();
}


function ghostMoves() {
    
}
