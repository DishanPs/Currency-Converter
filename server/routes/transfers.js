const express = require('express');
const axios = require('axios');
const router = express.Router();
const Transfer = require('../models/Transfer');

router.post('/', async (req, res) => {
  const { fromCountry, toCountry, transferAmount } = req.body;

  try {
    const response = await axios.get(`https://v6.exchangerate-api.com/v6/${process.env.EXCHANGE_RATE_API_KEY}/latest/${fromCountry}`);
    const rate = response.data.conversion_rates[toCountry];
    const convertedAmount = transferAmount * rate;

    const newTransfer = new Transfer({
      fromCountry,
      toCountry,
      transferAmount,
      convertedAmount
    });

    await newTransfer.save();
    res.json(newTransfer);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get('/', async (req, res) => {
  try {
    const transfers = await Transfer.find();
    res.json(transfers);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    await Transfer.findByIdAndDelete(req.params.id);
    res.json({ message: 'Transfer record deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
