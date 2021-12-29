const express = require('express');
const router = express.Router();
const { createPurchase } = require('./controller');

router.post('/', async (req, res) => {
  try {
    const { date, quantity, productId, productName } = req.body;
    if (!date || !quantity || !productId || !productName) {
      return res.status(401).json({ data: [], error: 'Data is missing' });
    }
    const createdPurchase = await createPurchase(
      date,
      quantity,
      productId,
      productName
    );

    return res.status(201).json({ data: createdPurchase, error: '' });
  } catch (e) {
    if (e.code) {
      return res.status(e.code).json({ data: [], error: e.error });
    }
    return res
      .status(500)
      .json({ data: [], error: 'There was an error processing the request' });
  }
});

module.exports = router;
