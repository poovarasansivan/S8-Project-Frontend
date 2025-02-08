import React from "react";
import Chart from "react-apexcharts";

export default function Placementrecords() {
  const chartOptions = {
    chart: {
      type: "bar",
      height: 350,
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: "55%",
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
      categories: [
        "2017",
        "2018",
        "2019",
        "2020",
        "2021",
        "2022",
        "2023",
        "2024",
        "2025",
      ],
    },
    yaxis: {
      title: {
        text: "Total Students",
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
      data: [1200, 1300, 1400, 1500, 1600, 1700, 1800, 1900, 2000],
    },
    {
      name: "Total Placed Students",
      data: [900, 1000, 900, 1455, 1550, 1500, 1700, 1850, 0],
    },
    {
      name: "NIP Students",
      data: [300, 300, 500, 45, 150, 200, 100, 50, 250],
    },
  ];

  return (
    <div className="bg-white rounded-md p-6 shadow-md mt-5">
      <h2 className=" text-base md:text-lg font-medium mb-4 text-gray-600">
        Last 5 Years Placement Analysis
      </h2>
      <div className="overflow-x-auto">
        {/* Horizontal scrolling container */}
        <div className="min-w-[600px]">
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
