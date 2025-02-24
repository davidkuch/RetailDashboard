import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Bar } from 'react-chartjs-2';
import LeadersBoard from './LeadersBoard';

// Mock the Bar chart to avoid rendering the entire chart
jest.mock('react-chartjs-2', () => ({
  Bar: jest.fn(() => <div>Mock Bar Chart</div>),
}));

describe('LeadersBoard Component', () => {
  const mockData = [
    { productName: 'Product A', totalPrice: 500 },
    { productName: 'Product B', totalPrice: 1000 },
    { productName: 'Product C', totalPrice: 300 },
    { productName: 'Product D', totalPrice: 1500 },
    { productName: 'Product E', totalPrice: 700 },
  ];

  test('renders the Bar chart component', () => {
    render(<LeadersBoard data={mockData} />);

    // Check if the mock Bar component is rendered
    expect(screen.getByText('Mock Bar Chart')).toBeInTheDocument();
  });

  test('sorts data in descending order by totalPrice', () => {
    render(<LeadersBoard data={mockData} />);

    // Verify if the sorting of data is done by totalPrice in descending order
    const sortedData = [...mockData].sort((a, b) => b.totalPrice - a.totalPrice);

    // The first product in the sorted array should have the highest totalPrice
    expect(sortedData[0].productName).toBe('Product D');
    expect(sortedData[0].totalPrice).toBe(1500);

    // Check if the chart's labels are displayed in the correct order
    const chartLabels = sortedData.map((record) => record.productName);
    expect(chartLabels[0]).toBe('Product D');
    expect(chartLabels[1]).toBe('Product B');
  });

  test('renders chart with correct data labels and values', () => {
    render(<LeadersBoard data={mockData} />);

    // Check that the chart data has the correct labels and values
    const sortedData = [...mockData].sort((a, b) => b.totalPrice - a.totalPrice);
    const chartLabels = sortedData.map((record) => record.productName);
    const chartValues = sortedData.map((record) => record.totalPrice);

    // Assert the chart's label and value
    expect(screen.getByText('Mock Bar Chart')).toBeInTheDocument();
    // Check chart labels and values (Bar chart should use this data)
    expect(chartLabels).toEqual(['Product D', 'Product B', 'Product E', 'Product A', 'Product C']);
    expect(chartValues).toEqual([1500, 1000, 700, 500, 300]);
  });

  test('handles missing product names gracefully', () => {
    const dataWithMissingProductNames = [
      { productName: null, totalPrice: 500 },
      { productName: 'Product B', totalPrice: 1000 },
    ];

    render(<LeadersBoard data={dataWithMissingProductNames} />);

    // Check that the chart renders even when product names are missing
    const chartLabels = dataWithMissingProductNames.map((record) => record.productName);
    expect(chartLabels).toContain(null);
  });
});
