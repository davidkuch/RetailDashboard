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

        public async Task<Sales> GetSalesByIdAsync(int id)
        {
            return await _context.Sales.FindAsync(id);
        }

        public async Task<Sales> AddSalesAsync(Sales sales)
        {
            _context.Sales.Add(sales);
            await _context.SaveChangesAsync();
            return sales;
        }

        public async Task<Sales> UpdateSalesAsync(Sales sales)
        {
            _context.Entry(sales).State = EntityState.Modified;
            await _context.SaveChangesAsync();
            return sales;
        }

        public async Task DeleteSalesAsync(int id)
        {
            var sales = await _context.Sales.FindAsync(id);
            if (sales != null)
            {
                _context.Sales.Remove(sales);
                await _context.SaveChangesAsync();
            }
        }
    }
}
