import React from "react";
import Chart from "react-apexcharts";

function LevelAttempts() {
  const chartOptions = {
    chart: {
      type: "area",
      height: 350,
      toolbar: {
        show: false,
      },
    },
    colors: ["#556ee6", "#34c38f"], 
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: "smooth", 
      width: 2,
    },
    fill: {
      type: "gradient",
      gradient: {
        shadeIntensity: 1,
        opacityFrom: 0.5,
        opacityTo: 1,
        stops: [0, 90, 100],
      },
    },
    xaxis: {
      type: "category",
      categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
      labels: {
        style: {
          colors: "#333", 
        },
      },
    },
    yaxis: {
      labels: {
        style: {
          colors: "#333", 
        },
      },
    },
    tooltip: {
      theme: "dark",
    },
    legend: {
      show: true,
      position: "bottom",
    },
  };

  const chartSeries = [
    {
      name: "Targeted Levels",
      data: [2, 5, 3, 2, 4, 6],
    },
    {
      name: "Achieved Levels",
      data: [1, 2, 5, 1, 2, 4],
    },
  ];

  return (
    <div className="bg-white rounded-md p-6 shadow-md w-full mx-auto mt-5">
      <h2 className="text-start text-gray-600 font-semibold text-xl mb-4">
        Targeted And Achieved Level Status
      </h2>
      <Chart
        options={chartOptions}
        series={chartSeries}
        type="area"
        height={350}
      />
    </div>
  );
}

export default LevelAttempts;
