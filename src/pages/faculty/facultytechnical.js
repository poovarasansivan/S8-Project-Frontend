import React, { useState, useEffect } from "react";
import axios from "axios";
import { SiLevelsdotfyi } from "react-icons/si";
import { SiSecurityscorecard } from "react-icons/si";
import { PiRankingDuotone } from "react-icons/pi";

const LeetcodeChart = React.lazy(() =>import("../../components/facultypsdetails/individualstudenttechnical"));
const LeetcodeCategory = React.lazy(() =>import("../../components/facultypsdetails/individuallccategory"));
const GitHubContributions = React.lazy(() =>import("../../components/facultypsdetails/githubcontribution"));
const LeetcodeSubmissions = React.lazy(() =>import("../../components/facultypsdetails/leetcodesubmissions"));
const Repositories = React.lazy(() =>import("../../components/github/repocount"));

export default function Facultytechnical() {
  const [selectedOption, setSelectedOption] = useState("");
  const [options, setOptions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [leetcodeusername, SetLeetcodeusername] = useState([]);
  const [githubusername, SetGithubusername] = useState([]);

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

  const studentgitdata = [
    { rollno: "7376211CS239", totalrepo: "10" },
    { rollno: "7376211CS169", totalrepo: "10" },
    { rollno: "7376212IT146", totalrepo: "10" },
    { rollno: "7376212IT196", totalrepo: "10" },
  ];
  const studentlcdata = [
    { rollno: "7376211CS239", totalproblem: "205", badge: "1", rank: "200" },
    { rollno: "7376211CS169", totalproblem: "105", badge: "1", rank: "250" },
    { rollno: "7376212IT146", totalproblem: "150", badge: "1", rank: "300" },
    { rollno: "7376212IT196", totalproblem: "100", badge: "1", rank: "350" },
  ];


  const studentStats = studentlcdata.find(
    (data) => data.rollno === selectedOption
  );
  const studentgitStats = studentgitdata.find(
    (data) => data.rollno === selectedOption
  );

  const stats = studentStats
    ? [
        {
          label: "Total Problems",
          value: studentStats.totalproblem,
          icon: <SiSecurityscorecard size={24} />,
        },
        {
          label: "Leetcode Rank",
          value: studentStats.rank,
          icon: <PiRankingDuotone size={24} />,
        },
        {
          label: "Badge Count",
          value: studentStats.badge,
          icon: <SiLevelsdotfyi size={24} />,
        },
        {
          label: "Total Repo Count",
          value: studentgitStats?.totalrepo || "N/A",
          icon: <SiLevelsdotfyi size={24} />,
        },
      ]
    : [];

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

      {studentStats ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-5">
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
