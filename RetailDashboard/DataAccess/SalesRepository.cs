using Microsoft.EntityFrameworkCore;
using RetailDashboard.models;

namespace RetailDashboard.DataAccess
{
    public class SalesRepository : ISalesRepository
    {
        private readonly RetailDashboardContext _context;

        public SalesRepository(RetailDashboardContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<Sales>> GetSalesAsync()
        {
            return await _context.Sales.ToListAsync();
        }
       
        public async Task<Sales> AddSalesAsync(Sales sales)
        {
            _context.Sales.Add(sales);
            await _context.SaveChangesAsync();
            return sales;
        }
       
    }
}
