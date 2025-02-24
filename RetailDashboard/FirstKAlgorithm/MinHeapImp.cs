using RetailDashboard.models;

namespace RetailDashboard.FirstKAlgorithm
{
    public class MinHeapImp : IFirstKAlgorithm
    {
        public IEnumerable<SalesSummaryRecord> TopKSellingProducts(IEnumerable<Sales> sales, int k)
        {
            if (k <= 0) return [];

            List<SalesSummaryRecord> all = CreateSalesSummary(sales);
         
            // Min-Heap (PriorityQueue) - keeps K highest elements
            var minHeap = new PriorityQueue<SalesSummaryRecord, float>();

            foreach (var record in all)
            {
                minHeap.Enqueue(record, record.TotalPrice);

                // If heap exceeds K, remove the smallest element
                if (minHeap.Count > k)
                    minHeap.Dequeue();
            }

            // Extract elements in descending order
            var result = new List<SalesSummaryRecord>();
            while (minHeap.Count > 0)
            {
                result.Add(minHeap.Dequeue());
            }

            return result;
        }

        private static List<SalesSummaryRecord> CreateSalesSummary(IEnumerable<Sales> sales)
        {
            List<SalesSummaryRecord> ret = new();

            Dictionary<string, float> productToTotalPrice = new();

            foreach (Sales s in sales)
            {
                if (productToTotalPrice.ContainsKey(s.ProductName!))
                {
                    productToTotalPrice[s.ProductName!] += s.TotalPrice;
                }
                else
                {
                    productToTotalPrice[s.ProductName!] = s.TotalPrice;
                }
            }

            foreach(KeyValuePair<string, float> entry in productToTotalPrice)
            {
                ret.Add(new SalesSummaryRecord { ProductName = entry.Key, TotalPrice = entry.Value });
            }

            return ret;
        }
    }
}
