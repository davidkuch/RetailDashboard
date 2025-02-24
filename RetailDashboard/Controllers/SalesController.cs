﻿using Microsoft.AspNetCore.Mvc;

using RetailDashboard.DataAccess;
using RetailDashboard.FirstKAlgorithm;
using RetailDashboard.models;

namespace RetailDashboard.Controllers;

[ApiController]
[Route("[controller]")]
public class SalesController(ISalesRepository salesRepository, IFirstKAlgorithm firstKAlgorithm, ILogger<SalesController> logger) : ControllerBase
{
    private readonly ISalesRepository _salesRepository = salesRepository;
    private readonly IFirstKAlgorithm _firstKAlgorithm = firstKAlgorithm;
    private readonly ILogger<SalesController> _logger = logger;

    [HttpGet(Name = "GetSales")]
    public async Task<IEnumerable<Sales>> GetSales()
    {
        // TODO: Add validation, error handling and logging
        return await _salesRepository.GetSalesAsync();
    }

    [HttpPost]
    public async Task<ActionResult<Sales>> PostSales(Sales sales)
    {
        // TODO: Add validation, error handling and logging
        var newSales = await _salesRepository.AddSalesAsync(sales);
        return CreatedAtAction(nameof(GetSales), new { id = newSales.Id }, newSales);
    }

    [HttpGet("{k}")]
    public async Task<ActionResult<SalesSummaryRecord>> GetTopKProductsByTotalSales(int k)
    {
        var sales = await _salesRepository.GetSalesAsync();

        var topK = _firstKAlgorithm.TopKSellingProducts(sales, k);

        return Ok(topK);
    }

}

