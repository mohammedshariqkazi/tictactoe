const board = document.getElementById('board');
const cells = document.querySelectorAll('[data-cell]');
const status = document.getElementById('status');

let currentPlayer = 'X';
let gameActive = true;

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

function checkWin() {
    for (const combination of winningCombinations) {
        const [a, b, c] = combination;
        if (cells[a].textContent && cells[a].textContent === cells[b].textContent && cells[a].textContent === cells[c].textContent) {
            gameActive = false;
            cells[a].classList.add('winner');
            cells[b].classList.add('winner');
            cells[c].classList.add('winner');
            cells[a].innerHTML = `<span>${cells[a].textContent}</span>`;
            cells[b].innerHTML = `<span>${cells[b].textContent}</span>`;
            cells[c].innerHTML = `<span>${cells[c].textContent}</span>`;
            status.textContent = `${currentPlayer} wins!`;

            // Automatically reset the game after 1 second
            setTimeout(() => {
                resetGame();
            }, 1000);
        }
    }
    if ([...cells].every(cell => cell.textContent !== '')) {
        gameActive = false;
        status.textContent = "It's a draw!";
        setTimeout(() => {
            resetGame();
        }, 1000);
    }
}

function handleCellClick(e) {
    const cell = e.target;
    if (!gameActive || cell.textContent !== '') return;
    cell.textContent = currentPlayer;
    cell.style.color = currentPlayer === 'X' ? 'blue' : 'red';
    checkWin();
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    status.textContent = `Player ${currentPlayer}'s turn`;
}

function resetGame() {
    cells.forEach(cell => {
        cell.textContent = '';
        cell.style.color = '';
        cell.classList.remove('winner');
    });
    currentPlayer = 'X';
    gameActive = true;
    status.textContent = "Player X's turn";
}

cells.forEach(cell => cell.addEventListener('click', handleCellClick));
