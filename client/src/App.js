import React, { useState, useEffect } from "react";
import axios from "axios";
import ConverterForm from "./components/ConverterForm";
import TransferHistory from "./components/TransferHistory";
import { Container, Typography } from "@mui/material";

const App = () => {
  const [transfers, setTransfers] = useState([]);

  //fetch transfer records from the backend API
  const fetchTransfers = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/api/transfers`
      );
      setTransfers(response.data);
    } catch (error) {
      console.error("Error fetching transfer records:", error);
    }
  };

  useEffect(() => {
    fetchTransfers();
  }, []);

  //when a new transfer is created
  const handleTransferCreated = (newTransfer) => {
    setTransfers([...transfers, newTransfer]);
  };

  //when a new transfer is deleted
  const handleTransferDeleted = (id) => {
    setTransfers(transfers.filter((transfer) => transfer._id !== id));
  };

  return (
    <Container>
      <Typography variant="h2" gutterBottom>
        <center>
          {" "}
          <b>Currency Converter</b>{" "}
        </center>
      </Typography>
      <br />
      <ConverterForm onTransferCreated={handleTransferCreated} />
      <br />
      <TransferHistory
        transfers={transfers}
        onTransferDeleted={handleTransferDeleted}
      />
    </Container>
  );
};

export default App;
