
---

# 📈 ChronoPrice

**Cryptocurrency Price Prediction Platform using LSTM**

ChronoPrice is a machine-learning–driven platform that predicts cryptocurrency prices using an **LSTM (Long Short-Term Memory)** neural network. The system ingests recent market data, performs time-series feature engineering, runs model inference, and visualizes **actual vs predicted prices** on an interactive dashboard.

This project is designed as a **resume and learning project**, emphasizing **correct system design, ML integration, and architectural thinking** rather than production-scale efficiency.

---

## 🚀 Features

* 📊 Cryptocurrency price prediction using **LSTM**
* ⏱️ Time-series window-based forecasting
* 📈 Dashboard showing **actual vs predicted prices**
* 📉 Prediction error visualization
* 🧠 Clear separation of **data ingestion, ML inference, and presentation**
* ☁️ Free-tier friendly cloud deployment
* 🏗️ Production-style architecture with realistic trade-offs

---

## 🧠 System Design Overview

### High-Level Architecture

```
Crypto Exchange API
        ↓
Data Ingestion Service
        ↓
Feature Engineering
        ↓
LSTM Inference
        ↓
Analytics Database (PostgreSQL)
        ↓
API Gateway
        ↓
Frontend Dashboard
```

### Design Principles

* **Separation of concerns**: ingestion, ML, storage, and UI are independent
* **Offline training, online inference**
* **Near–real-time prediction** (free-tier constraints)
* **Cost-aware architecture**

---

## 🏗️ Architecture Components

### 1️⃣ Data Source

* Cryptocurrency exchange APIs (e.g., Binance, Coinbase)
* OHLC candle data (Open, High, Low, Close, Volume)
* REST-based polling (free-tier friendly)

---

### 2️⃣ Data Ingestion Service

* Periodically fetches recent market data
* Normalizes and prepares data for feature engineering
* Designed as a background process or scheduled task

---

### 3️⃣ Feature Engineering

* Sliding time window (e.g., last 60 timesteps)
* Normalization and scaling
* Converts raw prices into ML-ready tensors

```
[t-60, t-59, ..., t-1] → predict t
```

---

### 4️⃣ LSTM Model

* **Offline training** using historical data (local / Colab)
* **Online inference** only (no training in production)
* CPU-based inference with a lightweight LSTM
* Predicts next-step price

---

### 5️⃣ Analytics Database

**PostgreSQL (managed)**

Stores:

* Timestamp
* Actual price
* Predicted price
* Model version

Used for:

* Dashboard charts
* Accuracy tracking
* Historical analysis

---

### 6️⃣ API Gateway

* Exposes prediction and analytics APIs
* Optional WebSocket support for live updates

Example endpoints:

```
GET /price/latest
GET /price/prediction
GET /metrics/model
```

---



## ⚖️ Design Trade-Offs

| Decision                           | Reason                 |
| ---------------------------------- | ---------------------- |
| REST polling instead of WebSockets | Free-tier reliability  |
| Offline model training             | Cost & stability       |
| Small LSTM model                   | CPU-only inference     |
| Near–real-time demo                | Avoids always-on costs |
| Separate ML & API layers           | Clean architecture     |

These trade-offs are **intentional** and clearly documented.

---

## 🧪 Model Details

* Model Type: LSTM
* Framework: PyTorch / TensorFlow (CPU)
* Window Size: 60 timesteps (configurable)
* Prediction Horizon: Next price step
* Training: Offline only

---

## 📊 Dashboard Preview

The dashboard visualizes:

* Live / recent price data
* Predicted vs actual prices
* Prediction error trends
* Model metadata

> **Disclaimer:** Predictions are for educational purposes only.

---



## 🧩 What This Project Demonstrates

* Time-series forecasting with LSTM
* ML system design (training vs inference)
* Data pipelines and analytics
* API and dashboard integration
* Cloud cost awareness
* Real-world engineering trade-offs

## ⚠️ Disclaimer

This project is built **for educational and demonstration purposes only**.
It is **not** a trading or financial advice system.

---


