import React from "react";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, Tooltip, Legend } from "chart.js";

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const LeadersBoard = ({ data }) => {
  // Sorting data in descending order of TotalPrice
  const sortedData = [...data].sort((a, b) => b.totalPrice - a.totalPrice);

  // Extract labels (product names) and values (total sales)
  const labels = sortedData.map((record) => record.productName);
  const values = sortedData.map((record) => record.totalPrice);

  const chartData = {
    labels: labels,
    datasets: [
      {
        label: "Total Sales ($)",
        data: values,
        backgroundColor: "rgba(75, 192, 192, 0.6)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
    ],
  };

  const options = {
    indexAxis: "y", // Horizontal bar chart
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        beginAtZero: true,
      },
    },
    plugins: {
      legend: {
        display: true,
      },
      title: {
        display: true,
        text: "5 Top by Total Price across sales", 
      },
    },
  };

  return (
    <div style={{ width: "100%", height: "400px" }}>
      <Bar data={chartData} options={options} />
    </div>
  );
};

export default LeadersBoard;
