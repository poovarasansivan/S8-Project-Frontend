import React from "react";
import Chart from "react-apexcharts";

export default function OverallPlacement() {
  const chartOptions = {
    chart: {
      type: "bar",
      height: 350,
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: "50%",
        borderRadius: 5,
        borderRadiusApplication: "end",
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      show: true,
      width: 2,
      colors: ["transparent"],
    },
    xaxis: {
      categories: ["IV", "III"],
    },
    yaxis: {
      title: {
        text: "Placement Eligibile Students ",
      },
    },
    fill: {
      opacity: 1,
    },
    tooltip: {
      y: {
        formatter: function (val) {
          return val;
        },
      },
    },
    colors: ["#556ee6", "#34c38f", "#f46a6a"], // Custom colors for each series
  };

  const chartSeries = [
    {
      name: "Total Students",
      data: [1800, 1900],
    },
    {
      name: "Placement Intrested Students",
      data: [1500, 1700],
    },
    {
      name: "Not Intrested Students",
      data: [300, 200],
    },
  ];

  return (
    <div className="bg-white rounded-md p-6 shadow-md">
      <h2 className=" text-base md:text-lg font-medium mb-4 text-gray-600">
        Overall Year Placement Stats
      </h2>
      <div className="overflow-x-auto">
        {/* Horizontal scrolling container */}
        <div className="min-w-[400px]">
          <Chart
            options={chartOptions}
            series={chartSeries}
            type="bar"
            height={350}
          />
        </div>
      </div>
    </div>
  );
}
