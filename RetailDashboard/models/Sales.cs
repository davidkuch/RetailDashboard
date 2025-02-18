namespace RetailDashboard.models
{
    public class Sales
    {
        public int Id { get; set; }
        public string? ProductName { get; set; }
        public string? Category { get; set; }
        public int Quantity { get; set; }
        public float UnitPrice { get; set; }
        public float TotalPrice { get; set; }
        public DateTime SaleDate { get; set; }

    }
}
