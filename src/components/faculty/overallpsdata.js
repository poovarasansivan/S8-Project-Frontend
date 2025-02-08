import React from "react";
import Chart from "react-apexcharts";

export default function OverallPSCount() {
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
      categories: ["IT", "Core", "Verbal", "aptitude"],
    },
    yaxis: {
      title: {
        text: "PS Completed Students Count ",
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
    colors: ["#556ee6", "#34c38f", "#f46a6a","#3b82f6"], // Custom colors for each series
  };

  const chartSeries = [
    {
      name: "IV",
      data: [800, 400, 200, 150],
    },
    {
      name: "III",
      data: [400, 250, 450, 350],
    },
    {
      name: "II",
      data: [200, 150, 200, 40],
    },
    {
      name: "I",
      data: [600, 50, 100, 50],
    },
  ];

  return (
    <div className="bg-white rounded-md p-6 shadow-md">
      <h2 className=" text-base md:text-lg font-medium mb-4 text-gray-600">
        All Year Students PS stats
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
