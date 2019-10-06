/*
GAME RULES:
- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game
*/

document.querySelector('.dice').style.display = 'none';


document.querySelector('#score-0').textContent = '0';
document.querySelector('#score-1').textContent = '0';
document.querySelector('#current-0').textContent = '0';
document.querySelector('#current-1').textContent = '0';



var scores, roundScore, activePlayer;

score = [0, 0];
roundScore = 0;
activePlayer = 0;


document.querySelector('.btn-roll').addEventListener('click', function(){

	//Randmom number
	var dice = dice = Math.floor(Math.random() * 6) + 1;

	//Display the results
	var diceDOM = document.querySelector('.dice');
	diceDOM.style.display = 'block';
	diceDOM.src = 'dice-' + dice + '.png';

	//update the round score if the rolled number was NOT 1
	if(dice !== 1 ){
		roundScore += dice;
		document.querySelector('#current-' + activePlayer).textContent = roundScore;
	}else{
		nextPlayer();

		diceDOM.style.display = 'none';
	}
});	

document.querySelector('.btn-hold').addEventListener('click', function(){
	//Add current score to GLOBAL score
	score[activePlayer] += roundScore;

	//update the UI
	document.querySelector('#score-' + activePlayer).textContent = score[activePlayer];

	//check if player won the game
	if(score[activePlayer] >= 20){
		document.querySelector('#name-' + activePlayer).textContent = 'winner';
		document.querySelector('.dice').style.display = 'none';
		document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
		document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
	}else{
		//next player
		nextPlayer();
	}

})

function nextPlayer(){

	roundScore = 0;

	activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;

	document.querySelector('#current-0').textContent = '0';
	document.querySelector('#current-1').textContent = '0';

	document.querySelector(".player-0-panel").classList.toggle('active');
	document.querySelector(".player-1-panel").classList.toggle('active');

}

//document.querySelector('#current-0').textContent = dice;
