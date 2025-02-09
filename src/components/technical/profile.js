import React, { useEffect, useState } from "react";
import axios from "axios";
import ProfileImage from "../../assets/profileimage.png";

export default function ProfileCard() {
  const [data, setData] = useState(null); 
  const lcusername = localStorage.getItem("leetcode_username");
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/${lcusername}`);
        setData(response.data); 
      } catch (error) {
        console.log("Failed to fetch data");
      }
    };
    fetchData();
  }, []);

  if (!data) {
    return <p>Loading...</p>;
  }

  return (
    <div className="w-full max-w-1xl rounded-md bg-white shadow-md">
      {/* Header Section */}
      <div className="relative h-36 rounded-md bg-[#ccd0ff] p-6">
        <div className="space-y-0.5">
          <h1 className="text-2xl font-semibold text-[#6777EF]">
            Welcome Back!
          </h1>
          <p className="text-lg text-[#6777EF]/80">{data.username}</p>
        </div>
        <img
          src={ProfileImage}
          alt="Decorative illustration"
          className="absolute bottom-0 right-4 h-32 w-auto object-contain"
        />
      </div>

      {/* Profile Section */}
      <div className="relative px-6 pb-6">
        {/* Profile Image */}
        <div className="absolute -top-14 h-28 w-28 overflow-hidden rounded-full border-4 border-white shadow-lg">
          <img
            src={data.avatar}
            alt="Profile picture"
            className="h-full w-full object-cover"
          />
        </div>

        {/* Name, Points, and Rank Section */}
        <div className="pt-16 flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
          {/* Name and Designation */}
          <div>
            <h2 className="text-xl font-semibold text-gray-600">
              {data.name}
            </h2>
            <p className="text-gray-500">Name</p>
          </div>

          {/* Points and Rank */}
          <div className="flex gap-12 sm:gap-16">
            <div className="text-center">
              <p className="text-xl font-bold text-gray-600">{data.ranking}</p>
              <p className="text-gray-500">Ranking</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
