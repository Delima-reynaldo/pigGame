'use strict';

const player0 = document.querySelector('.player--0');
const player1 = document.querySelector('.player--1');
const score0 = document.querySelector('#score--0');
const score1 = document.querySelector('#score--1');
const current0 = document.querySelector('#current--0');
const current1 = document.querySelector('#current--1');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

let playerScore0 = 0;
let playerScore1 = 0;
let currentScore = 0;
let activePlayer = 0;
let roll;
score0.textContent = 0;
score1.textContent = 0;

const switchPlayer = function () {
  document.querySelector(`#current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  if (player0.classList.contains('player--active')) {
    player0.classList.remove('player--active');
    player1.classList.add('player--active');
  } else if (player1.classList.contains('player--active')) {
    player1.classList.remove('player--active');
    player0.classList.add('player--active');
  }
};

btnRoll.addEventListener('click', function () {
  roll = Math.trunc(Math.random() * 6) + 1;
  document.querySelector('.dice').src = `dice-${roll}.png`;
  if (roll !== 1) {
    currentScore += roll;
    document.querySelector(`#current--${activePlayer}`).textContent =
      currentScore;
  } else {
    switchPlayer();
  }
});

btnHold.addEventListener('click', function () {
  if (player0.classList.contains('player--active')) {
    playerScore0 += currentScore;
    score0.textContent = playerScore0;
    if (playerScore0 >= 100) {
      player0.classList.add('player--winner');
      btnRoll.disabled = true;
      btnHold.disabled = true;
    } else {
      switchPlayer();
    }
  } else if (player1.classList.contains('player--active')) {
    playerScore1 += currentScore;
    score1.textContent = playerScore1;
    if (playerScore1 >= 100) {
      player1.classList.add('player--winner');
      btnRoll.disabled = true;
      btnHold.disabled = true;
    } else {
      switchPlayer();
    }
  }
});

document.querySelector('.btn--new').addEventListener('click', function () {
  btnRoll.disabled = false;
  btnHold.disabled = false;
  playerScore0 = 0;
  playerScore1 = 0;
  score0.textContent = 0;
  score1.textContent = 0;
  currentScore = 0;
  current0.textContent = 0;
  current1.textContent = 0;
  activePlayer = 0;
  player0.classList.remove('player--winner');
  player1.classList.remove('player--winner');
  player1.classList.remove('player--active');
  player0.classList.add('player--active');
});
