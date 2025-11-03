from flask import Flask, jsonify, render_template, request, redirect, url_for
import requests
import os

app = Flask(__name__)

CRYPTO_INFO = {
    'BTCUSDT': {
        'name': 'Bitcoin',
        'symbol': 'BTC',
        'icon': 'bitcoin.png'
    },
    'ETHUSDT': {
        'name': 'Ethereum',
        'symbol': 'ETH',
        'icon': 'ethereum.png'
    },
    'BNBUSDT': {
        'name': 'Binance Coin',
        'symbol': 'BNB',
        'icon': 'binancecoin.png'
    },
    'LTCUSDT': {
        'name': 'Litecoin',
        'symbol': 'LTC',
        'icon': 'litecoin.png'
    },
    'LINKUSDT': {
        'name': 'Chainlink',
        'symbol': 'LINK',
        'icon': 'chainlink.png'
    },
    'XLMUSDT': {
        'name': 'Stellar',
        'symbol': 'XLM',
        'icon': 'stellar.png'
    },
    'MATICUSDT': {
        'name': 'Polygon',
        'symbol': 'MATIC',
        'icon': 'polygon.png'
    }
}

@app.route('/')
def home():
    return render_template('home.html')

@app.route('/predict/<crypto_symbol>')
def predict(crypto_symbol):
    crypto_symbol = crypto_symbol.upper()

    if crypto_symbol not in CRYPTO_INFO:
        return redirect(url_for('home'))

    crypto_data = CRYPTO_INFO[crypto_symbol]
    graph_filename = f'{crypto_symbol}_price_prediction_with_future.jpg'

    return render_template('predict.html',
                         crypto_name=crypto_data['name'],
                         crypto_symbol=crypto_data['symbol'],
                         crypto_symbol_api=crypto_symbol,
                         crypto_icon=crypto_data['icon'],
                         graph_filename=graph_filename)

@app.route('/api/price/<symbol>')
def get_price(symbol):
    try:
        symbol = symbol.upper()
        url = f'https://api.binance.com/api/v3/ticker/24hr?symbol={symbol}'
        response = requests.get(url, timeout=5)
        data = response.json()

        if 'lastPrice' in data:
            return jsonify({
                'success': True,
                'symbol': symbol,
                'price': float(data['lastPrice']),
                'change': float(data['priceChange']),
                'changePercent': float(data['priceChangePercent']),
                'volume': float(data['quoteVolume']),
                'high': float(data['highPrice']),
                'low': float(data['lowPrice'])
            })
        else:
            return jsonify({'success': False, 'error': 'Invalid response from API'}), 500
    except requests.exceptions.RequestException as e:
        return jsonify({'success': False, 'error': str(e)}), 500
    except Exception as e:
        return jsonify({'success': False, 'error': str(e)}), 500

@app.route('/api/prices/all')
def get_all_prices():
    try:
        symbols = list(CRYPTO_INFO.keys())
        url = 'https://api.binance.com/api/v3/ticker/24hr'
        response = requests.get(url, timeout=10)
        all_data = response.json()

        result = {}
        for item in all_data:
            if item['symbol'] in symbols:
                result[item['symbol']] = {
                    'price': float(item['lastPrice']),
                    'change': float(item['priceChange']),
                    'changePercent': float(item['priceChangePercent']),
                    'volume': float(item['quoteVolume']),
                    'high': float(item['highPrice']),
                    'low': float(item['lowPrice'])
                }

        return jsonify({'success': True, 'data': result})
    except Exception as e:
        return jsonify({'success': False, 'error': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)
