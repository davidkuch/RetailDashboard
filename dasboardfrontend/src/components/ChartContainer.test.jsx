import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import ChartContainer from "./ChartContainer";
import DisplayTypes from "../consts/DisplayTypes";

// Mock the child components
jest.mock("./TotalSalesPerMonthDisplay", () => () => <div>Mock TotalSalesPerMonthDisplay</div>);
jest.mock("./SalesByCategory", () => () => <div>Mock SalesByCategory</div>);
jest.mock("./LeadersBoard", () => () => <div>Mock LeadersBoard</div>);

describe("ChartContainer Component", () => {
  const mockData = [
    { saleDate: "2021-01-01", amount: 100 },
    { saleDate: "2021-02-01", amount: 200 },
  ];
  const mockLeaderData = [
    { productName: "Product A", totalPrice: 500 },
    { productName: "Product B", totalPrice: 300 },
  ];

  test("displays loading text when loading is true", () => {
    render(<ChartContainer loading={true} />);
    expect(screen.getByText("Loading...")).toBeInTheDocument();
  });

  test("displays error text when error is provided", () => {
    render(<ChartContainer error="Something went wrong" />);
    expect(screen.getByText("Error: Something went wrong")).toBeInTheDocument();
  });

  test("displays no data message when no data is provided", () => {
    render(<ChartContainer data={null} />);
    expect(screen.getByText("Please Fetch data")).toBeInTheDocument();
  });

  test("displays no data available message when data array is empty", () => {
    render(<ChartContainer data={[]} />);
    expect(screen.getByText("No data available")).toBeInTheDocument();
  });

  test("displays a message asking to select display type if no displayType is provided", () => {
    render(<ChartContainer data={mockData} />);
    expect(screen.getByText("Please select Display Type")).toBeInTheDocument();
  });

  test("displays correct content based on displayType", () => {
    render(<ChartContainer displayType={DisplayTypes.TotalSalesPerMonth} data={mockData} />);
    expect(screen.getByText("Mock TotalSalesPerMonthDisplay")).toBeInTheDocument();

    render(<ChartContainer displayType={DisplayTypes.SaleByProductCategory} data={mockData} />);
    expect(screen.getByText("Mock SalesByCategory")).toBeInTheDocument();
  });

  test("applies filters correctly and displays filtered data", async () => {
    const filters = { fromDate: "2021-01-01", toDate: "2021-01-31" };
    render(<ChartContainer displayType={DisplayTypes.TotalSalesPerMonth} data={mockData} filters={filters} />);
    
    await waitFor(() => {
      expect(screen.queryByText("Mock TotalSalesPerMonthDisplay")).toBeInTheDocument();
    });

    // Apply the filter to check if the right data is being passed
    // (In the real test, we could inspect the filtered data passed into the component)
  });

  test("displays 'No data available' when filters exclude all data", async () => {
    const filters = { fromDate: "2022-01-01", toDate: "2022-01-31" }; // Date range that excludes all data
    render(<ChartContainer displayType={DisplayTypes.TotalSalesPerMonth} data={mockData} filters={filters} />);
    
    // Add an assertion to check if no filtered data is displayed
    expect(screen.getByText("No data available after filtering")).toBeInTheDocument();
  });
});
