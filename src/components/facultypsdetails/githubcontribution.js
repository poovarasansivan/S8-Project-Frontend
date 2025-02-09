import React, { useState, useEffect } from "react";
import { FaGithub } from "react-icons/fa";

const GitHubContributions = ({ student }) => {
  const [hoveredDay, setHoveredDay] = useState(null);
  const [heatmapData, setHeatmapData] = useState([]);
  const username = "poovarasansivan";
  const token = "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";

 

  const fetchCommitData = async () => {
    try {
      const headers = {
        Authorization: `Bearer ${token}`,
      };
      const response = await fetch(
        `https://api.github.com/users/${student}/events/public`,
        { headers }
      );
  
      const data = await response.json();
  
      if (!Array.isArray(data)) {
        console.error("GitHub API response is not an array:", data);
        return;
      }
  
      const processedData = processCommitData(data);
      setHeatmapData(processedData);
    } catch (error) {
      console.error("Error fetching GitHub data:", error);
    }
  };
  

  const processCommitData = (data) => {
    const commitCounts = {};

    data.forEach((event) => {
      const date = new Date(event.created_at).toISOString().split("T")[0]; // Extract the date (YYYY-MM-DD)

      if (!commitCounts[date]) {
        commitCounts[date] = 0;
      }
      commitCounts[date] += event.payload.size; // Increment the commit count for the date
    });

    return Object.keys(commitCounts).map((date) => ({
      date,
      count: commitCounts[date],
    }));
  };

  useEffect(() => {
    fetchCommitData();
  }, [student, token]);

  const getColor = (count) => {
    if (count === 0) return "bg-gray-100";
    if (count === 1) return "bg-green-200";
    if (count === 2) return "bg-green-300";
    if (count === 3) return "bg-green-400";
    return "bg-green-500";
  };

  const formatDate = (dateString) => {
    const options = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  console.log(heatmapData);
  const generateHeatmapData = () => {
    const data = [];
    const today = new Date();
    for (let i = 0; i < 60; i++) {
      const date = new Date(today);
      date.setDate(date.getDate() - i);
      data.unshift({
        date: date.toISOString().split("T")[0],
        count: 0,
      });
    }
    return data;
  };

  // Combine fetched data and the default data
  const combinedData = generateHeatmapData().map((day) => {
    const existingData = heatmapData.find((data) => data.date === day.date);
    return existingData ? existingData : day;
  });

  return (
    <div className="w-full max-w-4xl bg-white rounded-lg shadow-md mx-auto p-5">
      <div className="flex items-center mb-4">
        <FaGithub className="text-gray-700 mr-2" />
        <h2 className="text-lg font-semibold">GitHub Contributions</h2>
      </div>
      <div className="grid grid-cols-12 gap-1">
        {combinedData.map((day, index) => (
          <div
            key={index}
            className={`w-10 h-10 rounded-sm ${getColor(day.count)} relative`}
            onMouseEnter={() => setHoveredDay(day)}
            onMouseLeave={() => setHoveredDay(null)}
          >
            {hoveredDay === day && (
              <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-gray-800 text-white text-xs rounded whitespace-nowrap">
                {day.count} contributions on {formatDate(day.date)}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default GitHubContributions;
