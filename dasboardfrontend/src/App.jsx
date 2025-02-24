import { useState } from 'react'
import axios from "axios";

import './App.css'
import ControlPanel from './components/ControlPanel'
import ChartContainer from './components/ChartContainer'
import DisplayTypes from './consts/DisplayTypes';

function App() {
  const [data, setData] = useState(null);
  const [leaderData, setLeaderData] = useState(null);
  const [displayType, setDisplayType] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState(null);

  const fetchData = async () => {
    setLoading(true);
    setError(null);

    try {

      let url;
      switch (displayType) {
        case DisplayTypes.SaleByProductCategory:
        case DisplayTypes.TotalSalesPerMonth:
          url = "https://localhost:5001/Sales";
          break;
        case DisplayTypes.LeadersBoard:
          url = "https://localhost:5001/Sales/5";

      }

      const response = await axios.get(url);
      switch (displayType) {
        case DisplayTypes.SaleByProductCategory:
        case DisplayTypes.TotalSalesPerMonth:
          setData(response.data);
          break;
        case DisplayTypes.LeadersBoard:
          setLeaderData(response.data);

      }
      
    } catch (err) {
      setError(err.message); // if the request fails
    } finally {
      setLoading(false); // End loading
    }
  };

  return (
    <div className='container'>    
        <ControlPanel fetchData={fetchData} setDisplayType={setDisplayType} setFilters={setFilters}/>  
        <ChartContainer displayType={displayType} data={data} leaderData={leaderData} loading={loading} error={error} filters={filters}/>
    </div>
  )
}

export default App
