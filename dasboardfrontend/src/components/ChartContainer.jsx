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
        displayContent = <TotalSalesPerMonthDisplay data={data}/>;
        break;
    case DisplayTypes.SaleByProductCategory:
        displayContent = getSaleByProductCategoryDisplay(data);
}
  

  return (
    <div className="content">
      <h2>Chart Display</h2>
   {displayContent}
    </div>
  );
}



function  getSaleByProductCategoryDisplay(data)
{

}