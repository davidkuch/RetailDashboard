import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Select from "react-select";

const FilterForm = ({onApplyFilters }) => {
  const [tempFilters, setTempFilters] = useState({
    fromDate: null,
    toDate: null,
  });

  const handleApplyFilters = () => {
    onApplyFilters(tempFilters);
  };

  return (
    <div className="filter-form">
      <h2 >Filter Options</h2>
      
      <label >From Date:</label>
      <DatePicker
        selected={tempFilters.fromDate}
        onChange={(date) => setTempFilters({ ...tempFilters, fromDate: date })}
        className="date-picker"
      />
      
      <label >To Date:</label>
      <DatePicker
        selected={tempFilters.toDate}
        onChange={(date) => setTempFilters({ ...tempFilters, toDate: date })}
        className="date-picker"
      />
      
      <button
        onClick={handleApplyFilters}
        className="sidebar-button"
      >
        Apply Filters
      </button>
    </div>
  );
};

export default FilterForm;
