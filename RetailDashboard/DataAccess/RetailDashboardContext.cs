using Microsoft.EntityFrameworkCore;
using RetailDashboard.models;

namespace RetailDashboard.DataAccess
{
    public class RetailDashboardContext : DbContext
    {
        public RetailDashboardContext(DbContextOptions<RetailDashboardContext> options)
            : base(options)
        {
        }

        public DbSet<Sales> Sales { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<Sales>(entity =>
            {
                entity.ToTable("SalesTable"); 
                entity.HasKey(e => e.Id); // Primary key
                entity.Property(e => e.ProductName).IsRequired().HasMaxLength(100); 
                entity.Property(e => e.Category).IsRequired().HasMaxLength(50);
                entity.Property(e => e.Quantity).IsRequired();
                entity.Property(e => e.UnitPrice).IsRequired();
                entity.Property(e => e.TotalPrice).IsRequired();
                entity.Property(e => e.SaleDate).IsRequired();
            });
        }
    }
}
