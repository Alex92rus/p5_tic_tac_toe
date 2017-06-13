var board = {
 SIDE: 100,
 ticks: [
  [0, 0, 0],
  [0, 0, 0],
  [0, 0, 0]
 ],
 PLAYERS: [1, 2],
 next: 0,
 winner: 0,
 text: {
   FONT_SIZES: [10, 20, 30]
 },
 scores: [0, 0, 0]
}

function setup() {
  createCanvas(301,330);
}

function countOccurrences(numTwoDimArray, number) {
  var count = 0;
  for (var i = 0; i < numTwoDimArray.length; i++ ) {
    for (var j = 0; j < numTwoDimArray[0].length; j++ ) {
      if (numTwoDimArray[i][j] == 0) {
        count ++;
      }
    }
  }
  return count;
}

function displayScore(player, location) {
    var scoreText = "Score: " + board.scores[player];
    textAlign(LEFT);
    textSize(board.text.FONT_SIZES[1]);
    fill(255);
    if (player == 1) {
      text(scoreText, location[0], location[1]);
    } if (player == 2) {
      text(scoreText, location[0] - textWidth(scoreText) , location[1]);
    }
}

function draw() {
  background(50);
  displayScore(1, [1, 325]);
  displayScore(2, [295, 325]);
  for (var i = 0; i < 3; i ++) {
    for (var j = 0; j < 3; j ++) {
      fill(255, 255, 255)
      rect(i * board.SIDE,j * board.SIDE, board.SIDE, board.SIDE);
      if (board.ticks[j][i] == 1) {
        fill(255, 0, 0);
        push();
        translate(i * board.SIDE + 20,j * board.SIDE + 5);
        rotate(0.785398163);
        rect(0, 0, board.SIDE, 20);
        pop();
        push();
        translate((i + 1) * board.SIDE - 10,j * board.SIDE + 20);
        rotate(3 * 0.785398163)
        rect(0, 0, board.SIDE, 20);
        pop();
      } else if (board.ticks[j][i] == 2) {
        fill(0, 255, 0);
        push();
        translate(i * board.SIDE + board.SIDE / 2,j * board.SIDE + board.SIDE / 2)
        ellipse(0, 0, board.SIDE - 20, board.SIDE - 20 );
        fill(255, 255, 255);
        ellipse(0, 0, board.SIDE - 30, board.SIDE - 30 );
        pop();
      } else {
        fill(255);
      }
    }
  }
  console.log('Insidd33t!!!!!!!!!!');
  if (countOccurrences(board.ticks, 0) == 0 || board.winner != 0) {
    var gameDecision = "Player " + board.winner + " won!!!"
    center = board.SIDE * 1.5;
    console.log(center);
    console.log("translate that to: ");
    textAlign(CENTER);
    textSize(board.text.FONT_SIZES[1]);
    var messageWidth = textWidth(gameDecision);
    push();
    translate(center - (messageWidth / 2 + 5), center - board.text.FONT_SIZES[1]);
    fill(255, 0, 0);
    rect(0, 0, messageWidth + 10, 24);
    pop();
    fill(0, 0, 0)
    text(gameDecision, center, center);
    //resetBoard();
    console.log('Insiddee!!!!!!!!!!');
  }
}

function findSquare(X, Y) {
  var square = [];
  var row = Y / 100 >> 0;
  var column = X / 100 >> 0;
  square.push(row);
  square.push(column);
  return square;
}

function checkWinner() {
  var won = 0;
  for (var i = 0; i < 3; i ++) {
    if ((board.ticks[i][0] == board.ticks[i][1]) && (board.ticks[i][1] == board.ticks[i][2]) && board.ticks[i][2] != 0) {
      won = board.ticks[i][0];
    }
    if ((board.ticks[0][i] == board.ticks[1][i]) && (board.ticks[1][i] == board.ticks[2][i]) && board.ticks[2][i] != 0) {
      won = board.ticks[0][i];
    }
  }
  if ((board.ticks[0][0] == board.ticks[1][1]) && (board.ticks[1][1] == board.ticks[2][2]) && board.ticks[2][2] != 0 ||
    (board.ticks[0][2] == board.ticks[1][1]) && (board.ticks[1][1] == board.ticks[2][0]) && board.ticks[2][0] != 0) {
    won = board.ticks[1][1];
  }
  board.scores[won] += 1;
  return won;
}

function resetGame() {
   for (var i = 0; i < 3; i ++) {
      board.ticks[i].fill(0);
   }
   board.winner = 0;
}

function mousePressed() {
  if (board.winner != 0 || countOccurrences(board.ticks, 0) == 0) {
    resetGame();
    console.log(board.ticks[0][0]);
  } else {
    var square = findSquare(mouseX, mouseY);
    if (board.ticks[square[0]][square[1]] == 0) {
      board.ticks[square[0]][square[1]] = board.PLAYERS[board.next];
      board.next = (board.next + 1) % board.PLAYERS.length;
    }
  }
  board.winner = checkWinner();
}
