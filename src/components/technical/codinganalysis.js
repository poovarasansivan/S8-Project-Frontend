import React from "react";
import Chart from "react-apexcharts";

export default function Categorychart() {
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
      categories: ["Easy", "Medium", "Hard"],
    },
    yaxis: {
      title: {
        text: "Total Problems & Accuracy ",
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
      name: "Problems",
      data: [98, 91, 14],
    },
    {
      name: "Accuracy",
      data: [52.7, 39.2, 73.7],
    },

  ];

  return (
    <div className="bg-white rounded-md p-6 shadow-md">
      <h2 className=" text-base md:text-lg font-medium mb-4 text-gray-600">
      Problems and Accuracy
      </h2>
      <div >
        <div className="min-w-[500px]">
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
