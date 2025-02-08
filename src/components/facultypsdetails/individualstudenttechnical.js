import React, { useState, useEffect } from "react";
import Chart from "react-apexcharts";
import axios from "axios";

export default function Individualstudenttechnical({ student }) {
  const [chartData, setChartData] = useState([0, 0, 0]); 
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (student) {
      axios
        .get(`http://localhost:5000/${student}/solved`)
        .then((response) => {
          const { easySolved, mediumSolved, hardSolved } = response.data;

          setChartData([easySolved, mediumSolved, hardSolved]);
          setLoading(false);
        })
        .catch((error) => {
          console.error("Error fetching chart data:", error);
          setLoading(false);
        });
    }
  }, [student]);

  const chartOptions = {
    chart: {
      type: "bar",
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
          return val + " Solved";
        },
      },
    },
    colors: ["#556ee6", "#34c38f", "#f46a6a"],
  };

  const chartSeries = [
    {
      name: "Solved Problems",
      data: chartData, // [98, 91, 14]
    },
  ];

  return (
    <div className="bg-white rounded-md p-6 shadow-md">
      <h2 className="text-base md:text-lg font-medium mb-4 text-gray-600">
        Accuracy By Difficulty Levels
      </h2>
      <div>
        {loading ? (
          <p>Loading chart data...</p>
        ) : (
          <div className="min-w-[250px] md:min-w-[400px]">
            <Chart
              options={chartOptions}
              series={chartSeries}
              type="bar"
              height={350}
            />
          </div>
        )}
      </div>
    </div>
  );
}
