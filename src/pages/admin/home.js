import React, { useEffect, useState } from "react";
import axios from "axios";
import { SiSecurityscorecard } from "react-icons/si";
import { PiStudentFill } from "react-icons/pi";
import { MdOutlineNotInterested } from "react-icons/md";

const Academicstats = React.lazy(() => import("../../components/admin/academicstats"));
const Fullstackanalysis = React.lazy(() => import("../../components/admin/fullstackstats"));

export default function Home() {
  const [stats, setStats] = useState({
    placed_students: 0,
    not_placed_students: 0,
    nip_students: 0,
    total_students: 0,
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const token = localStorage.getItem("token"); // Retrieve token from local storage
        const response = await axios.get("http://localhost:8080/protected/home", {
          headers: {
            Authorization: `Bearer ${token}`, // Send Bearer token
          },
        });
        setStats(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchStats();
  }, []);

  const statsData = [
    {
      label: "Total Students",
      value: stats.total_students,
      icon: <PiStudentFill size={24} />,
    },
    {
      label: "Placed Students",
      value: stats.placed_students,
      icon: <SiSecurityscorecard size={24} />,
    },
    {
      label: "Unplaced Students",
      value: stats.not_placed_students,
      icon: <SiSecurityscorecard size={24} />,
    },
    {
      label: "NIP Students",
      value: stats.nip_students,
      icon: <MdOutlineNotInterested size={24} />,
    },
  ];

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {statsData.map((stat, index) => (
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
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 mt-5 gap-6">
        <Academicstats />
        <Fullstackanalysis />
      </div>
    </>
  );
}
