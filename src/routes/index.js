const express = require('express');
const purchases = require('./purchases/routes');
const sales = require('./sales/routes');

const router = express.Router();

router.use('/purchases', purchases);
router.use('/sales', sales);

module.exports = router;
