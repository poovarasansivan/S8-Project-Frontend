import React, { useEffect, useState } from "react";
import axios from "axios";
import { PiStudentFill } from "react-icons/pi";
import { SiLevelsdotfyi } from "react-icons/si";

export default function LevelStats() {
  const [statsData, setStatsData] = useState([]);
  const [totalpspoints, setTotalpspoints] = useState(0);
  const rollno = localStorage.getItem("rollno");

  const fetchpoints = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8080/protected/get-pscard/${rollno}`,
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );
      setTotalpspoints(response.data);
    } catch (error) {
      console.error("Error fetching stats data:", error);
    }
  };

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/protected/get-pscarddata/${rollno}`,
          {
            headers: {
              Authorization: "Bearer " + localStorage.getItem("token"),
            },
          }
        );
        setStatsData(response.data);
      } catch (error) {
        console.error("Error fetching stats data:", error);
      }
    };

    fetchStats();
    fetchpoints();
  }, []);

  const defaultStats = [
    {
      label: "Total Points Earned",
      value: totalpspoints.total_level_completed
        ? totalpspoints.total_level_completed * 300
        : 0, // Fallback to 0 if total_level_completed is not available
      icon: <PiStudentFill size={24} />,
    },
  ];

  const mappedStats = statsData.map((stat) => ({
    label: `Completed Levels in ${stat.ps_category}`,
    value: stat.levels_completed || 0, // Fallback to 0 if no value is present
    icon: <SiLevelsdotfyi size={24} />,
  }));

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {[...defaultStats, ...mappedStats].map((stat, index) => (
        <div
          key={index}
          className="bg-white shadow-md rounded-lg p-4 flex items-center justify-between w-full h-28"
        >
          <div>
            <p className="text-gray-600 text-sm font-medium">{stat.label}</p>
            <h3 className="text-gray-800 text-xl font-bold">{stat.value}</h3>
          </div>
          <div className="bg-[#6777EF] text-white rounded-full p-3 flex items-center justify-center">
            {stat.icon}
          </div>
        </div>
      ))}
    </div>
  );
}
