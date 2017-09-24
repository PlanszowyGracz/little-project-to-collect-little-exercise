(function () {
	"use strict";
	let allTypesOfGame = {
		onePlayer: 0,
		twoPlayer: 1

	};
	let allStatesOfGame = {
		notStarted: 1,
		player1Turn: 2,
		player2Turn: 3,
		aiTurn: 4,
		gameEnded: 5

	};
	let allTypesOfSign = {
		empty: 0,
		"x": 1,
		"o": -1
	};

	let classSign = {
		"x": "cross",
		"o": "circle"
	};

	let gameCellElement = [
		[0, 0, 0],
		[0, 0, 0],
		[0, 0, 0]
	];

	function gameStart(firstPlayersign="x", whatTypeOfGame=1, gameNumberStat = 0, statsWin1 = 0, statsWin2 = 0) {
		this.gameStatNumber = gameNumberStat;
		this.typeOfGame = whatTypeOfGame;

		this.stateOfGame = Math.random() > 0.5 ? allStatesOfGame.player1Turn : allStatesOfGame.player2Turn;
		this.players = {
			player1: {
				sign: firstPlayersign,
				statsWin: statsWin1

			},
			player2: {
				sign: firstPlayersign === "x" ? "o" : "x",
				statsWin: statsWin2
			}
		};

		this.board = [
			[0, 0, 0],
			[0, 0, 0],
			[0, 0, 0]
		];

		this.getPlayer = function () {
			if (this.stateOfGame === allStatesOfGame.player1Turn) return this.players.player1;
			if (this.stateOfGame === allStatesOfGame.player2Turn) return this.players.player2;
			return -1;
		};
		this.nextPlayer = function () {
			if (this.stateOfGame == allStatesOfGame.player1Turn) {
				this.stateOfGame = allStatesOfGame.player2Turn;
			} else if (this.stateOfGame == allStatesOfGame.player2Turn) {
				this.stateOfGame = allStatesOfGame.player1Turn;
			}

		};

		this.playerTurnHandling=function(indexa, indexb,vievChange){
			if (this.stateOfGame === allStatesOfGame.player1Turn ||
				(this.stateOfGame === allStatesOfGame.player1Turn && this.typeOfGame !== allTypesOfGame.onePlayer) ||
				this.board[indexa][indexb] === allTypesOfSign.empty) {
				this.board[indexa][indexb] = this.getPlayer().sign;
				//e.target.classList.add(classSign[this.getPlayer().sign]);
				vievChange();
				this.nextPlayer();
				//need addin checking winner and ai

			}
		};
	}



	document.addEventListener("DOMContentLoaded", function () {
		let menuContainer = document.getElementById("menu");
		let gameContainer = document.getElementById("game-container");
		let game;


		let changeScreen = function changeScreenFunction(num) {
			let typeOfChange = ["none", "block", "none"];
			if (num >= 0 && num <= 1) {
				menuContainer.style.display = typeOfChange[num];
				gameContainer.style.display = typeOfChange[num + 1];
			}
		};


		let onePlayerGameButton = document.getElementsByClassName("start-game-one-player")[0];
		onePlayerGameButton.addEventListener("click", function () {
			changeScreen(0);
			game = new gameStart("x", allTypesOfGame.onePlayer);
		});
		let twoPlayerGameButton = document.getElementsByClassName("start-game-two-player")[0];
		twoPlayerGameButton.addEventListener("click", function () {
			changeScreen(0);
			game = new gameStart("x", allTypesOfGame.twoPlayer);
		});

		function createPlayerTurn(a, b) {
			let indexa = a;
			let indexb = b;
			return function playerTurn(e) {

				if (game !== undefined) {
					game.playerTurnHandling(indexa, indexb, () => e.target.classList.add(classSign[game.getPlayer().sign]));
				}

			};
		}




		gameCellElement = gameCellElement.map((row, idrow) => {
			return row.map((el, id) => {

				return document.getElementById("cell-" + idrow + id);
			});
		});

		function loopBoard(doSomething) {
			gameCellElement.forEach((row, idrow) => {
				row.forEach((el, id) => {
					doSomething(el, idrow, id);
				});
			});
		}

		function clearCell() {

			loopBoard((el) => {

				el.classList.remove("circle");
				el.classList.remove("cross");
			});
		}
		clearCell();


		let addCellEvent = function () {
			loopBoard((el, idrow, id) => {
				let playerTurn = createPlayerTurn(idrow, id);
				el.addEventListener("click", playerTurn);
			});
		};
		addCellEvent();





	});




})();