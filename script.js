let balance = 0;
let investment = 10;
let autoInvestInterval;

const balanceElement = document.getElementById('balance');
const investButton = document.getElementById('investButton');
const collectButton = document.getElementById('collectButton');
const saveButton = document.getElementById('saveButton');
const loadButton = document.getElementById('loadButton');
const autoInvestCheckbox = document.getElementById('autoInvestCheckbox');

function updateBalance() {
    balanceElement.textContent = balance.toFixed(2);
}

function invest() {
    if (balance >= investment) {
        balance -= investment;
        updateBalance();
        investButton.disabled = true;
        collectButton.disabled = false;

        const earningsPerSecond = 1;
        const earningsInterval = setInterval(function () {
            balance += earningsPerSecond;
            updateBalance();
        }, 1000);

        setTimeout(function () {
            clearInterval(earningsInterval);
            investButton.disabled = false;
            collectButton.disabled = true;
        }, 60000);

        saveGame();
    }
}

function collect() {
    balance += investment;
    updateBalance();
    investButton.disabled = false;
    collectButton.disabled = true;
    saveGame();
}

function saveGame() {
    const gameState = {
        balance,
        investment,
        autoInvest: autoInvestCheckbox.checked,
    };
    localStorage.setItem('gameState', JSON.stringify(gameState));
}

function loadGame() {
    const savedState = JSON.parse(localStorage.getItem('gameState'));
    if (savedState) {
        balance = savedState.balance;
        investment = savedState.investment;
        autoInvestCheckbox.checked = savedState.autoInvest;
        updateBalance();

        if (autoInvestCheckbox.checked) {
            startAutoInvest();
        }
    }
}

function startAutoInvest() {
    autoInvestInterval = setInterval(function () {
        invest();
    }, 5000); // Auto invest every 5 seconds (adjust as needed)
}

function stopAutoInvest() {
    clearInterval(autoInvestInterval);
}

investButton.addEventListener('click', invest);
collectButton.addEventListener('click', collect);
saveButton.addEventListener('click', saveGame);
loadButton.addEventListener('click', loadGame);
autoInvestCheckbox.addEventListener('change', function () {
    if (autoInvestCheckbox.checked) {
        startAutoInvest();
    } else {
        stopAutoInvest();
    }
});

window.addEventListener('load', loadGame);
