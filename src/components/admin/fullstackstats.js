import React, { useEffect, useState } from "react";
import axios from "axios";
import Chart from "react-apexcharts";

export default function Fullstackanalysis() {
  const [chartData, setChartData] = useState({
    categories: ["Stage 1", "Stage 2", "Stage 3", "Stage 4", "Stage 5", "Stage 6"],
    studentCounts: [0, 0, 0, 0, 0, 0], 
  });

  useEffect(() => {
    const fetchChartData = async () => {
      try {
        const token = localStorage.getItem("token"); 
        const response = await axios.get("http://localhost:8080/protected/admin-home-fullstack-data", {
          headers: {
            Authorization: `Bearer ${token}`, 
          },
        });

        const newStudentCounts = [0, 0, 0, 0, 0, 0];
        response.data.forEach((item) => {
          if (item.current_level >= 1 && item.current_level <= 6) {
            newStudentCounts[item.current_level - 1] = item.student_count;
          }
        });

        setChartData({
          categories: ["Stage 1", "Stage 2", "Stage 3", "Stage 4", "Stage 5", "Stage 6"],
          studentCounts: newStudentCounts,
        });
      } catch (error) {
        console.error("Error fetching chart data:", error);
      }
    };

    fetchChartData();
  }, []);

  const chartOptions = {
    chart: {
      type: "bar",
      height: 350,
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: "40%",
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
      categories: chartData.categories,
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
    colors: ["#34c38f", "#34c38f", "#f46a6a"], // Custom colors for each series
  };

  const chartSeries = [
    {
      name: "Students Count",
      data: chartData.studentCounts,
    },
  ];

  return (
    <div className="bg-white rounded-md p-6 shadow-md">
      <h2 className="text-base md:text-lg font-medium mb-4 text-gray-600">
        Full Stack IV Years Students Stats
      </h2>
      <div className="overflow-x-auto">
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
