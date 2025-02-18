using RetailDashboard.models;

namespace RetailDashboard.DataAccess
{
    public interface ISalesRepository
    {
        Task<IEnumerable<Sales>> GetSalesAsync();
        Task<Sales> GetSalesByIdAsync(int id);
        Task<Sales> AddSalesAsync(Sales sales);
        Task<Sales> UpdateSalesAsync(Sales sales);
        Task DeleteSalesAsync(int id);
    }
}
