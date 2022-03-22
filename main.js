//define variables
let gameArea = document.querySelector('.game-area');
let playerPaddle = document.querySelector('.player-paddle');
let computerPaddle = document.querySelector('.computer-paddle');
let ball = document.querySelector('.ball');

//Get coordinates from these elements
let playerPaddleCoord = playerPaddle.getBoundingClientRect();
let computerPaddleCoord = computerPaddle.getBoundingClientRect();
let ballCoord = ball.getBoundingClientRect();

//Ball X,Y positions and velocities .

let ballXPosition = 350;
let ballYPosition = 100;
let ballXVelocity = 1;
let ballYVelocity = 1;

//Player paddle Y position
let playerPaddleYPosition = 0;
let playerPaddleYVelocity = 1;

//Computer paddle Y position
let computerPaddleYPosition = 400;
let computerPaddleYVelocity = 3.15;

//reset ball and computer paddle positions
function resetBallPosition(){
  ballXPosition = 350;
  ballYPosition = 100;
  ballXVelocity = 1;
  ballYVelocity = 1;

  computerPaddleYPosition = 400;
  computerPaddleYVelocity = 3.15;
}

// Size of the game area (in px)
const GAME_AREA_WIDTH = 700;
const GAME_AREA_HEIGHT = 500;

//ball shape
ball.style.borderRadius = '10px';

// Size of the paddles (in px)
const PADDLE_HEIGHT = 100;
const PADDLE_WIDTH = 20;

// Size of the ball (in px)
const BALL_SIZE = 20;


// User input to move the user paddle
document.addEventListener('keydown', (e) => {
  if (e.code == 'KeyW'){
    if(playerPaddleYPosition >= 10){
      playerPaddleYPosition -= 10;
    }
  }else if (e.code == 'KeyS'){
    if((playerPaddleYPosition + PADDLE_HEIGHT) <= GAME_AREA_HEIGHT){
      playerPaddleYPosition += 10;
    }
  }  

  //maintain player paddle within the game area
  if((playerPaddleYPosition + PADDLE_HEIGHT) > GAME_AREA_HEIGHT || playerPaddleYPosition < 0 ){
  }else{
    playerPaddle.style.top = `${playerPaddleYPosition}px`;
  }
  playerPaddleCoord = playerPaddle.getBoundingClientRect();
});

//ball movement
//Function to move and bounce ball
function moveBall() {
  //add moviments to the ball
  ballXPosition += ballXVelocity;
  ball.style.left = `${ballXPosition}px`;

  ballYPosition += ballYVelocity;
  ball.style.top = `${ballYPosition}px`;

  ballCoord = ball.getBoundingClientRect();

  //Reset the ball to its original position
  if((ballXPosition + BALL_SIZE)  > GAME_AREA_WIDTH){
    resetBallPosition();
  }else if(ballXPosition  < 0){
    resetBallPosition();
  }
  if((ballYPosition + BALL_SIZE) > GAME_AREA_HEIGHT || ballYPosition  < 0){
    ballYVelocity *= -1;
  }
  
  //Bouncing ball off paddle
  if(ballCoord.left <= playerPaddleCoord.right &&
    ballCoord.top >= playerPaddleCoord.top &&
    ballCoord.bottom <= playerPaddleCoord.bottom){
      ballXVelocity *= -1;
      ballXVelocity += 0.5;
    }

  if(ballCoord.right >= computerPaddleCoord.left &&
    ballCoord.top >= computerPaddleCoord.top &&
    ballCoord.bottom <= computerPaddleCoord.bottom){
      ballXVelocity *= -1;
      ballXVelocity -= 0.5;
    } 
}
setInterval(moveBall, 10);


//Paddle movements
function comPaddle() {
    // when the ball hits the center of the computer paddle, bouce it back
    if(ballYPosition > (computerPaddleYPosition + (PADDLE_HEIGHT /2))){
      if((computerPaddleYPosition + PADDLE_HEIGHT) <= GAME_AREA_HEIGHT){
        computerPaddleYPosition += computerPaddleYVelocity;
      }
    }else if(ballYPosition < (computerPaddleYPosition + (PADDLE_HEIGHT /2))){
      if(computerPaddleYPosition >= 0){
        computerPaddleYPosition -= computerPaddleYVelocity;
      }
    }

    // Apply the y-position 
    computerPaddle.style.top = `${computerPaddleYPosition}px`;
    computerPaddleCoord = computerPaddle.getBoundingClientRect();
}
// Call the update() function every 35ms
setInterval(comPaddle,35);



