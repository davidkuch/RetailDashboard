import React, { useState } from "react";
import DisplayTypes from "../consts/DisplayTypes";


export default function  ControlPanel({ fetchData,setDisplayType }){
  
    
    return (
        <div className="sidebar">
            <button onClick={fetchData}>Fetch Data</button>
            <button onClick={() => setDisplayType(DisplayTypes.TotalSalesPerMonth)}>Display Total Number of Sales per month</button>
        </div>
    )
}