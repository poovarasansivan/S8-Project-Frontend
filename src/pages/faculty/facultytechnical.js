import React, { useState, useEffect } from "react";
import axios from "axios";
import { SiLevelsdotfyi } from "react-icons/si";
import { SiSecurityscorecard } from "react-icons/si";
import { PiRankingDuotone } from "react-icons/pi";

const LeetcodeChart = React.lazy(() =>import("../../components/facultypsdetails/individualstudenttechnical"));
const LeetcodeCategory = React.lazy(() =>import("../../components/facultypsdetails/individuallccategory"));
const GitHubContributions = React.lazy(() =>import("../../components/facultypsdetails/githubcontribution"));
const LeetcodeSubmissions = React.lazy(() =>import("../../components/facultypsdetails/leetcodesubmissions"));
const Repositories = React.lazy(() =>import("../../components/github/FacultyRepocount"));

export default function Facultytechnical() {
  const [selectedOption, setSelectedOption] = useState("");
  const [options, setOptions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [leetcodeusername, SetLeetcodeusername] = useState([]);
  const [githubusername, SetGithubusername] = useState([]);
  const [statsData, setStatsData] = useState({
    solvedProblem: 0,
    easySolved: 0,
    mediumSolved: 0,
    hardSolved: 0
  });
  useEffect(() => {
    const fetchRollNumbers = async () => {
      try {
        const token = localStorage.getItem("token"); // Retrieve token from local storage
        const response = await axios.get(
          "http://localhost:8080/protected/get-student-rollno",
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
    const fecthusername = async () => {
      const token = localStorage.getItem("token");
      try {
        const response = await axios.get(
          `http://localhost:8080/protected/get-codingplatform-data/${selectedOption}`,
          {
            headers: {
              Authorization: `Bearer ${token}`, // Send Bearer token
            },
          }
        );
        SetLeetcodeusername(response.data.leetcode_username);
        SetGithubusername(response.data.github_username);
      } catch (error) {
        console.error("Error fetching stats:", error);
      }
    };
    fecthusername();
  }, [selectedOption]);

  useEffect(() => {
    const fetchLeetcodeData = async () => {
      if (!leetcodeusername) return;
  
      try {
        const response = await fetch(`http://localhost:5000/userProfile/${leetcodeusername}`);
        const data = await response.json();
  
        const stats = {
          totalSolved: data.totalSolved,
          ranking: data.ranking,
          contributionPoint: data.contributionPoint
        };
      console.log(stats)
        setStatsData(stats);
      } catch (error) {
        console.error("Error fetching Leetcode data:", error);
      }
    };
  
    fetchLeetcodeData();
  }, [leetcodeusername]);
  
 console.log(statsData)

  const stats = [
        {
          label: "Total Problems",
          value: statsData.totalSolved,
          icon: <SiSecurityscorecard size={24} />,
        },
        {
          label: "Leetcode Rank",
          value: statsData.ranking,
          icon: <PiRankingDuotone size={24} />,
        },
        {
          label: "Contribution Points",
          value: statsData.contributionPoint,
          icon: <SiLevelsdotfyi size={24} />,
        },
      ]
    

  return (
    <>
      <div className="w-full max-w-full bg-white shadow-md p-5 rounded-lg">
        <label
          htmlFor="dropdown"
          className="block text-lg font-semibold text-gray-700 mb-2"
        >
          Select Student
        </label>
        {loading ? (
          <p className="text-gray-500">Loading...</p>
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

      {selectedOption ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-5">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="bg-white shadow-md rounded-lg p-4 flex items-center justify-between w-full h-28"
            >
              <div>
                <p className="text-gray-600 text-sm font-medium">
                  {stat.label}
                </p>
                <h3 className="text-gray-700 text-xl font-bold">
                  {stat.value}
                </h3>
              </div>
              <div className="bg-[#6777EF] text-white rounded-full p-3 flex items-center justify-center">
                {stat.icon}
              </div>
            </div>
          ))}
        </div>
      ) : null}

      {selectedOption && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 mt-5 gap-6">
          <LeetcodeChart student={leetcodeusername} />
          <LeetcodeCategory student={leetcodeusername} />
        </div>
      )}

      {selectedOption && (
        <div className="mt-5">
          <LeetcodeSubmissions student={leetcodeusername} />
        </div>
      )}

      {selectedOption && (
        <div className="mt-5">
          <GitHubContributions student={githubusername} />
        </div>
      )}
      {selectedOption && (
        <div className="mt-5">
          <Repositories username={githubusername} />
        </div>
      )}
    </>
  );
}
