using System.Collections.Generic;
using System.Linq;
using Xunit;
using Moq;
using RetailDashboard.models;

namespace RetailDashboard.FirstKAlgorithm
{
    

    public class FirstKAlgorithmTests
    {
        private readonly IFirstKAlgorithm _algorithm;

        public FirstKAlgorithmTests()
        {
            _algorithm = new MinHeapImp(); 
        }

        [Fact]
        public void TopKSellingProducts_Returns_Correct_Top_K_Products()
        {
            // Arrange
            var sales = new List<Sales>
        {
            new Sales { ProductName = "Product A", TotalPrice = 500 },
            new Sales { ProductName = "Product B", TotalPrice = 300 },
            new Sales { ProductName = "Product C", TotalPrice = 700 },
            new Sales { ProductName = "Product D", TotalPrice = 100 }
        };

            int k = 2;

            // Act
            var result = _algorithm.TopKSellingProducts(sales, k).ToList();

            // Assert
            Assert.Equal(k, result.Count);
            Assert.Contains(result, r => r.ProductName =="Product C"); // Highest sales
            Assert.Contains(result, r => r.ProductName == "Product A");
        }

        [Fact]
        public void TopKSellingProducts_Returns_All_If_K_Greater_Than_List()
        {
            // Arrange
            var sales = new List<Sales>
        {
            new Sales { ProductName = "Product A", TotalPrice = 500 },
            new Sales { ProductName = "Product B", TotalPrice = 300 }
        };

            int k = 5; // More than available products

            // Act
            var result = _algorithm.TopKSellingProducts(sales, k).ToList();

            // Assert
            Assert.Equal(2, result.Count); // Should return all items
        }

        [Fact]
        public void TopKSellingProducts_Returns_Empty_When_Input_Is_Empty()
        {
            // Arrange
            var sales = new List<Sales>();

            int k = 3;

            // Act
            var result = _algorithm.TopKSellingProducts(sales, k);

            // Assert
            Assert.Empty(result);
        }

        [Fact]
        public void TopKSellingProducts_Returns_Empty_When_K_Is_Zero()
        {
            // Arrange
            var sales = new List<Sales>
        {
            new Sales { ProductName = "Product A", TotalPrice = 500 }
        };

            int k = 0;

            // Act
            var result = _algorithm.TopKSellingProducts(sales, k);

            // Assert
            Assert.Empty(result);
        }

        [Fact]
        public void TopKSellingProducts_Returns_Correct_Results_With_Ties()
        {
            // Arrange
            var sales = new List<Sales>
        {
            new Sales { ProductName = "Product A", TotalPrice = 500 },
            new Sales { ProductName = "Product B", TotalPrice = 500 },
            new Sales { ProductName = "Product C", TotalPrice = 300 }
        };

            int k = 2;

            // Act
            var result = _algorithm.TopKSellingProducts(sales, k).ToList();

            // Assert
            Assert.Equal(k, result.Count);
            Assert.Contains(result, r => r.ProductName == "Product A");
            Assert.Contains(result, r => r.ProductName == "Product B");
        }
    }

}
