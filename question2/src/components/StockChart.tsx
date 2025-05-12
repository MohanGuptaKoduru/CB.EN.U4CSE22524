import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, LineElement, CategoryScale, LinearScale, PointElement } from 'chart.js';

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement);

interface Props {
  data: { price: number; lastUpdatedAt: string }[];
  average: number;
}

const StockChart: React.FC<Props> = ({ data, average }) => {
  const labels = data.map((item) => new Date(item.lastUpdatedAt).toLocaleTimeString());
  const prices = data.map((item) => item.price);

  return (
    <Line
      data={{
        labels,
        datasets: [
          {
            label: 'Stock Price',
            data: prices,
            borderColor: 'blue',
            fill: false,
          },
          {
            label: 'Average Price',
            data: new Array(data.length).fill(average),
            borderColor: 'red',
            borderDash: [5, 5],
            fill: false,
          },
        ],
      }}
    />
  );
};

export default StockChart;
