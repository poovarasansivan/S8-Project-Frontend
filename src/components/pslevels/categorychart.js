import React, { useEffect, useState } from "react";
import Chart from "react-apexcharts";
import axios from "axios";

export default function Categorychart() {
  const [chartData, setChartData] = useState({
    totalLevels: [],
    completedLevels: [],
  });
  const rollno = localStorage.getItem("rollno");
  const token = localStorage.getItem("token");
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/protected/get-pschartdata/${rollno}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const data = response.data;

        const totalLevels = [];
        const completedLevels = [];

        data.forEach((item) => {
          totalLevels.push(item.total_levels);
          completedLevels.push(item.levels_completed);
        });

        setChartData({
          totalLevels,
          completedLevels,
        });
      } catch (error) {
        console.error("Error fetching chart data:", error);
      }
    };

    fetchData();
  }, []);

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
      categories: ["Aptitude", "Technical", "Verbal"],
    },
    yaxis: {
      title: {
        text: "PS Level Completion",
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
    colors: ["#556ee6", "#34c38f", "#f46a6a"],
  };

  const chartSeries = [
    {
      name: "Total Levels",
      data: chartData.totalLevels,
    },
    {
      name: "Completed Levels",
      data: chartData.completedLevels,
    },
  ];

  return (
    <div className="bg-white rounded-md p-6 shadow-md">
      <h2 className="text-base md:text-lg font-medium mb-4 text-gray-600">
        PS Levels Completion Details
      </h2>
      <div className="overflow-x-auto">
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
