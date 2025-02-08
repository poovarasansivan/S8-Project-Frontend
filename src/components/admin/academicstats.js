import React, { useEffect, useState } from "react";
import axios from "axios";
import Chart from "react-apexcharts";

export default function Academicstats() {
  const [chartData, setChartData] = useState({
    placement_above_50: 0,
    placement_below_50: 0,
    backlog_students: 0,
    cgpa_above_8: 0,
    cgpa_below_8: 0,
  });

  useEffect(() => {
    const fetchChartData = async () => {
      try {
        const token = localStorage.getItem("token"); // Retrieve token from local storage
        const response = await axios.get("http://localhost:8080/protected/admin-home-academic-data", {
          headers: {
            Authorization: `Bearer ${token}`, // Send Bearer token
          },
        });
        setChartData(response.data);
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
      categories: [
        "Above 8.0",
        "Below 8.0",
        "Backlogs",
        "FA Below 50",
        "FA Above 50",
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
      name: "Students Count",
      data: [
        chartData.cgpa_above_8,
        chartData.cgpa_below_8,
        chartData.backlog_students,
        chartData.placement_below_50,
        chartData.placement_above_50,
      ],
    },
  ];

  return (
    <div className="bg-white rounded-md p-6 shadow-md">
      <h2 className="text-base md:text-lg font-medium mb-4 text-gray-600">
        Final Year Students Stats
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
