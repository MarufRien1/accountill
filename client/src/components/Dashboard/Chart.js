import React from "react";
import ReactApexChart from "react-apexcharts";

function Chart({ paymentHistory }) {
  const safeHistory = Array.isArray(paymentHistory) ? paymentHistory : [];

  const paymentDates = safeHistory.map((record) => {
    const date = new Date(record?.datePaid);
    return Number.isNaN(date.getTime()) ? null : date.toISOString();
  });

  const paymentReceived = safeHistory.map((record) => Number(record?.amountPaid || 0));

  const series = [
    {
      name: "Payment received",
      data: paymentReceived,
    },
  ];

  const options = {
    chart: {
      zoom: { enabled: false },
      toolbar: { show: false },
    },
    colors: ["#2563EB"],
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: "smooth",
    },
    xaxis: {
      type: "datetime",
      categories: paymentDates,
      labels: {
        style: { colors: "rgba(17, 24, 39, 0.6)" },
      },
    },
    yaxis: {
      labels: {
        style: { colors: "rgba(17, 24, 39, 0.6)" },
      },
    },
    plotOptions: {
      bar: {
        borderRadius: 6,
        columnWidth: "55%",
      },
    },
    grid: {
      borderColor: "rgba(17, 24, 39, 0.08)",
      strokeDashArray: 3,
    },
    tooltip: {
      x: {
        format: "dd/MM/yy",
      },
    },
  };

  return (
    <div style={{ width: "100%", marginTop: 8 }}>
      <ReactApexChart options={options} series={series} type="bar" height={300} />
    </div>
  );
}

export default Chart;