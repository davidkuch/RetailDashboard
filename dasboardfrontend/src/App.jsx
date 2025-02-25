import { useState } from 'react'
import { useEffect } from 'react';
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

  // Runs only once on component mount
    useEffect(() => {
      axios
        .get("https://localhost:5001/Sales") // TODO: extract to config
        .then((response) => {
          setData(response.data);
          setLoading(false);
        })
        .catch((error) => {
          console.error("Error fetching sales data:", error);
          setError("Failed to load sales data");
          setLoading(false);
        });
    }, []); 

    useEffect(() => {
      axios
        .get("https://localhost:5001/Sales/5") // TODO: extract to config
        .then((response) => {
          setLeaderData(response.data);
          setLoading(false);
        })
        .catch((error) => {
          console.error("Error fetching leader data:", error);
          setError("Failed to load leader data");
          setLoading(false);
        });
    }, []);

  return (
    <div className='container'>    
        <ControlPanel setDisplayType={setDisplayType} setFilters={setFilters}/>  
        <ChartContainer displayType={displayType} data={data} leaderData={leaderData} loading={loading} error={error} filters={filters}/>
    </div>
  )
}

export default App
