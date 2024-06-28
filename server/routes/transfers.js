const express = require("express");
const axios = require("axios");
const router = express.Router();
const Transfer = require("../models/Transfer");

// Route to handle the creation of a new transfer
router.post("/", async (req, res) => {
  const { fromCountry, toCountry, transferAmount } = req.body;

  try {
    // Fetch the exchange rate from the external API
    const response = await axios.get(
      `https://v6.exchangerate-api.com/v6/${process.env.EXCHANGE_RATE_API_KEY}/latest/${fromCountry}`
    );
    const rate = response.data.conversion_rates[toCountry];
    const convertedAmount = transferAmount * rate;

    const newTransfer = new Transfer({
      fromCountry,
      toCountry,
      transferAmount,
      convertedAmount,
    });

    await newTransfer.save();
    res.json(newTransfer);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Route to handle fetching all transfer records
router.get("/", async (req, res) => {
  try {
    const transfers = await Transfer.find();
    res.json(transfers);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Route to handle deleting a transfer record by its ID
router.delete("/:id", async (req, res) => {
  try {
    await Transfer.findByIdAndDelete(req.params.id);
    res.json({ message: "Transfer record deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
