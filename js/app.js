"use strict";
class Player {
    formatName() {
        return this.name.toUpperCase();
    }
}
class Utility {
    static getInputValue(elementId) {
        const inputElement = document.getElementById(elementId);
        return inputElement.value;
    }
}
class Scoreboard {
    constructor() {
        this.results = [];
    }
    addResult(newResult) {
        this.results.push(newResult);
    }
    updateScoreboard() {
        let output = '<h2>Scoreboard</h2>';
        for (let index = 0; index < this.results.length; index++) {
            const result = this.results[index];
            output += '<h4>';
            output += result.playerName + ': ' + result.score + '/' + result.problemCount + ' for factor ' + result.factor;
            output += '</h4>';
        }
        const scoresElement = document.getElementById('scores');
        scoresElement.innerHTML = output;
    }
}
class Game {
    constructor(player, problemCount, factor) {
        this.player = player;
        this.problemCount = problemCount;
        this.factor = factor;
        this.scoreboard = new Scoreboard();
    }
    displayGame() {
        let gameForum = '';
        for (let i = 1; i <= this.problemCount; i++) {
            gameForum += '<div class = "form-group">';
            gameForum += '<label for="answer' + i + '" class="col-sm-2 control-label">';
            gameForum += String(this.factor) + ' x ' + i + ' = </label>';
            gameForum += '<div class = "col-sm-1"><input type="text" class="form-control" id="answer' + i + '" size="5" /></div>';
            gameForum += '</div>';
        }
        const gameElement = document.getElementById('game');
        gameElement.innerHTML = gameForum;
        document.getElementById('calculate').removeAttribute('disabled');
    }
    calculateScore() {
        let score = 0;
        for (let i = 1; i <= this.problemCount; i++) {
            const answer = Number(Utility.getInputValue('answer' + i));
            if (i * this.factor === answer) {
                score++;
            }
        }
        const result = {
            playerName: this.player.name,
            score: score,
            problemCount: this.problemCount,
            factor: this.factor
        };
        this.scoreboard.addResult(result);
        this.scoreboard.updateScoreboard();
        document.getElementById('calculate').setAttribute('disabled', 'true');
    }
}
let newGame;
document.getElementById('startGame').addEventListener('click', () => {
    const player = new Player();
    player.name = Utility.getInputValue('playername');
    const problemCount = Number(Utility.getInputValue('problemCount'));
    const factor = Number(Utility.getInputValue('factor'));
    newGame = new Game(player, problemCount, factor);
    newGame.displayGame();
});
document.getElementById('calculate').addEventListener('click', () => {
    newGame.calculateScore();
});
//# sourceMappingURL=app.js.map