export default function SetupData(data) {
    debugger;
    let groupedSales = groupSalesByCategory(data);

    let categories =  Object.keys(groupedSales);;
    let numSalesPerCategory = Object.values(countSalesPerCategory(groupedSales));

    var chartData = {
        labels: categories,
        datasets: [{
            label: "Sales",
            data: numSalesPerCategory,
            backgroundColor: [
                'rgb(255, 99, 132)',
                'rgb(54, 162, 235)',
                'rgb(255, 205, 86)' ],
            hoverOffset: 4
        }
        ],

    }  

    return chartData;
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

  function countSalesPerCategory(salesByCategory) {
    return Object.keys(salesByCategory).reduce((counts, category) => {
      counts[category] = salesByCategory[category].length;
      return counts;
    }, {});
  }