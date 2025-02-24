import React from "react";
import { render, screen } from "@testing-library/react";
import SalesByCategory from "./SalesByCategory";
import SetupData from "../ChartDisplayCalculationUtils/SalesByCategory";
import { Doughnut } from "react-chartjs-2";

// Mock the SetupData function
jest.mock("../ChartDisplayCalculationUtils/SalesByCategory", () => jest.fn());

// Mock Doughnut component to avoid rendering issues
jest.mock("react-chartjs-2", () => ({
  Doughnut: jest.fn(() => <div data-testid="doughnut-chart" />),
}));

describe("SalesByCategory Component", () => {
  afterEach(() => {
    jest.clearAllMocks(); // Reset mocks after each test
  });

  test("renders without crashing", () => {
    render(<SalesByCategory data={[]} />);
    expect(screen.getByTestId("doughnut-chart")).toBeInTheDocument();
  });

  test("calls SetupData with provided data", () => {
    const mockData = [
      { category: "Electronics", totalSales: 500 },
      { category: "Clothing", totalSales: 300 },
    ];

    render(<SalesByCategory data={mockData} />);
    expect(SetupData).toHaveBeenCalledWith(mockData);
  });

  test("renders the Doughnut chart when data is provided", () => {
    const mockData = [{ category: "Furniture", totalSales: 200 }];
    render(<SalesByCategory data={mockData} />);
    
    expect(screen.getByTestId("doughnut-chart")).toBeInTheDocument();
  });

  test("handles empty data properly", () => {
    render(<SalesByCategory data={[]} />);
    expect(SetupData).toHaveBeenCalledWith([]);
    expect(screen.getByTestId("doughnut-chart")).toBeInTheDocument();
  });
});
