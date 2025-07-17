# PurposePay On/Off Ramp Platform

A simple onramping and offramping platform with a React frontend and a Python (Flask) backend.

## Features
- User login
- Connect to a crypto wallet (MetaMask)
- Deposit and withdraw (simulate crypto to local currency)
- View transaction history

---

## Backend (Python/Flask)

### Setup
```bash
cd backend
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
```

### Run
```bash
python app.py
```

---

## Frontend (React)

### Setup
```bash
cd frontend
npm install
```

### Run
```bash
npm start
```

---

## Usage
1. Start the backend server (Flask, default: http://localhost:5000)
2. Start the frontend (React, default: http://localhost:3000)
3. Login with any username
4. Connect your MetaMask wallet
5. Deposit or withdraw (choose amount and currency)
6. View your transaction history

---

## Notes
- This is a demo platform. All data is stored in memory and will reset on server restart.
- For real crypto integration, connect the backend to a blockchain API/provider. 