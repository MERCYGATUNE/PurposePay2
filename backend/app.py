from flask import Flask, request, jsonify
from flask_cors import CORS
import uuid

app = Flask(__name__)
CORS(app)

users = {}
sessions = {}
transactions = []

@app.route('/api/login', methods=['POST'])
def login():
    data = request.json
    username = data.get('username')
    if not username:
        return jsonify({'error': 'Username required'}), 400
    session_id = str(uuid.uuid4())
    users[username] = {'wallet': None}
    sessions[session_id] = username
    return jsonify({'session_id': session_id, 'username': username})

@app.route('/api/connect_wallet', methods=['POST'])
def connect_wallet():
    data = request.json
    session_id = data.get('session_id')
    wallet_address = data.get('wallet_address')
    username = sessions.get(session_id)
    if not username or not wallet_address:
        return jsonify({'error': 'Invalid session or wallet address'}), 400
    users[username]['wallet'] = wallet_address
    return jsonify({'message': 'Wallet connected'})

@app.route('/api/deposit', methods=['POST'])
def deposit():
    data = request.json
    session_id = data.get('session_id')
    amount = data.get('amount')
    currency = data.get('currency')
    username = sessions.get(session_id)
    if not username or not amount or not currency:
        return jsonify({'error': 'Invalid request'}), 400
    tx = {'id': str(uuid.uuid4()), 'username': username, 'type': 'deposit', 'amount': amount, 'currency': currency}
    transactions.append(tx)
    return jsonify({'message': 'Deposit successful', 'transaction': tx})

@app.route('/api/withdraw', methods=['POST'])
def withdraw():
    data = request.json
    session_id = data.get('session_id')
    amount = data.get('amount')
    currency = data.get('currency')
    username = sessions.get(session_id)
    if not username or not amount or not currency:
        return jsonify({'error': 'Invalid request'}), 400
    tx = {'id': str(uuid.uuid4()), 'username': username, 'type': 'withdraw', 'amount': amount, 'currency': currency}
    transactions.append(tx)
    return jsonify({'message': 'Withdrawal successful', 'transaction': tx})

@app.route('/api/history', methods=['GET'])
def history():
    session_id = request.args.get('session_id')
    username = sessions.get(session_id)
    if not username:
        return jsonify({'error': 'Invalid session'}), 400
    user_txs = [tx for tx in transactions if tx['username'] == username]
    return jsonify({'transactions': user_txs})

if __name__ == '__main__':
    app.run(debug=True) 