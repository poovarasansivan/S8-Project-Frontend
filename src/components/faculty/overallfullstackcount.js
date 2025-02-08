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
        columnWidth: "30%",
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
      categories: ["Stage I", "Stage II","Stage III","Stage IV","Stage V","Stage VI"],
    },
    yaxis: {
      title: {
        text: "Full Stack Stage Students wise count ",
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
      name: "IV",
      data: [300, 200,100,250,400,250],
    },
    {
      name: "III",
      data: [500,250,300,400,250,150],
    },
  ];

  return (
    <div className="bg-white rounded-md p-6 shadow-md">
      <h2 className=" text-base md:text-lg font-medium mb-4 text-gray-600">
        Overall Full Stack Stage Stats for III & IV
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
