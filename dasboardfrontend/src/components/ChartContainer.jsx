import React from "react";
import { Bar } from "react-chartjs-2"; // Import the Bar chart from react-chartjs-2
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js"; // Import necessary Chart.js modules
import SetupData from "../ChartDisplayCalculationUtils/SalesOverTime";

// Register the components used in the chart
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export default function ChartContainer({ data, loading, error })
{
      // Handle loading and error states
  if (loading) {
    return <p>Loading...</p>;
  }
  
  if (error) {
    return <p style={{ color: "red" }}>Error: {error}</p>;
  }

  // Handle case when no data is available
  if (!data || data.length === 0) {
    return <p>No data available</p>;
  }
debugger;
    // Prepare the data for the chart
  const chartData = SetupData(data);

  const chartOptions = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: "Data Chart", // Chart title
      },
      tooltip: {
        mode: "index",
        intersect: false,
      },
    },
    scales: {
      x: {
        beginAtZero: true,
      },
    },
  };

  return (
    <div className="content">
      <h2>Chart Display</h2>
      <Bar data={chartData} options={chartOptions} />
    </div>
  );
}