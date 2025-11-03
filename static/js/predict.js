let previousPrice = null;

async function fetchLivePrice() {
    try {
        const response = await fetch(`https://api.binance.com/api/v3/ticker/24hr?symbol=${cryptoSymbol}`);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching live price:', error);
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

function formatVolume(volume) {
    const num = parseFloat(volume);
    if (num >= 1000000000) {
        return '$' + (num / 1000000000).toFixed(2) + 'B';
    } else if (num >= 1000000) {
        return '$' + (num / 1000000).toFixed(2) + 'M';
    } else if (num >= 1000) {
        return '$' + (num / 1000).toFixed(2) + 'K';
    }
    return '$' + num.toFixed(2);
}

function formatPercentage(percent) {
    const num = parseFloat(percent);
    const sign = num >= 0 ? '+' : '';
    return `${sign}${num.toFixed(2)}%`;
}

function updateDisplay(data) {
    if (!data) return;

    const currentPrice = parseFloat(data.lastPrice);
    const priceChange = parseFloat(data.priceChange);
    const priceChangePercent = parseFloat(data.priceChangePercent);
    const volume = parseFloat(data.quoteVolume);
    const high = parseFloat(data.highPrice);
    const low = parseFloat(data.lowPrice);

    const priceElement = document.getElementById('current-price');
    const changeElement = document.getElementById('price-change');
    const volumeElement = document.getElementById('volume-24h');
    const highElement = document.getElementById('high-24h');
    const lowElement = document.getElementById('low-24h');
    const priceChange24hElement = document.getElementById('price-change-24h');
    const lastUpdateElement = document.getElementById('last-update');

    if (priceElement) {
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

        previousPrice = currentPrice;
    }

    if (changeElement) {
        const changeClass = priceChange >= 0 ? 'positive' : 'negative';
        changeElement.className = `live-change ${changeClass}`;
        changeElement.innerHTML = `${formatPercentage(priceChangePercent)} (${priceChange >= 0 ? '+' : ''}${formatPrice(Math.abs(priceChange))})`;
    }

    if (volumeElement) {
        volumeElement.textContent = formatVolume(volume);
    }

    if (highElement) {
        highElement.textContent = formatPrice(high);
        highElement.style.color = 'var(--success-color)';
    }

    if (lowElement) {
        lowElement.textContent = formatPrice(low);
        lowElement.style.color = 'var(--danger-color)';
    }

    if (priceChange24hElement) {
        const changeClass = priceChange >= 0 ? 'positive' : 'negative';
        priceChange24hElement.style.color = priceChange >= 0 ? 'var(--success-color)' : 'var(--danger-color)';
        priceChange24hElement.textContent = formatPercentage(priceChangePercent);
    }

    if (lastUpdateElement) {
        const now = new Date();
        lastUpdateElement.textContent = `Updated: ${now.toLocaleTimeString()}`;
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

async function updateLivePrice() {
    const data = await fetchLivePrice();
    updateDisplay(data);
}

updateLivePrice();

setInterval(updateLivePrice, 5000);
