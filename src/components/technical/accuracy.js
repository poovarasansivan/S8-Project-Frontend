import React from "react";
import Chart from "react-apexcharts";

export default function Accuracychart() {
    const chartOptions = {
        chart: {
          type: "donut",
          height: 300,
        },
        labels: ["Easy", "Medium", "Hard"],
        legend: {
          position: "bottom",
        },
        plotOptions: {
          pie: {
            donut: {
              size: "60%", 
            },
          },
        },
        dataLabels: {
          enabled: true,
        },
        tooltip: {
          y: {
            formatter: function (val) {
              return val + " Percentage"; 
            },
          },
        },
        colors: ["#556ee6", "#34c38f", "#f46a6a"], 
      };

  const chartSeries = [52.7, 39.2, 73.7]; 

  return (
    <div className="bg-white rounded-md p-6 shadow-md">
      <h2 className="text-base md:text-lg font-medium mb-4 text-gray-600">
       Accuracy By Difficulty Levels
      </h2>
      <div>
        <div className="min-w-[250px] md:min-w-[400px]">
          <Chart
            options={chartOptions}
            series={chartSeries}
            type="donut"
            height={350}
          />
        </div>
      </div>
    </div>
  );
}
