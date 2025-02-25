import React from "react";
import { Bar } from "react-chartjs-2"; 

import SetupData from "../ChartDisplayCalculationUtils/SalesOverTime";

export default function TotalSalesPerMonthDisplay({data})
{
  const chartData = SetupData(data);

  const chartOptions = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: "Total Number of Sales per month", 
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