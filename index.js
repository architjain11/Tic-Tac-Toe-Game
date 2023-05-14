document.addEventListener('DOMContentLoaded', () => {
    const tiles = document.querySelectorAll('.tile');
    const playerDisplay = document.querySelector('.player');
    const verdict = document.querySelector('.verdict');
    const resetButton = document.getElementById('reset');
    let currentPlayer = 'X';
    let gameEnded = false;

    const checkWinner = () => {
        const winningCombinations = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6],
        ];

        for (const combination of winningCombinations) {
            const [a, b, c] = combination;
            if (
                tiles[a].textContent &&
                tiles[a].textContent === tiles[b].textContent &&
                tiles[a].textContent === tiles[c].textContent
            ) {
                gameEnded = true;
                verdict.textContent = `Player ${currentPlayer} wins!`;
                verdict.classList.remove('hide');
                return;
            }
        }

        if (Array.from(tiles).every(tile => tile.textContent)) {
            gameEnded = true;
            verdict.textContent = 'It\'s a draw!';
            verdict.classList.remove('hide');
        }
    };

    const switchPlayer = () => {
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        playerDisplay.textContent = currentPlayer;
    };

    const resetGame = () => {
        for (const tile of tiles) {
            tile.textContent = '';
        }
        currentPlayer = 'X';
        playerDisplay.textContent = currentPlayer;
        gameEnded = false;
        verdict.textContent = '';
        verdict.classList.add('hide');
    };

    for (const tile of tiles) {
        tile.addEventListener('click', () => {
            if (!tile.textContent && !gameEnded) {
                tile.textContent = currentPlayer;
                checkWinner();
                if (!gameEnded) {
                    switchPlayer();
                }
            }
        });
    }

    resetButton.addEventListener('click', resetGame);
});