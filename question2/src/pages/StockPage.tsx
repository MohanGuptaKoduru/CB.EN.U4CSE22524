import React, { useState, useEffect } from 'react';
import { getStockAverage } from '../services/api';
import StockChart from '../components/StockChart';
import { Box, MenuItem, Select, Typography, type SelectChangeEvent } from '@mui/material';

interface StockData {
  averageStockPrice: number;
  priceHistory: { price: number; lastUpdatedAt: string }[];
}

const tickers = ['NVDA', 'AAPL', 'GOOGL', 'AMZN'];
const intervals = [15, 30, 60];

const StockPage: React.FC = () => {
  const [ticker, setTicker] = useState<string>('NVDA');
  const [minutes, setMinutes] = useState<number>(15);
  const [data, setData] = useState<StockData | null>(null);
  const [loading, setLoading] = useState<boolean>(false); // For loading state
  const [error, setError] = useState<string | null>(null); // For error handling

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null); // Reset error message on each new fetch attempt
      try {
        const res = await getStockAverage(ticker, minutes);
       
        setData(res.data as StockData);
      } catch (err) {
        setError('Error fetching stock data');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [ticker, minutes]);

  const handleTickerChange = (e: SelectChangeEvent<string>) => {
    setTicker(e.target.value);
  };

  const handleMinutesChange = (e: SelectChangeEvent<string>) => {
    setMinutes(Number(e.target.value));
  };

  return (
    <Box p={4}>
      <Typography variant="h4">Stock Prices</Typography>

      {}
      <Box mt={2} display="flex" gap={2}>
        <Select value={ticker} onChange={handleTickerChange} displayEmpty>
          {tickers.map((t) => (
            <MenuItem key={t} value={t}>
              {t}
            </MenuItem>
          ))}
        </Select>

        <Select value={minutes.toString()} onChange={handleMinutesChange}>
          {intervals.map((m) => (
            <MenuItem key={m} value={m.toString()}>
              {m} min
            </MenuItem>
          ))}
        </Select>
      </Box>

      <Box mt={4}>
        {loading ? (
          <Typography>Loading...</Typography>
        ) : error ? (
          <Typography color="error">{error}</Typography>
        ) : data ? (
          <>
            {}
            <Typography variant="h6">
              Average: {data.averageStockPrice !== null ? data.averageStockPrice.toFixed(2) : 'N/A'}
            </Typography>
            <StockChart data={data.priceHistory} average={data.averageStockPrice} />
          </>
        ) : (
          <Typography>No data available</Typography>
        )}
      </Box>
    </Box>
  );
};

export default StockPage;
