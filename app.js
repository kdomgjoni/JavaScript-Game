/*
GAME RULES:
- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game
*/

/*
Challenge 1:
 - The player lose his entire score if he hit two 6 in a row. After that it is 
 the other player turn. 
*/

/*
Challenge 2:
 - Add an input field to the html where players can set the winning score, so that they can change
 the predefined score of 20. 
*/


var scores, roundScore, activePlayer, gamePlaying;


init();

var lastDice;


document.querySelector('.btn-roll').addEventListener('click', function(){

	if(gamePlaying){
		//Randmom number
		var dice = dice = Math.floor(Math.random() * 6) + 1;


		//Display the results
		var diceDOM = document.querySelector('.dice');
		diceDOM.style.display = 'block';
		diceDOM.src = 'dice-' + dice + '.png';

		//lose score if the player hits two 6 in a row
		if(dice === 6 && lastDice === 6){
			score[activePlayer] = 0;
			document.querySelector('#score-' + activePlayer).textContent = 0;
			diceDOM.style.display = 'none';
			nextPlayer();
		}
		//update the round score if the rolled number was NOT 1
		else if(dice !== 1){
			roundScore += dice;
			document.querySelector('#current-' + activePlayer).textContent = roundScore;
		}else{
			nextPlayer();

			diceDOM.style.display = 'none';
		}

		lastDice = dice;
	}
});	

document.querySelector('.btn-hold').addEventListener('click', function(){
	
	if(gamePlaying){
		//Add current score to GLOBAL score
		score[activePlayer] += roundScore;

		//update the UI
		document.querySelector('#score-' + activePlayer).textContent = score[activePlayer];

		var input_value = document.querySelector(".btn-input").value;
		var finalScore; 

		if(input_value){
			finalScore = input_value;
		}else{
			finalScore = 20;
		}
		console.log(finalScore);


		//check if player won the game
		if(score[activePlayer] >= finalScore){
			document.querySelector('#name-' + activePlayer).textContent = 'winner';
			document.querySelector('.dice').style.display = 'none';
			document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
			document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
			gamePlaying = false;
		}else{
			//next player
			nextPlayer();

		}
	}

});

document.querySelector('.btn-new').addEventListener('click', init);

function nextPlayer(){

	roundScore = 0;

	activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;

	document.querySelector('#current-0').textContent = '0';
	document.querySelector('#current-1').textContent = '0';

	document.querySelector(".player-0-panel").classList.toggle('active');
	document.querySelector(".player-1-panel").classList.toggle('active');

}

function init(){
	score = [0, 0];
	roundScore = 0;
	activePlayer = 0;
	gamePlaying = true;

	document.querySelector('.dice').style.display = 'none';

	document.querySelector('#score-0').textContent = '0';
	document.querySelector('#score-1').textContent = '0';
	document.querySelector('#current-0').textContent = '0';
	document.querySelector('#current-1').textContent = '0';
	document.querySelector('#name-0').textContent = 'player 1';
	document.querySelector('#name-1').textContent = 'player 2';

	document.querySelector('.player-0-panel').classList.remove('winner');
	document.querySelector('.player-1-panel').classList.remove('winner');
	document.querySelector('.player-0-panel').classList.remove('active');
	document.querySelector('.player-1-panel').classList.remove('active');
	document.querySelector('.player-0-panel').classList.add('active');

}

//document.querySelector('#current-0').textContent = dice;
