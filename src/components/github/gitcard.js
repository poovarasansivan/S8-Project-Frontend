import React, { useState, useEffect } from "react";
import { IoGitNetworkOutline } from "react-icons/io5";
import { VscCompassActive } from "react-icons/vsc";
import { FaGithub } from "react-icons/fa";

export default function Gitcard() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const username = "poovarasansivan";
  const token = "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"; 

  useEffect(() => {
    const fetchGitHubData = async () => {
      try {
        const headers = {
          Authorization: `Bearer ${token}`,
        };

        const userResponse = await fetch(`https://api.github.com/users/${username}`, { headers });
        if (!userResponse.ok) throw new Error("Failed to fetch user data");
        const userData = await userResponse.json();

        const reposResponse = await fetch(userData.repos_url, { headers });
        if (!reposResponse.ok) throw new Error("Failed to fetch repositories");
        const reposData = await reposResponse.json();

        const simulatedContributions = Array.from({ length: 365 }).map(() =>
          Math.floor(Math.random() * 10)
        );

        setData({
          totalRepos: reposData.length,
          totalContributions: simulatedContributions.reduce((a, b) => a + b, 0),
          mostActiveDays: simulatedContributions
            .map((value, index) => ({
              date: `2024-${Math.ceil((index + 1) / 30)}-${(index % 30) + 1}`,
              contributions: value,
            }))
            .sort((a, b) => b.contributions - a.contributions)
            .slice(0, 3),
        });
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchGitHubData();
  }, [username, token]);

  if (loading) return <div>Loading...</div>;

  const stats = [
    {
      label: "Total Repositories",
      value: data.totalRepos,
      icon: <FaGithub size={24} />,
    },
    {
      label: "Total Contributions",
      value: data.totalContributions,
      icon: <IoGitNetworkOutline size={24} />,
    },
    {
      label: "Most Active Day Contributions",
      value: `${data.mostActiveDays[0]?.contributions}`,
      icon: <VscCompassActive size={24} />,
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {stats.map((stat, index) => (
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
