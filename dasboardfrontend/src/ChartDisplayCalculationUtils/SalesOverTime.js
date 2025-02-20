import dayjs from "dayjs";

export default function SetupData(data)
{
    const fromDate = dayjs("2025-01-01");
    const toDate =  dayjs("2026-01-01");

    const monthsListLabels = getMonthList(fromDate, toDate);

    const salesCountByMonth = getSalesCountByMonth(monthsListLabels,data);

    const chartData = {
        labels: monthsListLabels, 
        datasets: [
          {
            label: "Sales Data", 
            data:  salesCountByMonth, 
            backgroundColor: "rgba(75, 192, 192, 0.2)",
            borderColor: "rgba(75, 192, 192, 1)",
            borderWidth: 1,
          },
        ],
      };

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

  function getSalesCountByMonth(monthsList, data) {
    return monthsList.map(month => {
    // Filter sales for the current month and count them
    const salesInMonth = data.filter(sale => dayjs(sale.saleDate).format("YYYY-MM") === month);
    return salesInMonth.length;
  });
}

  