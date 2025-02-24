using Microsoft.AspNetCore.Mvc;

using RetailDashboard.DataAccess;
using RetailDashboard.FirstKAlgorithm;
using RetailDashboard.models;

namespace RetailDashboard.Controllers;

[ApiController]
[Route("[controller]")]
public class SalesController : ControllerBase
{
    private readonly ISalesRepository _salesRepository;
    private readonly IFirstKAlgorithm _firstKAlgorithm;
    private readonly ILogger<SalesController> _logger;

    public SalesController(ISalesRepository salesRepository, IFirstKAlgorithm firstKAlgorithm, ILogger<SalesController> logger)
    {
        _salesRepository = salesRepository;
        _firstKAlgorithm = firstKAlgorithm;
        _logger = logger;
    }

    // Get all sales
    [HttpGet(Name = "GetSales")]
    public async Task<IActionResult> GetSales()
    {
        try
        {
            _logger.LogInformation("Fetching all sales records.");
            var sales = await _salesRepository.GetSalesAsync();
            if (sales == null || !sales.Any())
            {
                _logger.LogWarning("No sales records found.");
                return NotFound("No sales records found.");
            }
            return Ok(sales);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "An error occurred while fetching sales records.");
            return StatusCode(500, "An internal error occurred while fetching sales data.");
        }
    }

    // Create new sales record
    [HttpPost]
    public async Task<ActionResult<Sales>> PostSales(Sales sales)
    {
        try
        {
            _logger.LogInformation("Creating a new sales record.");
            var newSales = await _salesRepository.AddSalesAsync(sales);
            _logger.LogInformation("Sales record created successfully with ID {SalesId}.", newSales.Id);
            return CreatedAtAction(nameof(GetSales), new { id = newSales.Id }, newSales);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "An error occurred while adding a new sales record.");
            return StatusCode(500, "An internal error occurred while adding the sales record.");
        }
    }

    // Get top K products by total sales
    [HttpGet("{k}")]
    public async Task<ActionResult<SalesSummaryRecord>> GetTopKProductsByTotalSales(int k)
    {
        // Input validation for 'k'
        if (k <= 0)
        {
            _logger.LogWarning("Invalid input: k must be a positive integer greater than 0. Received value: {K}", k);
            return BadRequest("Invalid input: k must be a positive integer greater than 0.");
        }

        try
        {
            _logger.LogInformation("Fetching top {K} products by total sales.", k);

            var sales = await _salesRepository.GetSalesAsync();
            if (sales == null || !sales.Any())
            {
                _logger.LogWarning("No sales records found.");
                return NotFound("No sales records found.");
            }

            var topK = _firstKAlgorithm.TopKSellingProducts(sales, k);

            if (topK == null || !topK.Any())
            {
                _logger.LogWarning("No products found for the top {K} selling products.", k);
                return NotFound($"No top {k} products found.");
            }

            _logger.LogInformation("Successfully fetched top {K} products.", k);
            return Ok(topK);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "An error occurred while fetching top {K} products by total sales.", k);
            return StatusCode(500, "An internal error occurred while fetching the top products.");
        }
    }
}

