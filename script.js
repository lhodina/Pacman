
var world = [
    [2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2],
    [2, 0, 2, 1, 1, 1, 1, 1, 2, 1, 1, 1, 2, 7, 1, 8, 2, 3, 2, 1, 1, 1, 8, 2],
    [2, 1, 2, 1, 2, 2, 2, 1, 1, 1, 2, 1, 1, 2, 1, 2, 2, 1, 2, 1, 2, 2, 1, 2],
    [2, 1, 2, 1, 1, 3, 2, 1, 2, 2, 2, 2, 1, 2, 1, 1, 2, 1, 1, 1, 2, 1, 1, 2],
    [2, 1, 2, 2, 2, 1, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 6, 1, 2, 2, 2, 1, 2, 2],
    [2, 1, 1, 1, 1, 1, 2, 2, 2, 2, 2, 1, 1, 2, 1, 2, 1, 1, 1, 1, 2, 1, 1, 2],
    [2, 1, 2, 2, 2, 1, 1, 4, 1, 1, 2, 1, 2, 2, 1, 2, 2, 1, 2, 2, 2, 2, 1, 2],
    [2, 1, 1, 2, 1, 1, 2, 1, 2, 1, 1, 1, 3, 2, 1, 1, 2, 1, 1, 1, 1, 2, 1, 2],
    [2, 1, 2, 2, 2, 1, 2, 1, 2, 2, 2, 2, 1, 2, 2, 1, 2, 5, 2, 2, 2, 2, 1, 2],
    [2, 1, 1, 1, 1, 1, 2, 8, 2, 8, 1, 1, 1, 1, 1, 1, 2, 1, 1, 1, 1, 1, 8, 2],
    [2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2]
];

var score = 0;

var pacmanEl = document.getElementById('pacman');


var pacman = {
    x: 1,
    y: 1
}

var ghostIDs = [4, 5, 6, 7];
var ghostNames = ["dwight", "jim", "pam", "angela"];
var ghosts = [
    {
        id: 4,
        name: "dwight",
        location: {
            x: 0,
            y: 0
        }
    },
    {
        id: 5,
        name: "jim",
        location: {
            x: 0,
            y: 0
        }
    },
    {
        id: 6,
        name: "pam",
        location: {
            x: 0,
            y: 0
        }
    },
    {
        id: 7,
        name: "angela",
        location: {
            x: 0,
            y: 0
        }
    },
];


// Load audio
var songPlayed = false;
var song = new Audio("./sound_effects/theme_song.mp3");
var coinSound = new Audio("./sound_effects/coin.mp3");
var cherriesSound = new Audio("./sound_effects/cherries.mp3");
var deathSound = new Audio("./sound_effects/death.mp3");
var gameOverSound = new Audio("./sound_effects/game_over.mp3");

var activeGame = false;
console.log("activeGame on load: ", activeGame);

// Render level
function displayWorld() {
    var output = '';
    for (var i=0; i < world.length; i++) {
        output += "\n<div class='row'>\n";
        for (var j=0; j < world[i].length; j++) {
            if (world[i][j] == 2) {
                output += "<div class='brick'></div>";
            } else if (world[i][j] == 1) {
                output += "<div class='coin'></div>";
            } else if (world[i][j] == 0) {
                output += "<div class='empty'></div>";
            } else if (world[i][j] == 3) {
                output += "<div class='cherries'></div>";
            } else if (world[i][j] == 4) {
                output += "<div id='dwight'></div>";
                ghosts[0].location.y = i;
                ghosts[0].location.x = j;
            } else if (world[i][j] == 5) {
                output += "<div class='ghost' id='jim'></div>";
                ghosts[1].location.y = i;
                ghosts[1].location.x = j;
            } else if (world[i][j] == 6) {
                output += "<div id='pam'></div>";
                ghosts[2].location.y = i;
                ghosts[2].location.x = j;
            }
            else if (world[i][j] == 7) {
                output += "<div id='angela'></div>";
                ghosts[3].location.y = i;
                ghosts[3].location.x = j;
            } else if (world[i][j] == 8) {
                output += "<div class='mega-coin'></div>"
            }
        }
        output += "\n</div>"
    }
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


function gameOver() {
    activeGame = false;
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

// Move Pac-Man
document.onkeydown = function(e) {
    if (activeGame === false) {
        song.play();
        activeGame = true;
        setInterval(ghostMove, 150);
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
        pacmanEl.style.transform = "rotate(-90deg)";
    } else if (e.keyCode == 40 && world[pacman.y + 1][pacman.x] !== 2) {
        pacman.y++;
        pacmanEl.style.transform = "rotate(90deg)";
    }

    if(world[pacman.y][pacman.x] == 1 || world[pacman.y][pacman.x] == 8) {
        coinSound.load();
        coinSound.play();
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

    if (ghostIDs.includes(world[pacman.y][pacman.x])) {
        song.pause();
        deathSound.play();

        pacmanEl.style.backgroundImage = "url('./images/Packer_Left_1.png')";
        pacmanEl.style.transform = "rotate(0deg)";
        displayScore();
        displayWorld();
        gameOver();
    }

    displayPacman();
}

function ghostMove() {
    var directions = ["up", "down", "left", "right"];
    var direction = directions[Math.floor(Math.random() * directions.length)];
    var randomGhost = ghosts[Math.floor(Math.random() * ghosts.length)];
    var collisions = [2, 3, 4, 5, 6, 7];
    if (direction === "up" && !collisions.includes(world[randomGhost.location.y - 1][randomGhost.location.x])) {
        world[randomGhost.location.y][randomGhost.location.x] = 1;
        randomGhost.location.y--;
        world[randomGhost.location.y][randomGhost.location.x] = randomGhost.id;
    } else if (direction === "right" && !collisions.includes(world[randomGhost.location.y][randomGhost.location.x + 1])) {
        world[randomGhost.location.y][randomGhost.location.x] = 1;
        randomGhost.location.x = randomGhost.location.x + 1;
        world[randomGhost.location.y][randomGhost.location.x] = randomGhost.id;
    } else if (direction === "down"  && !collisions.includes(world[randomGhost.location.y + 1][randomGhost.location.x])) {
        world[randomGhost.location.y][randomGhost.location.x] = 1;
        randomGhost.location.y = randomGhost.location.y + 1;
        world[randomGhost.location.y][randomGhost.location.x] = randomGhost.id;
    } else if (direction === "left"  && !collisions.includes(world[randomGhost.location.y][randomGhost.location.x - 1])) {
        world[randomGhost.location.y][randomGhost.location.x] = 1;
        randomGhost.location.x = randomGhost.location.x - 1;
        world[randomGhost.location.y][randomGhost.location.x] = randomGhost.id;
    }

    displayWorld();

    if (world[pacman.y][pacman.x] === world[randomGhost.location.y][randomGhost.location.x]) {
        song.pause();
        deathSound.play();
        pacmanEl.style.backgroundImage = "url('./images/Packer_Left_1.png')";
        pacmanEl.style.transform = "rotate(0deg)";
        displayScore();
        displayWorld();
        gameOver();
        world = 0;
    }
}
