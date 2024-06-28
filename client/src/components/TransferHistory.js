import React from 'react';
import { Button, List, ListItem, ListItemText } from '@mui/material';
import axios from 'axios';

const TransferHistory = ({ transfers, onTransferDeleted }) => {
  const handleDelete = async (id) => {
    try {
      await axios.delete(`${process.env.REACT_APP_BACKEND_URL}/api/transfers/${id}`);
      onTransferDeleted(id);
    } catch (error) {
      console.error('Error deleting transfer record:', error);
    }
  };

  return (
    <List>
      {transfers.map((transfer) => (
        <ListItem key={transfer._id}>
          <ListItemText
            primary={`${transfer.transferAmount} ${transfer.fromCountry} = ${transfer.convertedAmount} ${transfer.toCountry}`}
            secondary={new Date(transfer.date).toLocaleString()}
          />
          <Button variant="contained" color="secondary" onClick={() => handleDelete(transfer._id)}>
            Revoke
          </Button>
        </ListItem>
      ))}
    </List>
  );
};

export default TransferHistory;
