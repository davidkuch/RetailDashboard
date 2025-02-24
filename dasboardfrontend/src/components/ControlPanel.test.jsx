import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import ControlPanel from './ControlPanel';
import DisplayTypes from '../consts/DisplayTypes';

// Mock the FilterForm component
jest.mock('./FilterForm', () => ({
  __esModule: true,
  default: ({ onApplyFilters }) => (
    <button onClick={() => onApplyFilters({ fromDate: '2022-01-01', toDate: '2022-12-31' })}>
      Apply Filters
    </button>
  ),
}));

describe('ControlPanel Component', () => {
  let setDisplayType;
  let setFilters;

  beforeEach(() => {
    // Mock the setDisplayType and setFilters functions
    setDisplayType = jest.fn();
    setFilters = jest.fn();
  });

  test('renders all buttons', () => {
    render(<ControlPanel setDisplayType={setDisplayType} setFilters={setFilters} />);

    // Check if the button text is rendered correctly
    expect(screen.getByText('Total Number of Sales per month')).toBeInTheDocument();
    expect(screen.getByText('Sales by Product Category')).toBeInTheDocument();
    expect(screen.getByText('Leaders Board')).toBeInTheDocument();
  });

  test('clicking on "Total Number of Sales per month" button calls setDisplayType with correct argument', () => {
    render(<ControlPanel setDisplayType={setDisplayType} setFilters={setFilters} />);

    const button = screen.getByText('Total Number of Sales per month');
    fireEvent.click(button);

    // Verify that setDisplayType was called with the correct argument
    expect(setDisplayType).toHaveBeenCalledWith(DisplayTypes.TotalSalesPerMonth);
  });

  test('clicking on "Sales by Product Category" button calls setDisplayType with correct argument', () => {
    render(<ControlPanel setDisplayType={setDisplayType} setFilters={setFilters} />);

    const button = screen.getByText('Sales by Product Category');
    fireEvent.click(button);

    // Verify that setDisplayType was called with the correct argument
    expect(setDisplayType).toHaveBeenCalledWith(DisplayTypes.SaleByProductCategory);
  });

  test('clicking on "Leaders Board" button calls setDisplayType with correct argument', () => {
    render(<ControlPanel setDisplayType={setDisplayType} setFilters={setFilters} />);

    const button = screen.getByText('Leaders Board');
    fireEvent.click(button);

    // Verify that setDisplayType was called with the correct argument
    expect(setDisplayType).toHaveBeenCalledWith(DisplayTypes.LeadersBoard);
  });

  test('clicking on "Apply Filters" button calls setFilters with the correct filters', () => {
    render(<ControlPanel setDisplayType={setDisplayType} setFilters={setFilters} />);

    const applyFiltersButton = screen.getByText('Apply Filters');
    fireEvent.click(applyFiltersButton);

    // Verify that setFilters was called with the expected filter data
    expect(setFilters).toHaveBeenCalledWith({ fromDate: '2022-01-01', toDate: '2022-12-31' });
  });
});
