using RetailDashboard.models;

namespace RetailDashboard.FirstKAlgorithm
{
    public interface IFirstKAlgorithm
    {
        public IEnumerable<SalesSummaryRecord> TopKSellingProducts(IEnumerable<Sales> sales, int k);
    }
}
