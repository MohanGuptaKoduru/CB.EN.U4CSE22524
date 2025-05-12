import React, { useState, useEffect } from 'react';
import { getCorrelationData } from '../services/api'; // Ensure this function is correctly defined
import { Box, Select, MenuItem, Typography } from '@mui/material';
import CorrelationChart from '../components/CorrelationChart'

interface CorrelationDataPoint {
  x: string;  
  y: string;  
  v: number;  
}

const CorrelationPage: React.FC = () => {
  const [stock1, setStock1] = useState<string>('AAPL');
  const [stock2, setStock2] = useState<string>('GOOGL');
  const [minutes, setMinutes] = useState<number>(15);
  const [correlationData, setCorrelationData] = useState<CorrelationDataPoint[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  
  const fetchData = async () => {
    setLoading(true);
    try {
      const res = await getCorrelationData(stock1, stock2, minutes);
      setCorrelationData(res.data as CorrelationDataPoint[]);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

 
  useEffect(() => {
    fetchData();
  }, [stock1, stock2, minutes]);

  return (
    <Box p={4}>
      <Typography variant="h4">Correlation between {stock1} and {stock2}</Typography>

      {}
      <Box mt={2} display="flex" gap={2}>
        <Select value={stock1} onChange={(e) => setStock1(e.target.value)} displayEmpty>
          {['AAPL', 'GOOGL', 'NVDA', 'AMZN'].map((ticker) => (
            <MenuItem key={ticker} value={ticker}>
              {ticker}
            </MenuItem>
          ))}
        </Select>

        {}
        <Select value={stock2} onChange={(e) => setStock2(e.target.value)} displayEmpty>
          {['AAPL', 'GOOGL', 'NVDA', 'AMZN'].map((ticker) => (
            <MenuItem key={ticker} value={ticker}>
              {ticker}
            </MenuItem>
          ))}
        </Select>

        {}
        <Select value={minutes.toString()} onChange={(e) => setMinutes(Number(e.target.value))} displayEmpty>
          {[15, 30, 60].map((min) => (
            <MenuItem key={min} value={min.toString()}>
              {min} min
            </MenuItem>
          ))}
        </Select>
      </Box>

      {}
      <Box mt={4}>
        {loading ? (
          <Typography>Loading...</Typography>
        ) : (
          <>
            <Typography variant="h6">Correlation Data</Typography>
            <CorrelationChart data={correlationData} />
          </>
        )}
      </Box>
    </Box>
  );
};

export default CorrelationPage;
