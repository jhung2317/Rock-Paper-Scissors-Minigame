const buttons = document.querySelectorAll(".btn");
const main = document.querySelector(".main");
const playerResult = document.querySelector('.player-result');
const computerResult = document.querySelector('.computer-result');
const endAlrt = document.querySelector("#end-alert");
const endDesc = document.querySelector("#end-desc");
const returnMainBtn = document.querySelector("#retry-btn");
const announceRound = document.getElementById('round-result');
const playerResultBorder = document.getElementById("result-player-box");
const computerResultBorder = document.getElementById("result-computer-box");

let userResult = 0;
let cpuResult = 0;

playerResult.textContent = userResult;
computerResult.textContent = cpuResult;

buttons.forEach(button => {
	button.addEventListener('click', playRound);
});

function playRound() {
	const playerSelection = this.id;
	const computerChoice = getComputerChoice()
	const winner = checkWinner();

	if (!winner) {
		 setTimeout(() => {compareResults(playerSelection, computerChoice);}, 1000);
	}
	if (winner) {
		endGame();
	}
}

function getComputerChoice() {
	const possibleChoice = ["rock", "paper", "scissor"];
	let randomNumber = Math.floor((Math.random() * 10) % 3);

	let computerChoice = possibleChoice[randomNumber];
	//Highlight computerChoice
	const cpuChoiceBtn = document.getElementById(`${computerChoice}`);
	setTimeout(() => {highlightBorder(cpuChoiceBtn, 'cpu');}, 500);
	return computerChoice;
}


function compareResults(playerSelection, computerSelection) {
	playerSelection = playerSelection.toLowerCase();
	computerSelection = computerSelection.toLowerCase();
	let resultMsg = undefined;

	if (playerSelection == computerSelection) {
	  resultMsg = `It's a draw. You chose ${playerSelection} and the computer also!`;
	} else if (
	  (playerSelection == "rock" && computerSelection == "scissor") ||
	  (playerSelection == "paper" && computerSelection == "rock") ||
	  (playerSelection == "scissor" && computerSelection == "paper")
	) {
	  resultMsg = `You win!! You chose ${playerSelection}, which beats the computer choice, ${computerSelection}.`;
	  highlightBorder(playerResultBorder, "playing");
	  ++userResult;
	} else {
	  resultMsg = `Computer wins!! You chose ${playerSelection}, which loses against the computer choice, ${computerSelection}.`;
	  highlightBorder(computerResultBorder, "playing"); 
	  ++cpuResult;
	}
	announceRound.textContent = resultMsg;
	playerResult.textContent = userResult;
	computerResult.textContent = cpuResult;
	if(userResult == 5 || cpuResult == 5) {
		endGame();
	}
}


// TRANSITION EFFECTS ON BUTTONS

function highlightBorder(border, classType) {
	border.classList.add(`${classType}`); //(${playing} || ${cpu})
	setTimeout(() => {removeTransition(border, classType);}, 1000);
}

function removeTransition(border, classType) {
	border.classList.remove(`${classType}`);
}



function checkWinner() {
	return (userResult == 5 || cpuResult == 5);
}


// ENDGAME

function endGame() {
	setTimeout(() => {rplContent();}, 1500);
	if (userResult > cpuResult) {
		endDesc.textContent = "Congratulations!! You won against the computer!!"
		returnMainBtn.textContent = "Play again";
		
	} else {
		endDesc.textContent="What a loser! You've lost against the computer";
		returnMainBtn.textContent = "Try again?";
		
	};
}


function rplContent() {
	main.classList.add("disappear");
	endAlrt.classList.remove("disappear");
  
	returnMainBtn.addEventListener("click", () => {
	  main.classList.remove("disappear");
	  endAlrt.classList.add("disappear");
	  resetGame();
	});
}

function resetGame() {
	userResult = 0;
	cpuResult = 0;
	playerResult.textContent = userResult;
	computerResult.textContent = cpuResult;
	announceRound.textContent = "";
}

