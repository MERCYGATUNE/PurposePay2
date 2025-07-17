import React from 'react';
import { Button, Card, CardContent, Typography } from '@mui/material';

const WalletConnect = ({ onConnect, walletAddress }) => {
  const handleConnect = async () => {
    if (window.ethereum) {
      try {
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        onConnect(accounts[0]);
      } catch (err) {
        alert('Wallet connection failed');
      }
    } else {
      alert('MetaMask not detected');
    }
  };

  return (
    <Card sx={{ mb: 3 }}>
      <CardContent>
        {walletAddress ? (
          <Typography color="primary">Connected: <b>{walletAddress}</b></Typography>
        ) : (
          <Button variant="contained" color="primary" onClick={handleConnect} fullWidth>
            Connect Wallet
          </Button>
        )}
      </CardContent>
    </Card>
  );
};

export default WalletConnect; 