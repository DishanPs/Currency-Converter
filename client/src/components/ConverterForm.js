import React, { useState } from "react";
import axios from "axios";
import { TextField, Button, MenuItem } from "@mui/material";

const countries = [
  { code: "USD", name: "USA" },
  { code: "LKR", name: "Sri Lanka" },
  { code: "AUD", name: "Australia" },
  { code: "INR", name: "India" },
];

const ConverterForm = ({ onTransferCreated }) => {
  const [fromCountry, setFromCountry] = useState("USD");
  const [toCountry, setToCountry] = useState("LKR");
  const [transferAmount, setTransferAmount] = useState("");

  const handleConvert = async () => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/api/transfers`,
        {
          fromCountry,
          toCountry,
          transferAmount: parseFloat(transferAmount),
        }
      );

      onTransferCreated(response.data);
    } catch (error) {
      console.error("Error converting currency:", error);
    }
  };

  return (
    <div>
      <TextField
        select
        label="From Country"
        value={fromCountry}
        onChange={(e) => setFromCountry(e.target.value)}
        fullWidth
      >
        {countries.map((option) => (
          <MenuItem key={option.code} value={option.code}>
            {option.name}
          </MenuItem>
        ))}
      </TextField>
      <br />
      <br />
      <br />
      <TextField
        select
        label="To Country"
        value={toCountry}
        onChange={(e) => setToCountry(e.target.value)}
        fullWidth
      >
        {countries.map((option) => (
          <MenuItem key={option.code} value={option.code}>
            {option.name}
          </MenuItem>
        ))}
      </TextField>
      <br />
      <br />
      <br />
      <TextField
        label="Transfer Amount"
        value={transferAmount}
        onChange={(e) => setTransferAmount(e.target.value)}
        type="number"
        fullWidth
      />
      <br />
      <br />
      <br />
      <Button variant="contained" color="success" onClick={handleConvert}>
        Convert
      </Button>
    </div>
  );
};

export default ConverterForm;
