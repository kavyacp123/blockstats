# Quick Start Guide

## 🚀 Get Started in 3 Steps

### Step 1: Install Dependencies
```bash
pip install flask requests
```

### Step 2: Run the Application
```bash
python app.py
```

### Step 3: Open Your Browser
Navigate to: **http://localhost:5000**

---

## ✨ What You'll See

### Home Page
- **7 cryptocurrency cards** with live prices
- **Real-time updates** every 10 seconds
- **Color-coded changes** (green = up, red = down)
- **Click any card** to see predictions

### Prediction Page
- **Live current price** with 24h statistics
- **AI-powered 30-day prediction chart**
- **Auto-updating** every 5 seconds
- **Volume, High, Low** statistics

---

## 📊 Supported Cryptocurrencies

1. **Bitcoin (BTC)** - `/predict/BTCUSDT`
2. **Ethereum (ETH)** - `/predict/ETHUSDT`
3. **Binance Coin (BNB)** - `/predict/BNBUSDT`
4. **Litecoin (LTC)** - `/predict/LTCUSDT`
5. **Chainlink (LINK)** - `/predict/LINKUSDT`
6. **Stellar (XLM)** - `/predict/XLMUSDT`
7. **Polygon (MATIC)** - `/predict/MATICUSDT`

---

## 🎨 Key Features

✅ Real-time price updates from Binance API
✅ Modern dark theme UI
✅ Responsive mobile design
✅ Smooth animations
✅ 30-day AI predictions
✅ 24-hour statistics
✅ Auto-refresh functionality

---

## 🔧 Troubleshooting

### Port Already in Use?
```bash
python app.py --port 5001
```

### Cannot Connect to API?
- Check your internet connection
- Ensure Binance API is accessible in your region

### Missing Dependencies?
```bash
pip install -r requirements.txt
```

---

## 📝 API Usage

### Get Price for One Crypto
```bash
curl http://localhost:5000/api/price/BTCUSDT
```

### Get All Prices
```bash
curl http://localhost:5000/api/prices/all
```

---

## 🎯 Next Steps

1. **Explore the Dashboard** - View all cryptocurrencies
2. **Check Predictions** - Click on any crypto to see 30-day forecast
3. **Watch Live Updates** - Prices update automatically
4. **Compare Statistics** - View 24h highs, lows, and changes

---

## ⚠️ Important Notes

- Prices are in **USDT (Tether)**
- Updates require **internet connection**
- Predictions are **educational only**
- Not **financial advice**

---

## 🌟 Enjoy BlockStats!

Your modern cryptocurrency price prediction dashboard is ready to use!
