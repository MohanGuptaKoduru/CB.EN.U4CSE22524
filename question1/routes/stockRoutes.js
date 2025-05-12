const express = require('express');
const router = express.Router();
const { getAverageStockPrice, getStockCorrelation } = require('../controllers/stockController');

router.get('/:ticker', getAverageStockPrice);
router.get('/', getStockCorrelation);

module.exports = router;
