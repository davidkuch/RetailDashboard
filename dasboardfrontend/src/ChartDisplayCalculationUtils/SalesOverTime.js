import dayjs from "dayjs";

export default function SetupData(data)
{
  // temp: use hardcoded months of one year.
  const fromDate = dayjs("2025-01-01");
  const toDate = dayjs("2026-01-01");
  const monthsListLabels = getMonthList(fromDate, toDate);

  const groupedByCategory = groupSalesByCategory(data);

  var chartData = {
    labels: monthsListLabels,
    datasets: []
  };

  const colors = ["Red", "Blue", "Green", "Yellow", "Orange", "Purple", "Pink", "Black",  "Gray"];
  var colorCounter = 0;

  Object.entries(groupedByCategory).forEach(([category, sales]) => {
      const salesCountByMonth = getSalesCountByMonth(monthsListLabels, sales);
      chartData.datasets.push({
        label: category,
        data: salesCountByMonth,
        backgroundColor: colors[colorCounter],
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      });
      colorCounter++;
    }
  );

  return chartData;

}

function getMonthList(startDate, endDate) {
    // Convert the input strings or Date objects to dayjs objects
    const start = dayjs(startDate).startOf("month"); // Start of the month
    const end = dayjs(endDate).endOf("month"); // End of the month
  
    const months = [];
  
    // Loop from the start month to the end month
    let currentMonth = start;
    while (currentMonth.isBefore(end) || currentMonth.isSame(end, "month")) {
      // Format the current month as "YYYY-MM"
      months.push(currentMonth.format("YYYY-MM"));
      
      // Move to the next month
      currentMonth = currentMonth.add(1, "month");
    }
  
    return months;
  }

  function groupSalesByCategory(sales) {
    return sales.reduce((acc, sale) => {
      if (!acc[sale.category]) {
        acc[sale.category] = [];
      }
      acc[sale.category].push(sale);
      return acc;
    }, {});
  }
  
  function getSalesCountByMonth(monthsList, data) {
    return monthsList.map(month => {
    // Filter sales for the current month and count them
    const salesInMonth = data.filter(sale => dayjs(sale.saleDate).format("YYYY-MM") === month);
    return salesInMonth.length;
  });
}



  