# Retail Dashboard  

## Overview  
This project consists of three components:  
1. **Retail Dashboard .NET Backend**  
2. **Retail Dashboard React Frontend**  
3. **SQL Server Database**  

## 1. Backend  
The backend is an **ASP.NET Core Web API** project that uses **Entity Framework Core** to connect to the database.  

### Exposed APIs:  
- **Get all sale entries**  
- **Add a sale entry**  
- **Get the top K products** based on total sales  

To efficiently retrieve the top K products, the backend uses a **min-heap-based algorithm**. The min-heap stores up to K entries at a time. When a new entry arrives, it is inserted only if it is greater than the current minimum; if so, the minimum is removed to maintain the heap size.  

## 2. Frontend  
The frontend is a **React app** that communicates with the backend using **Axios** and includes **Jest** for unit testing.  

### Features:  
The app provides three different data visualizations:  
1. **Total sales per category per month** – Bar chart  
2. **Sales per category across all months** – Pie chart  
3. **Top K products based on total sales** – Horizontal bar chart  

The first two visualizations support filtering by **time range** and **product category**.  

## Future Improvements & Current Limitations  
- The **backend does not currently support filtering** by time range and product category; these filters are applied on the frontend.  
- The **Leaderboard display** does not currently allow users to **change the number of top products** displayed.  

Here’s an improved version with better clarity and structure:  

---

## Setup  

### Backend  
1. Open **Visual Studio**.  
2. Build the `RetailDashboard.sln` solution.  
3. Start the **Retail Dashboard** project.  

### Frontend  
1. Navigate to the frontend directory:  
   ```sh
   cd RetailDashboard/dashboard
   ```  
2. Install dependencies:  
   ```sh
   npm install
   ```  
3. Build the project:  
   ```sh
   npm build
   ```  
4. Start the frontend:  
   ```sh
   npm start
   ```  
