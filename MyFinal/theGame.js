let state = "instructions"; 
let ob3X = 0;

let targetob1X = 200;
let targetob2X = 200;
let targetob3X = 200;

let speed = 3;
let finalScore = 0;


function setup() {
    createCanvas(400, 500);
    ob1X = 0;
    ob2X = 0;
    ob3X = 0;
}

function draw() {
    background(40, 38, 48);

    drawFace();

    if (state === "instructions") {
        drawInstructions();
    } else if (state === "score") {
        drawScore();
    } else {
        drawGame();
    }
}


//instructions
function drawInstructions() {
    fill(255, 182, 193); 
    stroke(255, 105, 180); 
    strokeWeight(4);
    rect(50, 100, 300, 300, 20);

    noStroke();
    fill(50, 30, 50); // dark text
    textAlign(CENTER, CENTER);
    textSize(18);
    text(
        "INSTRUCTIONS:\n\n\nHelp the cat find his face!\n\nUse your space button!",
        width / 2,
        250
    );
}

// logic
function drawGame() {
    // ob1 MOVING
    if (state === 0) {
        ob1X += speed;
        if (ob1X > width) ob1X = -50; 
        drawob1(ob1X);
    }
    // ob2 MOVING
    else if (state === 1) {
        ob2X += speed;
        if (ob2X > width) ob2X = -50;
        drawob2(ob2X);
        drawob1(targetob1X);
    }
    // ob3 MOVING
    else if (state === 2) {
        ob3X += speed;
        if (ob3X > width) ob3X = -50;
        drawob1(targetob1X);
        drawob2(targetob2X);
        drawob3(ob3X);
    }
    // FINISHED
    else if (state === 3) {
        drawob1(targetob1X);
        drawob2(targetob2X);
        drawob3(targetob3X);
    }
}

// cat body n head
function drawFace() {
    fill(30);
    noStroke();
    // main head
    quad(80, 150, 320, 150, 330, 250, 70, 250);
    arc(200, 245, 260, 130, 0, PI);

    // ears
    triangle(80, 150, 110, 60, 170, 150);
    triangle(320, 150, 290, 60, 230, 150);

    // chest and tail
    ellipse(200, 450, 250, 300);
    stroke(30); 
    strokeWeight(20);  
    noFill();
    arc(330, 430, 40, 160, -PI/2, PI/2);
    strokeWeight(1);
}

// eyes
function drawob1(x) {
    fill(255, 255, 180);
    noStroke();
    arc(x, 200, 75, 55, 0, PI); // left eye
    fill(0);
    arc(x + 12, 200, 53, 38, 0, PI); // left pupil
    fill(255, 255, 180);
    arc(x + 100, 200, 75, 55, 0, PI); // right eye
    fill(0);
    arc(x + 112, 200, 53, 38, 0, PI); // right pupil
}

// nose and whiskers
function drawob2(x) {
    noStroke();
    fill(140, 70, 90);
    triangle(x, 240, x - 15, 260, x + 15, 260);
    stroke(180, 200, 210); 
    strokeWeight(3);
    // left whiskers
    line(x - 30, 247, x - 100, 237);
    line(x - 50, 255, x - 120, 255);
    line(x - 30, 263, x - 100, 273);
    // right whiskers
    line(x + 30, 247, x + 100, 237);
    line(x + 50, 255, x + 120, 255);
    line(x + 30, 263, x + 100, 273);
    noStroke();
}

// mouth
function drawob3(x) {
    stroke(140, 70, 90);
    strokeWeight(4);
    noFill();
    arc(x - 20, 280, 40, 30, 0, PI);
    arc(x + 20, 280, 40, 30, 0, PI);
    line(x, 260, x, 280);
    noStroke();
}

// keys
function keyPressed() {
    if (key === " ") {
        if (state === "instructions") {
            state = 0; // start game
        } else if (state === 0) {
            targetob1X = ob1X;
            state = 1;
        } else if (state === 1) {
            targetob2X = ob2X;
            state = 2;
        } else if (state === 2) {
            targetob3X = ob3X;
            state = 3;
            calculateScore();
        } else if (state === "score") {
            // Reset everything to start over
            ob1X = 0;
            ob2X = 0;
            ob3X = 0;
            targetob1X = 200;
            targetob2X = 200;
            targetob3X = 200;
            state = "instructions";
        }
    }
}



// score
function calculateScore() {
    let idealob1 = 140;
    let idealob2 = 200;
    let idealob3 = 200;

    function scoreForObject(target, ideal) {
        let d = abs(target - ideal);
        if (d <= 5) return 100;
        else if (d <= 10) return 95 + (100 - 95) * (10 - d) / 5;
        else if (d <= 15) return 90 + (95 - 90) * (15 - d) / 5;
        else if (d <= 20) return 80 + (90 - 80) * (20 - d) / 5;
        else return 0;
    }

    let ob1Score = scoreForObject(targetob1X, idealob1);
    let ob2Score = scoreForObject(targetob2X, idealob2);
    let ob3Score = scoreForObject(targetob3X, idealob3);

    finalScore = (ob1Score + ob2Score + ob3Score) / 3;
    state = "score";

}

function drawScore() {
    fill(255, 182, 193); 
    stroke(255, 105, 180); 
    strokeWeight(4);
    rect(50, 100, 300, 300, 20);

    noStroke();
    fill(50, 30, 50);
    textAlign(CENTER, CENTER);
    textSize(18);
    text(
        "You got a score of\n" + finalScore.toFixed(1) + "%\n\nPress SPACE to play again!",
        width / 2,
        250
    );
}
