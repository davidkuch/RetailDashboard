using RetailDashboard.models;

namespace RetailDashboard.DataAccess
{
    public interface ISalesRepository
    {
        Task<IEnumerable<Sales>> GetSalesAsync();
        Task<Sales> AddSalesAsync(Sales sales);
    }
}
