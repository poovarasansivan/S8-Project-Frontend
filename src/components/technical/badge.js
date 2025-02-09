import React, { useEffect, useState } from "react";

export default function Badge() {
  const [badgeData, setBadgeData] = useState(null);
  const lcusername = localStorage.getItem("leetcode_username");
  
  useEffect(() => {
    const fetchBadgeData = async () => {
      try {
        const response = await fetch(
          `http://localhost:5000/${lcusername}/badges`
        );
        const data = await response.json();
        setBadgeData({
          badgesCount: data.badgesCount,
          activeBadge: data.activeBadge,
        });
      } catch (error) {
        console.error("Failed to fetch badge data:", error);
      }
    };

    fetchBadgeData();
  }, []);

  if (!badgeData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="w-full max-w-1xl bg-[#6777EF] text-white rounded-lg shadow-md p-5 relative">
      {/* Header Section */}
      <div className="flex justify-between items-center">
        <div>
          <p className="text-sm font-medium opacity-80">Total Badges</p>
          <p className="text-4xl font-bold">{badgeData.badgesCount}</p>
        </div>
      </div>

      {/* Divider */}
      <div className="my-4 border-t border-white/30"></div>

      {/* Active Badge Section */}
      <div className="flex items-center gap-4">
        <img
          src={badgeData.activeBadge.icon}
          alt={badgeData.activeBadge.displayName}
          className="w-20 h-20 object-contain rounded-lg border border-white/20 shadow-md"
        />
        <div>
          <p className="text-sm opacity-80">Most Recent Badge</p>
          <p className="text-xl font-semibold">{badgeData.activeBadge.displayName}</p>
        </div>
      </div>

      {/* Badge Footer */}
      <div className="absolute bottom-4 right-4 bg-white/10 px-4 py-1 rounded-full text-xs font-medium tracking-wide backdrop-blur-md">
        Earn More Badges!
      </div>
    </div>
  );
}
