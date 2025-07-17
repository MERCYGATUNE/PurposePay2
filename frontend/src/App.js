import React, { useState } from 'react';
import WalletConnect from './components/WalletConnect';
import TransactionForm from './components/TransactionForm';
import TransactionHistory from './components/TransactionHistory';
import { Container, Box, Typography, Paper, CssBaseline, ThemeProvider, createTheme, CircularProgress, Button } from '@mui/material';

const API_URL = 'http://localhost:5000/api';

const theme = createTheme({
  palette: {
    primary: { main: '#6c47ff' },
    secondary: { main: '#47ff6c' },
  },
  shape: { borderRadius: 12 },
  typography: { fontFamily: 'Inter, Roboto, Arial, sans-serif' },
});

function App() {
  const [username, setUsername] = useState('');
  const [sessionId, setSessionId] = useState('');
  const [walletAddress, setWalletAddress] = useState('');
  const [transactions, setTransactions] = useState([]);
  const [loggedIn, setLoggedIn] = useState(false);
  const [loading, setLoading] = useState(false);
  const [onPlatform, setOnPlatform] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    const res = await fetch(`${API_URL}/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username })
    });
    const data = await res.json();
    if (data.session_id) {
      setSessionId(data.session_id);
      setLoggedIn(true);
      fetchHistory(data.session_id);
    } else {
      alert('Login failed');
    }
    setLoading(false);
  };

  const handleWalletConnect = async (address) => {
    setWalletAddress(address);
    await fetch(`${API_URL}/connect_wallet`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ session_id: sessionId, wallet_address: address })
    });
  };

  const handleTransaction = async (type, { amount, currency }) => {
    setLoading(true);
    const res = await fetch(`${API_URL}/${type}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ session_id: sessionId, amount, currency })
    });
    const data = await res.json();
    if (data.transaction) {
      fetchHistory(sessionId);
    } else {
      alert('Transaction failed');
    }
    setLoading(false);
  };

  const fetchHistory = async (sid = sessionId) => {
    const res = await fetch(`${API_URL}/history?session_id=${sid}`);
    const data = await res.json();
    setTransactions(data.transactions || []);
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container maxWidth="sm" sx={{ minHeight: '100vh', display: 'flex', alignItems: 'center' }}>
        <Paper elevation={6} sx={{ width: '100%', p: 4, mt: 6, mb: 6 }}>
          <Typography variant="h4" color="primary" align="center" fontWeight={700} gutterBottom>
            PurposePay On/Off Ramp
          </Typography>
          {!loggedIn ? (
            <Box component="form" onSubmit={handleLogin} sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 4 }}>
              <input
                type="text"
                placeholder="Enter username"
                value={username}
                onChange={e => setUsername(e.target.value)}
                style={{ padding: '0.75rem', borderRadius: '8px', border: '1px solid #ccc', fontSize: '1rem' }}
                required
              />
              <button type="submit" style={{ padding: '0.75rem', background: '#6c47ff', color: '#fff', border: 'none', borderRadius: '8px', fontWeight: 'bold', fontSize: '1rem', cursor: 'pointer' }} disabled={loading}>
                {loading ? <CircularProgress size={24} color="inherit" /> : 'Login'}
              </button>
            </Box>
          ) : !onPlatform ? (
            <Box sx={{ textAlign: 'center', mt: 6 }}>
              <Typography variant="h5" gutterBottom>Welcome, {username}!</Typography>
              <Typography sx={{ mb: 3 }}>
                This is your dashboard. You can view your profile, stats, or proceed to the platform to make deposits and withdrawals.
              </Typography>
              <Button variant="contained" color="primary" size="large" onClick={() => setOnPlatform(true)}>
                Go to Platform
              </Button>
            </Box>
          ) : (
            <Box>
              <WalletConnect onConnect={handleWalletConnect} walletAddress={walletAddress} />
              <TransactionForm type="deposit" onSubmit={data => handleTransaction('deposit', data)} />
              <TransactionForm type="withdraw" onSubmit={data => handleTransaction('withdraw', data)} />
              <TransactionHistory transactions={transactions} />
            </Box>
          )}
        </Paper>
      </Container>
    </ThemeProvider>
  );
}

export default App;
