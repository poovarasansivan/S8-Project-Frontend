import React, { useEffect, useState } from "react";
import { SiLevelsdotfyi } from "react-icons/si";
import { SiSecurityscorecard } from "react-icons/si";
import { PiRankingDuotone } from "react-icons/pi";
import { FaStackOverflow } from "react-icons/fa";
import { AiOutlineIdcard } from "react-icons/ai";
import { MdWorkspacesOutline } from "react-icons/md";
import axios from "axios";

const Progressbar = React.lazy(() => import("../../components/fullstack/verticaltimeline"));

export default function FullStack() {
  const [statsData, setStatsData] = useState([]);
  const [projectData, setProjectData] = useState([]);

  useEffect(() => {
    const fetchStats = async () => {
      const rollno = localStorage.getItem("rollno");
      const token = localStorage.getItem("token");
      try {
        const response = await axios.get(
          `http://localhost:8080/protected/get-fullstackcarddata/${rollno}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setStatsData(response.data);
      } catch (error) {
        console.error("Error fetching stats data:", error);
      }
    };
    fetchStats();
  }, []);

  useEffect(() => {
    const fetchStats = async () => {
      const rollno = localStorage.getItem("rollno");
      const token = localStorage.getItem("token");
      try {
        const response = await axios.get(
          `http://localhost:8080/protected/get-fullstackproject-details/${rollno}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setProjectData(response.data);
      } catch (error) {
        console.error("Error fetching stats data:", error);
      }
    };
    fetchStats();
  }, []);

  const stats = [
    {
      label: "Full Stack Points",
      value: statsData.full_stack_point,
      icon: <SiSecurityscorecard size={24} />,
    },
    {
      label: "Full Stack Rank",
      value: statsData.full_stack_rank,
      icon: <PiRankingDuotone size={24} />,
    },
    {
      label: "Completed Levels",
      value: statsData.current_level,
      icon: <SiLevelsdotfyi size={24} />,
    },
    {
      label: "Assigend Stack",
      value: statsData.assigned_stack,
      icon: <FaStackOverflow size={24} />,
    },
  ];
  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <div
            key={index}
            className="bg-white shadow-md rounded-lg p-4 flex items-center justify-between w-full h-28"
          >
            <div>
              <p className="text-gray-600 text-sm font-medium">{stat.label}</p>
              <h3 className="text-gray-700 text-xl font-bold">{stat.value}</h3>
            </div>
            <div className="bg-[#6777EF] text-white rounded-full p-3 flex items-center justify-center">
              {stat.icon}
            </div>
          </div>
        ))}
      </div>
      <div className="w-full max-w-1xl rounded-md bg-white shadow-md p-4 mt-5">
        <Progressbar />
      </div>
      <div className="w-full max-w-1xl rounded-md bg-white shadow-md p-4 mt-5">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-1">
          {/* Left Column */}
          <div className="space-y-4">
            {/* Personal Information Card */}
            <div className="bg-white rounded-lg shadow-sm">
              <div className="flex items-center p-4 border-b">
                <MdWorkspacesOutline className="text-gray-600 mr-2" />
                <h2 className="text-lg text-gray-600 font-semibold">
                  Project Details
                </h2>
              </div>
              <div className="p-4 grid gap-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <div className="text-sm text-gray-500">Title</div>
                    <div>{projectData.project_title}</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-500">Assigend Stack</div>
                    <div>{projectData.assigned_stack}</div>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <div className="text-sm text-gray-500">Description</div>
                    <div>{projectData.project_description}</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-500">Assigend By</div>
                    <div>{projectData.assigned_by}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-4">
            {/* Identity Information */}
            <div className="bg-white rounded-lg shadow-sm">
              <div className="flex items-center p-4 border-b">
                <AiOutlineIdcard className="text-gray-600 mr-2" />
                <h2 className="text-lg text-gray-600 font-semibold">
                  Review Date And Venue Information
                </h2>
              </div>
              <div className="p-4 grid grid-cols-2 gap-4">
                <div>
                  <div className="text-sm text-gray-500">Review Date</div>
                  <div>{projectData.date}</div>
                </div>
                <div>
                  <div className="text-sm text-gray-500">Venue</div>
                  <div>{projectData.rve_name}</div>
                </div>
              </div>
              <div className="p-4 grid grid-cols-2 gap-4">
                <div>
                  <div className="text-sm text-gray-500">Reviewer Name</div>
                  <div>{projectData.reviewer_name}</div>
                </div>
                <div>
                  <div className="text-sm text-gray-500">Email</div>
                  <div>{projectData.reviewer_email}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
