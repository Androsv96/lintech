const express = require('express');
const router = express.Router();
const { createSale } = require('./controller');

router.post('/', async (req, res, next) => {
  try {
    const { productId, date, productName, quantity } = req.body;
    if (!productId || !date || !productName || !quantity) {
      return res.status(401).json({ data: [], error: 'Data is missing' });
    }

    const createdSale = await createSale(
      date,
      quantity,
      productId,
      productName
    );
    return res.status(201).json({ data: createdSale, error: '' });
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
