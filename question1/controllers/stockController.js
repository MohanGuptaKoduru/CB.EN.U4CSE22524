const { fetchStockHistory } = require('../services/stockService');
const { calculateAverage, calculateCorrelation } = require('../utils/correlation');

exports.getAverageStockPrice = async (req, res) => {
    try {
        const { ticker } = req.params;
        const { minutes, aggregation } = req.query;

        if (aggregation !== 'average') {
            return res.status(400).json({ error: "Invalid aggregation type" });
        }

        const priceHistory = await fetchStockHistory(ticker, minutes);
        const average = calculateAverage(priceHistory);

        res.json({ averageStockPrice: average, priceHistory });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getStockCorrelation = async (req, res) => {
    try {
        const { minutes, ticker } = req.query;
        const [ticker1, ticker2] = ticker;

        const data1 = await fetchStockHistory(ticker1, minutes);
        const data2 = await fetchStockHistory(ticker2, minutes);

        const correlation = calculateCorrelation(data1, data2);
        res.json({
            correlation,
            stocks: {
                [ticker1]: {
                    averagePrice: calculateAverage(data1),
                    priceHistory: data1
                },
                [ticker2]: {
                    averagePrice: calculateAverage(data2),
                    priceHistory: data2
                }
            }
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
