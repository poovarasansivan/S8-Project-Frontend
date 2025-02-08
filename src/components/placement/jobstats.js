import React from "react";
import { SiSecurityscorecard } from "react-icons/si";
import { PiStudentFill } from "react-icons/pi";
import { MdOutlineNotInterested } from "react-icons/md";

export default function Jobstats() {
  const stats = [
    {
      label: "Total Students",
      value: "1800",
      icon: <PiStudentFill size={24} />,
    },
    {
      label: "Placed Students",
      value: "986",
      icon: <SiSecurityscorecard size={24} />,
    },
    {
      label: "Un Placed Students",
      value: "358",
      icon: <SiSecurityscorecard size={24} />,
    },
    {
      label: "NIP Students",
      value: "400",
      icon: <MdOutlineNotInterested size={24} />,
    },
  ];
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
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
