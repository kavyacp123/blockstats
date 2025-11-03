# BlockStats - Crypto Price Predictor

## Setup Instructions

### 1. Install Dependencies
```bash
pip install -r requirements.txt
```

### 2. Run the Application
```bash
python app.py
```

The application will start on `http://localhost:5000`

## Features

### Home Page
- Real-time cryptocurrency prices for 7 major cryptocurrencies
- Auto-updating prices every 10 seconds
- 24-hour price change percentages
- Modern, responsive design with dark theme
- Animated price updates

### Prediction Page
- Individual prediction pages for each cryptocurrency
- Real-time price updates every 5 seconds
- 24-hour statistics (volume, high, low, price change)
- AI-powered 30-day price prediction charts
- LSTM model predictions with historical data

### Supported Cryptocurrencies
1. Bitcoin (BTC)
2. Ethereum (ETH)
3. Binance Coin (BNB)
4. Litecoin (LTC)
5. Chainlink (LINK)
6. Stellar (XLM)
7. Polygon (MATIC)

## API Endpoints

### Get Single Cryptocurrency Price
```
GET /api/price/<symbol>
Example: /api/price/BTCUSDT
```

### Get All Cryptocurrency Prices
```
GET /api/prices/all
```

## Technical Stack

- **Backend**: Flask (Python)
- **Frontend**: HTML5, CSS3, JavaScript (Vanilla)
- **Data Source**: Binance Public API
- **ML Model**: LSTM (Long Short-Term Memory) Neural Networks
- **Styling**: Custom CSS with CSS Variables, Gradient Backgrounds, Animations

## Project Structure

```
project/
├── app.py                          # Main Flask application
├── requirements.txt                # Python dependencies
├── templates/
│   ├── home.html                   # Main dashboard
│   └── predict.html                # Prediction page template
├── static/
│   ├── css/
│   │   └── main.css               # Main stylesheet
│   ├── js/
│   │   ├── main.js                # Home page JavaScript
│   │   └── predict.js             # Prediction page JavaScript
│   └── images/
│       ├── logo.jpg               # Logo
│       ├── bitcoin.png            # Crypto icons
│       └── *_prediction*.jpg      # Prediction graphs
└── model/
    └── *.py                       # ML model scripts
```

## Features Implemented

### Real-Time Price Updates
- Fetches live data from Binance API
- Auto-refresh every 5-10 seconds
- Smooth animations on price changes
- Color-coded price movements (green for up, red for down)

### Modern UI/UX
- Dark theme with gradient backgrounds
- Responsive grid layout
- Hover effects and transitions
- Card-based design
- Mobile-friendly responsive breakpoints

### Statistics Dashboard
- 24-hour trading volume
- 24-hour high/low prices
- Price change percentage
- Live update indicator

## Notes

- All prices are in USDT (Tether)
- Predictions are for educational purposes only
- Not financial advice - cryptocurrency markets are highly volatile
