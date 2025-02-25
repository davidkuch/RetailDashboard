using Microsoft.EntityFrameworkCore;
using RetailDashboard.models;
using System;
using System.Collections.Generic;
using System.Linq;

namespace RetailDashboard.DataAccess
{
    public static class DataSeeder
    {
        private static readonly Random _random = new Random();
        private static readonly string[] Categories = { "Electronics", "Clothing", "Home Appliances", "Books", "Toys" };
        private static readonly Dictionary<string, string[]> ProductNames = new()
        {
            { "Electronics", new[] { "Laptop", "Smartphone", "Tablet" } },
            { "Clothing", new[] { "T-Shirt", "Jeans", "Jacket" } },
            { "Home Appliances", new[] { "Microwave", "Blender", "Vacuum Cleaner" } },
            { "Books", new[] { "Fiction", "Non-Fiction", "Comics" } },
            { "Toys", new[] { "Lego", "Action Figure", "Doll" } }
        };

        public static void Seed(RetailDashboardContext context, int numSales = 250)
        {
            if (!context.Sales.Any())
            {
                var salesData = GenerateRandomSales(numSales);
                context.Sales.AddRange(salesData);
                context.SaveChanges();
            }
        }

        private static List<Sales> GenerateRandomSales(int count)
        {
            var salesList = new List<Sales>();

            for (int i = 0; i < count; i++)
            {
                string category = Categories[_random.Next(Categories.Length)];
                string productName = ProductNames[category][_random.Next(ProductNames[category].Length)];
                int quantity = _random.Next(1, 21);
                float unitPrice = (float)Math.Round(_random.NextDouble() * (500 - 10) + 10, 2);
                float totalPrice = (float)Math.Round(quantity * unitPrice, 2);
                DateTime saleDate = DateTime.Today.AddDays(-_random.Next(1, 365));

                salesList.Add(new Sales
                {
                    ProductName = productName,
                    Category = category,
                    Quantity = quantity,
                    UnitPrice = unitPrice,
                    TotalPrice = totalPrice,
                    SaleDate = saleDate
                });
            }

            return salesList;
        }
    }
}
