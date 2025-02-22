import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Select from "react-select";

const FilterForm = ({ categories, onApplyFilters }) => {
  const [tempFilters, setTempFilters] = useState({
    fromDate: null,
    toDate: null,
    selectedCategories: [],
  });

  const handleApplyFilters = () => {
    onApplyFilters(tempFilters);
  };

  return (
    <div className="p-4 border rounded-lg shadow-md w-96">
      <h2 className="text-lg font-semibold mb-2">Filter Options</h2>
      
      {/* From Date Picker */}
      <label className="block mb-1">From Date:</label>
      <DatePicker
        selected={tempFilters.fromDate}
        onChange={(date) => setTempFilters({ ...tempFilters, fromDate: date })}
        className="border p-2 w-full mb-2"
      />
      
      {/* To Date Picker */}
      <label className="block mb-1">To Date:</label>
      <DatePicker
        selected={tempFilters.toDate}
        onChange={(date) => setTempFilters({ ...tempFilters, toDate: date })}
        className="border p-2 w-full mb-2"
      />
      
      {/* Category Selector */}
      <label className="block mb-1">Categories:</label>
      <Select
        options={categories.map(cat => ({ value: cat, label: cat }))}
        isMulti
        value={tempFilters.selectedCategories}
        onChange={(selected) => setTempFilters({ ...tempFilters, selectedCategories: selected })}
        className="mb-4"
      />
      
      {/* Apply Filters Button */}
      <button
        onClick={handleApplyFilters}
        className="bg-blue-500 text-white py-2 px-4 rounded w-full hover:bg-blue-600"
      >
        Apply Filters
      </button>
    </div>
  );
};

export default FilterForm;
