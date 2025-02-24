   using Microsoft.EntityFrameworkCore;
   using RetailDashboard.models;

   namespace RetailDashboard.DataAccess
   {
       public static class DataSeeder
       {
           public static void Seed(RetailDashboardContext context)
           {
               if (!context.Sales.Any())
               {
                   var salesData = new List<Sales>
                   {
                       new Sales { ProductName = "Product A", Category = "Category A", Quantity = 10, UnitPrice = 20.5f, TotalPrice = 205.0f, SaleDate = new DateTime(2025, 2, 20) },
                       new Sales { ProductName = "Product B", Category = "Category B", Quantity = 13, UnitPrice = 22.5f, TotalPrice = 292.5f, SaleDate = new DateTime(2025, 8, 20) },
                       new Sales { ProductName = "Product XS", Category = "Category BGG", Quantity = 13, UnitPrice = 22.5f, TotalPrice = 292.5f, SaleDate = new DateTime(2025, 9, 20) },
                       new Sales { ProductName = "Product FFF", Category = "Category B", Quantity = 13, UnitPrice = 22.5f, TotalPrice = 292.5f, SaleDate = new DateTime(2025, 6, 20) },
                       // Add more data as needed
                   };

                   context.Sales.AddRange(salesData);
                   context.SaveChanges();
               }
           }
       }
   }
   