import requests
import time

def test_api():
    print("Testing Binance API connection...")
    try:
        response = requests.get('https://api.binance.com/api/v3/ticker/24hr?symbol=BTCUSDT', timeout=5)
        data = response.json()
        print(f"✓ API Connection successful")
        print(f"  Bitcoin Price: ${float(data['lastPrice']):,.2f}")
        print(f"  24h Change: {float(data['priceChangePercent']):.2f}%")
        return True
    except Exception as e:
        print(f"✗ API Connection failed: {e}")
        return False

def test_flask_app():
    print("\nTesting Flask application...")
    try:
        import app
        print("✓ Flask app module imported successfully")
        print(f"✓ Routes configured:")
        for rule in app.app.url_map.iter_rules():
            print(f"  - {rule.endpoint}: {rule.rule}")
        return True
    except Exception as e:
        print(f"✗ Flask app import failed: {e}")
        return False

def check_files():
    print("\nChecking required files...")
    import os

    required_files = [
        'app.py',
        'templates/home.html',
        'templates/predict.html',
        'static/css/main.css',
        'static/js/main.js',
        'static/js/predict.js'
    ]

    all_exist = True
    for file in required_files:
        if os.path.exists(file):
            print(f"✓ {file}")
        else:
            print(f"✗ {file} - MISSING")
            all_exist = False

    return all_exist

if __name__ == '__main__':
    print("=" * 50)
    print("BlockStats - Application Test Suite")
    print("=" * 50)

    test1 = test_api()
    test2 = test_flask_app()
    test3 = check_files()

    print("\n" + "=" * 50)
    if test1 and test2 and test3:
        print("✓ All tests passed! Application is ready to run.")
        print("\nTo start the application, run:")
        print("  python app.py")
    else:
        print("✗ Some tests failed. Please check the errors above.")
    print("=" * 50)
