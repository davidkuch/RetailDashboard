import { useState } from 'react'
import axios from "axios";

import './App.css'
import ControlPanel from './components/ControlPanel'
import ChartContainer from './components/ChartContainer'
import DisplayTypes from './consts/DisplayTypes';

function App() {
  const [data, setData] = useState(null);
  const [displayType, setDisplayType] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState(null);

  const fetchData = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get("https://localhost:5001/Sales");
      setData(response.data); // Set the fetched data from response
    } catch (err) {
      setError(err.message); // Set error if the request fails
    } finally {
      setLoading(false); // End loading
    }
  };

  return (
    <div className='container'>    
        <ControlPanel fetchData={fetchData} setDisplayType={setDisplayType} setFilters={setFilters}/>  
        <ChartContainer displayType={displayType} data={data} loading={loading} error={error} filters={filters}/>
    </div>
  )
}

export default App
