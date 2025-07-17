import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography } from '@mui/material';

const TransactionHistory = ({ transactions }) => (
  <TableContainer component={Paper} sx={{ mt: 4 }}>
    <Typography variant="h6" sx={{ p: 2 }}>Transaction History</Typography>
    {transactions.length === 0 ? (
      <Typography sx={{ p: 2 }}>No transactions yet.</Typography>
    ) : (
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Type</TableCell>
            <TableCell>Amount</TableCell>
            <TableCell>Currency</TableCell>
            <TableCell>ID</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {transactions.map(tx => (
            <TableRow key={tx.id}>
              <TableCell sx={{ textTransform: 'capitalize' }}>{tx.type}</TableCell>
              <TableCell>{tx.amount}</TableCell>
              <TableCell>{tx.currency}</TableCell>
              <TableCell sx={{ fontSize: '0.8em', color: '#888' }}>{tx.id.slice(0, 8)}...</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    )}
  </TableContainer>
);

export default TransactionHistory; 