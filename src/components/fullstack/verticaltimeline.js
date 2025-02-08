import { useState, useEffect } from "react";
import axios from "axios";
import { BsCheckCircleFill } from "react-icons/bs";
import { motion } from "framer-motion";
import { ClipboardList, Layout, Database, Link, Rocket } from "lucide-react";
import { FaFigma } from "react-icons/fa6";

export default function ResponsiveTimeline() {
  const [currentLevel, setCurrentLevel] = useState(0);
  const rollno = localStorage.getItem("rollno");
  const token = localStorage.getItem("token");

  useEffect(() => {
    axios
      .get(
        `http://localhost:8080/protected/get-fullstackproject-currentlevel/${rollno}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      ) // Replace with your API URL
      .then((response) => {
        setCurrentLevel(response.data.current_level);
      })
      .catch((error) => {
        console.error("Error fetching progress data:", error);
      });
  }, []);

  const steps = [
    {
      number: 1,
      title: "Requirement Gathering",
      icon: ClipboardList,
      color: "text-pink-500",
    },
    { number: 2, title: "Designing", icon: FaFigma, color: "text-red-500" },
    {
      number: 3,
      title: "Frontend Development",
      icon: Layout,
      color: "text-teal-600",
    },
    {
      number: 4,
      title: "Backend Development",
      icon: Database,
      color: "text-blue-600",
    },
    { number: 5, title: "API Integration", icon: Link, color: "text-rose-600" },
    { number: 6, title: "Deployment", icon: Rocket, color: "text-emerald-600" },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-2 bg-gradient-to-b overflow-hidden">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="mb-12"
      >
        <h2 className="text-lg sm:text-xl md:text-xl font-medium mb-4 text-gray-600 bg-clip-text">
          Full Stack Progress
        </h2>
      </motion.div>

      <div className="relative">
        <div className="hidden sm:block absolute left-0 right-0 h-0.5 bg-gray-200 top-16 md:top-20" />
        <div
          className="hidden sm:block absolute left-0 h-0.5 bg-[#6777EF] top-16 md:top-20 transition-all duration-1000"
          style={{ width: `${(currentLevel / steps.length) * 100}%` }}
        />

        <div className="flex flex-col sm:flex-row sm:flex-wrap sm:justify-between gap-y-8 relative">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="flex items-start sm:w-1/3 md:w-1/6 sm:flex-col sm:items-center relative"
            >
              <div className="absolute left-1 sm:left-1/2 sm:-top-4 flex items-center justify-center z-10 transform sm:-translate-x-1/2">
                <div
                  className={`rounded-full p-0.5 ${
                    index < currentLevel ? "bg-green-500" : "bg-gray-200"
                  }`}
                >
                  <div
                    className={`w-6 h-6 sm:w-8 sm:h-8 rounded-full flex items-center justify-center ${
                      index < currentLevel
                        ? "bg-green-500 text-white"
                        : "bg-gray-100 text-gray-400"
                    }`}
                  >
                    {index < currentLevel ? (
                      <BsCheckCircleFill className="w-4 h-4 sm:w-5 sm:h-5" />
                    ) : (
                      <span className="font-bold text-xs sm:text-sm">
                        {step.number}
                      </span>
                    )}
                  </div>
                </div>
              </div>

              <div className="ml-12 sm:ml-0 sm:pt-12 flex sm:flex-col items-center text-left sm:text-center px-1">
                <div
                  className={`flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 rounded-full bg-white shadow-md mb-2 transform transition-transform hover:scale-110 ${
                    index < currentLevel ? step.color : "text-gray-400"
                  }`}
                >
                  <step.icon className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7" />
                </div>

                <h3
                  className={`text-sm sm:text-base md:text-lg font-semibold ml-4 sm:ml-0 sm:mt-2 ${
                    index < currentLevel ? step.color : "text-gray-500"
                  }`}
                >
                  {step.title}
                </h3>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
