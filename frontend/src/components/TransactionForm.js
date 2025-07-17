import React, { useState } from 'react';
import { Box, TextField, Select, MenuItem, Button, InputLabel, FormControl } from '@mui/material';

const TransactionForm = ({ type, onSubmit }) => {
  const [amount, setAmount] = useState('');
  const [currency, setCurrency] = useState('NGN');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!amount) return;
    onSubmit({ amount, currency });
    setAmount('');
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', gap: 2, alignItems: 'center', mb: 2 }}>
      <TextField
        type="number"
        label="Amount"
        value={amount}
        onChange={e => setAmount(e.target.value)}
        size="small"
        required
        sx={{ minWidth: 100 }}
      />
      <FormControl size="small" sx={{ minWidth: 90 }}>
        <InputLabel>Currency</InputLabel>
        <Select value={currency} label="Currency" onChange={e => setCurrency(e.target.value)}>
          <MenuItem value="NGN">NGN</MenuItem>
          <MenuItem value="USD">USD</MenuItem>
        </Select>
      </FormControl>
      <Button type="submit" variant="contained" color={type === 'deposit' ? 'secondary' : 'error'}>
        {type === 'deposit' ? 'Deposit' : 'Withdraw'}
      </Button>
    </Box>
  );
};

export default TransactionForm; 