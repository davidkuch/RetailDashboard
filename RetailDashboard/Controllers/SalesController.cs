using Microsoft.AspNetCore.Mvc;

using Microsoft.AspNetCore.Mvc;
using RetailDashboard.DataAccess;
using RetailDashboard.models;

namespace RetailDashboard.Controllers;

[ApiController]
[Route("[controller]")]
public class SalesController : ControllerBase
{
    private readonly ISalesRepository _salesRepository;
    private readonly ILogger<SalesController> _logger;

    public SalesController(ISalesRepository salesRepository, ILogger<SalesController> logger)
    {
        _salesRepository = salesRepository;
        _logger = logger;
    }

    [HttpGet(Name = "GetSales")]
    public async Task<IEnumerable<Sales>> GetSales()
    {
        return await _salesRepository.GetSalesAsync();
    }

    [HttpPost]
    public async Task<ActionResult<Sales>> PostSales(Sales sales)
    {
        var newSales = await _salesRepository.AddSalesAsync(sales);
        return CreatedAtAction(nameof(GetSales), new { id = newSales.Id }, newSales);
    }
}

