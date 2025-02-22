import { Bar } from "react-chartjs-2"; // Import the Bar chart from react-chartjs-2

import SetupData from "../ChartDisplayCalculationUtils/SalesOverTime";

export default function TotalSalesPerMonthDisplay({data})
{
      // Prepare the data for the chart
  const chartData = SetupData(data);

  const chartOptions = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: "Total Number of Sales per month", // Chart title
      },
      tooltip: {
        mode: "index",
        intersect: false,
      },
    },
    scales: {
      x: {
        beginAtZero: true,
        stacked : true
      },
      y: {
        stacked: true
      }
    },
  };

  return   (<Bar data={chartData} options={chartOptions} />);
}