const cryptoSymbols = [
    'BTCUSDT', 'ETHUSDT', 'BNBUSDT', 'LTCUSDT',
    'LINKUSDT', 'XLMUSDT', 'MATICUSDT'
];

let previousPrices = {};

async function fetchPrice(symbol) {
    try {
        const response = await fetch(`https://api.binance.com/api/v3/ticker/24hr?symbol=${symbol}`);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error(`Error fetching price for ${symbol}:`, error);
        return null;
    }
}

function formatPrice(price) {
    const numPrice = parseFloat(price);
    if (numPrice >= 1000) {
        return '$' + numPrice.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    } else if (numPrice >= 1) {
        return '$' + numPrice.toFixed(2);
    } else {
        return '$' + numPrice.toFixed(6);
    }
}

function formatPercentage(percent) {
    const num = parseFloat(percent);
    const sign = num >= 0 ? '+' : '';
    return `${sign}${num.toFixed(2)}%`;
}

function updatePriceDisplay(symbol, data) {
    const priceElement = document.getElementById(`price-${symbol}`);
    const changeElement = document.getElementById(`change-${symbol}`);

    if (!priceElement || !data) return;

    const currentPrice = parseFloat(data.lastPrice);
    const priceChange = parseFloat(data.priceChange);
    const priceChangePercent = parseFloat(data.priceChangePercent);

    const previousPrice = previousPrices[symbol];
    const isIncreasing = previousPrice && currentPrice > previousPrice;
    const isDecreasing = previousPrice && currentPrice < previousPrice;

    priceElement.innerHTML = formatPrice(currentPrice);

    if (isIncreasing) {
        priceElement.style.animation = 'price-up 0.5s ease';
    } else if (isDecreasing) {
        priceElement.style.animation = 'price-down 0.5s ease';
    }

    setTimeout(() => {
        priceElement.style.animation = '';
    }, 500);

    if (changeElement) {
        const changeClass = priceChange >= 0 ? 'positive' : 'negative';
        changeElement.className = `price-change ${changeClass}`;
        changeElement.innerHTML = formatPercentage(priceChangePercent);
    }

    previousPrices[symbol] = currentPrice;
}

async function updateAllPrices() {
    const promises = cryptoSymbols.map(symbol => fetchPrice(symbol));
    const results = await Promise.all(promises);

    results.forEach((data, index) => {
        if (data) {
            updatePriceDisplay(cryptoSymbols[index], data);
        }
    });

    const lastUpdateElement = document.getElementById('last-update');
    if (lastUpdateElement) {
        const now = new Date();
        lastUpdateElement.textContent = `Last updated: ${now.toLocaleTimeString()}`;
    }
}

const style = document.createElement('style');
style.textContent = `
    @keyframes price-up {
        0% { color: var(--text-primary); }
        50% { color: var(--success-color); transform: scale(1.05); }
        100% { color: var(--text-primary); }
    }
    @keyframes price-down {
        0% { color: var(--text-primary); }
        50% { color: var(--danger-color); transform: scale(1.05); }
        100% { color: var(--text-primary); }
    }
`;
document.head.appendChild(style);

updateAllPrices();

setInterval(updateAllPrices, 10000);
