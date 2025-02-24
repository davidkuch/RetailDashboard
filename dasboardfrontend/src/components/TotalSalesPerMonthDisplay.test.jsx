import React from "react";
import { render, screen } from "@testing-library/react";
import TotalSalesPerMonthDisplay from "./TotalSalesPerMonthDisplay"; // Adjust path as needed
import SetupData from "../ChartDisplayCalculationUtils/SalesOverTime";
import { Bar } from "react-chartjs-2";

// Mock the SetupData function
jest.mock("../ChartDisplayCalculationUtils/SalesOverTime", () => jest.fn());

// Mock Bar component to avoid rendering issues
jest.mock("react-chartjs-2", () => ({
  Bar: jest.fn(() => <div data-testid="bar-chart" />),
}));

describe("TotalSalesPerMonthDisplay Component", () => {
  afterEach(() => {
    jest.clearAllMocks(); // Reset mocks after each test
  });

  test("renders without crashing", () => {
    render(<TotalSalesPerMonthDisplay data={[]} />);
    expect(screen.getByTestId("bar-chart")).toBeInTheDocument();
  });

  test("calls SetupData with provided data", () => {
    const mockData = [
      { month: "January", totalSales: 500 },
      { month: "February", totalSales: 300 },
    ];

    render(<TotalSalesPerMonthDisplay data={mockData} />);
    expect(SetupData).toHaveBeenCalledWith(mockData);
  });

  test("renders the Bar chart when data is provided", () => {
    const mockData = [{ month: "March", totalSales: 200 }];
    render(<TotalSalesPerMonthDisplay data={mockData} />);
    
    expect(screen.getByTestId("bar-chart")).toBeInTheDocument();
  });

  test("handles empty data properly", () => {
    render(<TotalSalesPerMonthDisplay data={[]} />);
    expect(SetupData).toHaveBeenCalledWith([]);
    expect(screen.getByTestId("bar-chart")).toBeInTheDocument();
  });
});
