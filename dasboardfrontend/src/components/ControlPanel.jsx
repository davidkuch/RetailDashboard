import DisplayTypes from "../consts/DisplayTypes";
import FilterForm from "./FilterForm";

export default function  ControlPanel({ fetchData, setDisplayType, setFilters }){
  
    
    return (
        <div className="sidebar">
            <button className="sidebar-button" onClick={fetchData}>Fetch Data</button>
            <button className="sidebar-button" onClick={() => setDisplayType(DisplayTypes.TotalSalesPerMonth)}>Total Number of Sales per month</button>
            <button className="sidebar-button" onClick={() => setDisplayType(DisplayTypes.SaleByProductCategory)}>Sales by Product Category</button>
            <FilterForm onApplyFilters = {setFilters}/>
        </div>
    )
}