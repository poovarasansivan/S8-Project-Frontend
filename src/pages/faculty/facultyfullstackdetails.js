import React, { useState, useEffect } from "react";
import axios from "axios";
import { SiLevelsdotfyi } from "react-icons/si";
import { SiSecurityscorecard } from "react-icons/si";
import { PiRankingDuotone } from "react-icons/pi";
import { FaStackOverflow } from "react-icons/fa";
import { MdWorkspacesOutline } from "react-icons/md";

const Fullstactreviewdetails = React.lazy(() =>import("../../components/facultypsdetails/individualreviewstats"));

export default function Facultyfullstackdetails() {
  const [selectedOption, setSelectedOption] = useState("");
  const [options, setOptions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    full_stack_point: "",
    full_stack_rank: "",
    current_level: "",
    assigned_stack: "",
  });
  const [projectDetails, setProjectDetails] = useState(null);

  useEffect(() => {
    const fetchRollNumbers = async () => {
      try {
        const token = localStorage.getItem("token"); // Retrieve token from local storage
        const response = await axios.get(
          "http://localhost:8080/protected/get-individual-rollno",
          {
            headers: {
              Authorization: `Bearer ${token}`, // Send Bearer token
            },
          }
        );
        setOptions(response.data.roll_no);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching roll numbers:", error);
        setLoading(false);
      }
    };

    fetchRollNumbers();
  }, []);

  useEffect(() => {
    if (selectedOption) {
      // Fetch stats
      const fetchStats = async () => {
        try {
          const token = localStorage.getItem("token");
          const response = await axios.get(
            `http://localhost:8080/protected/get-inidividual-fullstack-card/${selectedOption}`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          setStats(response.data);
        } catch (error) {
          console.error("Error fetching stats data:", error);
        }
      };

      const fetchProjectDetails = async () => {
        try {
          const token = localStorage.getItem("token");
          const response = await axios.get(
            `http://localhost:8080/protected/get-inidividual-projectdetails/${selectedOption}`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          setProjectDetails(response.data);
        } catch (error) {
          console.error("Error fetching project details:", error);
        }
      };

      fetchStats();
      fetchProjectDetails();
    }
  }, [selectedOption]);

  return (
    <>
      <div className="w-full max-w-full bg-white shadow-md p-5 rounded-lg mb-5">
        <label
          htmlFor="dropdown"
          className="block text-lg font-semibold text-gray-700 mb-2"
        >
          Select Student
        </label>
        {loading ? (
          <p>Loading students...</p>
        ) : (
          <select
            id="dropdown"
            value={selectedOption}
            onChange={(e) => setSelectedOption(e.target.value)}
            className="block w-full p-3 rounded-md border border-gray-300 shadow-xs focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-base"
          >
            <option value="" disabled>
              Choose a Student
            </option>
            {options.map((option, index) => (
              <option key={index} value={option}>
                {option}
              </option>
            ))}
          </select>
        )}
      </div>

      {selectedOption && (
        <div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white shadow-md rounded-lg p-4 flex items-center justify-between w-full h-28">
              <div>
                <p className="text-gray-600 text-sm font-medium">
                  Full Stack Points
                </p>
                <h3 className="text-gray-700 text-xl font-bold">
                  {stats.full_stack_point}
                </h3>
              </div>
              <div className="bg-[#6777EF] text-white rounded-full p-3 flex items-center justify-center">
                <SiSecurityscorecard size={24} />
              </div>
            </div>

            <div className="bg-white shadow-md rounded-lg p-4 flex items-center justify-between w-full h-28">
              <div>
                <p className="text-gray-600 text-sm font-medium">
                  Full Stack Rank
                </p>
                <h3 className="text-gray-700 text-xl font-bold">
                  {stats.full_stack_rank}
                </h3>
              </div>
              <div className="bg-[#6777EF] text-white rounded-full p-3 flex items-center justify-center">
                <PiRankingDuotone size={24} />
              </div>
            </div>

            <div className="bg-white shadow-md rounded-lg p-4 flex items-center justify-between w-full h-28">
              <div>
                <p className="text-gray-600 text-sm font-medium">
                  Completed Levels
                </p>
                <h3 className="text-gray-700 text-xl font-bold">
                  {stats.current_level}
                </h3>
              </div>
              <div className="bg-[#6777EF] text-white rounded-full p-3 flex items-center justify-center">
                <SiLevelsdotfyi size={24} />
              </div>
            </div>

            <div className="bg-white shadow-md rounded-lg p-4 flex items-center justify-between w-full h-28">
              <div>
                <p className="text-gray-600 text-sm font-medium">
                  Assigned Stack
                </p>
                <h3 className="text-gray-700 text-xl font-bold">
                  {stats.assigned_stack}
                </h3>
              </div>
              <div className="bg-[#6777EF] text-white rounded-full p-3 flex items-center justify-center">
                <FaStackOverflow size={24} />
              </div>
            </div>
          </div>

          {projectDetails && (
            <div className="w-full max-w-1xl rounded-md bg-white shadow-md p-4 mt-5">
              <div className="grid grid-cols-1 gap-4 md:grid-cols-1">
                <div className="space-y-4">
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
                          <div className="text-sm text-gray-500">Roll No</div>
                          <div>{projectDetails.roll_no}</div>
                        </div>
                        <div>
                          <div className="text-sm text-gray-500">Name</div>
                          <div>{projectDetails.name}</div>
                        </div>
                        <div>
                          <div className="text-sm text-gray-500">Title</div>
                          <div>{projectDetails.project_title}</div>
                        </div>
                        <div>
                          <div className="text-sm text-gray-500">
                            Assigned By
                          </div>
                          <div>{projectDetails.assigned_by}</div>
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <div className="text-sm text-gray-500">
                            Description
                          </div>
                          <div>{projectDetails.project_description}</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          <React.Suspense fallback={<div>Loading...</div>}>
            <Fullstactreviewdetails student={selectedOption}/>
          </React.Suspense>
        </div>
      )}
    </>
  );
}
