import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js"; // Import necessary Chart.js modules
import DisplayTypes from "../consts/DisplayTypes";
import TotalSalesPerMonthDisplay from "./TotalSalesPerMonthDisplay";
import SalesByCategory from "./SalesByCategory";
import LeadersBoard from "./LeadersBoard";


// Register the components used in the chart
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export default function ChartContainer({ displayType, data, leaderData, loading, error, filters }) {
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
debugger;
  if (data.length === 0) {
    return <p>No data available</p>;
  }

  if (!displayType) {
    return <p>Please select Display Type</p>;
  }

  let dataToDisplay = data;

  if (filters) {
    dataToDisplay = ApplyFilters(data, filters);   
  }
  else {
    dataToDisplay = data;
  }

  if (dataToDisplay.length === 0) {
    return <p>No data available after filtering</p>;
  }

  let displayContent;

  switch (displayType) {
    case DisplayTypes.TotalSalesPerMonth:
      displayContent = <TotalSalesPerMonthDisplay data={dataToDisplay} />;
      break;
    case DisplayTypes.SaleByProductCategory:
      displayContent = <SalesByCategory data={dataToDisplay} />;
      break;
    case DisplayTypes.LeadersBoard:
      displayContent = <LeadersBoard data={leaderData} />;
      break;
  }


  return (
    <div className="content">
      <h2>Chart Display</h2>
      {displayContent}
    </div>
  );
}

function ApplyFilters(sales, filter) {
  const { fromDate, toDate } = filter;
  return sales.filter(sale => {
    const saleDate = new Date(sale.saleDate); // Convert SaleDate to Date object
    return saleDate >= new Date(fromDate) && saleDate <= new Date(toDate);
  });
}
