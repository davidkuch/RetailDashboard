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
import DisplayTypes from "../consts/DisplayTypes";

// Register the components used in the chart
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export default function ChartContainer({ displayType, data, loading, error })
{
      // Handle loading and error states
    if (error) {
        return <p style={{ color: "red" }}>Error: {error}</p>;
    }

    if (loading) {
        return <p>Loading...</p>;
    }

    if (!data) {
    return <p>Please Fetch data</p>;
  }

  if (data.length === 0) {
    return <p>No data available</p>;
  }

  if (!displayType)
  {
    return <p>Please select Display Type</p>;
  }

  
debugger;

let displayContent;

switch (displayType) {
    case DisplayTypes.TotalSalesPerMonth:
        displayContent = getTotalSalesPerMonthDisplay(data);
}
  

  return (
    <div className="content">
      <h2>Chart Display</h2>
    {displayContent}
    </div>
  );
}

function getTotalSalesPerMonthDisplay(data)
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
      },
    },
  };

  return   (<Bar data={chartData} options={chartOptions} />);
}