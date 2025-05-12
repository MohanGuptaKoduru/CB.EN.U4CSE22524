import React from 'react';
import { Line } from 'react-chartjs-2';

interface CorrelationChartProps {
  data: { x: string; y: string; v: number }[];
}

const CorrelationChart: React.FC<CorrelationChartProps> = ({ data }) => {
  const chartData = {
    labels: data.map((point) => point.x),
    datasets: [
      {
        label: 'Correlation Value',
        data: data.map((point) => point.v),
        borderColor: 'rgba(75, 192, 192, 1)',
        tension: 0.1,
      },
    ],
  };

  return (
    <div>
      <Line data={chartData} />
    </div>
  );
};

export default CorrelationChart;
