import React from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import SetupData from "../ChartDisplayCalculationUtils/SalesByCategory";

ChartJS.register(ArcElement, Tooltip, Legend);


export default function SalesByCategory({data})
{
  const chartData = SetupData(data);

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false
  };

  return   (<Doughnut data={chartData} options={chartOptions} />);
}