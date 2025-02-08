import React from "react";
import Chart from "react-apexcharts";

export default function Fullstackanalysis() {
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
      categories: ["II", "III", "IV"],
    },
    yaxis: {
      title: {
        text: "Full Stack Points",
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
      name: "Top Point",
      data: [1200, 1300, 1400],
    },
    {
      name: "Average Point",
      data: [900, 1000, 900],
    },
    {
      name: "Least Point",
      data: [300, 300, 500],
    },
  ];

  return (
    <div className="bg-white rounded-md p-6 shadow-md mt-5">
      <h2 className=" text-base md:text-lg font-medium mb-4 text-gray-600">
        Full Stack Points Analysis of II, III and IV Years
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
