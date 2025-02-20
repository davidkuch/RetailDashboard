import React, { useState } from "react";


export default function  ControlPanel({ fetchData }){
  
    
    return (
        <div className="sidebar">
            <button onClick={fetchData}>Fetch Data</button>
        </div>
    )
}