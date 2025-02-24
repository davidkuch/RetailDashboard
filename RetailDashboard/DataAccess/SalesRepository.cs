using Microsoft.EntityFrameworkCore;
using RetailDashboard.models;

namespace RetailDashboard.DataAccess
{
    public class SalesRepository : ISalesRepository
    {
        private readonly RetailDashboardContext _context;
        private readonly ILogger<SalesRepository> _logger;

        public SalesRepository(RetailDashboardContext context, ILogger<SalesRepository> logger)
        {
            _context = context;
            _logger = logger;
        }

        // Get all sales
        public async Task<IEnumerable<Sales>> GetSalesAsync()
        {
            try
            {
                _logger.LogInformation("Fetching all sales records from the database.");
                return await _context.Sales.ToListAsync();
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "An error occurred while fetching sales records.");
                throw new Exception("An error occurred while fetching sales data from the database.", ex);
            }
        }

        // Add a new sales record
        public async Task<Sales> AddSalesAsync(Sales sales)
        {
            try
            {
                _logger.LogInformation("Adding a new sales record to the database.");
                _context.Sales.Add(sales);
                await _context.SaveChangesAsync();
                _logger.LogInformation("New sales record added successfully with ID {SalesId}.", sales.Id);
                return sales;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "An error occurred while adding a new sales record.");
                throw new Exception("An error occurred while adding the sales record to the database.", ex);
            }
        }
    }
}
