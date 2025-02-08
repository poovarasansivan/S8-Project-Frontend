import React, { useEffect, useState } from "react";
import axios from "axios";
import { ChevronRight } from "lucide-react";

export default function ActivityFeed() {
  const [activities, setActivities] = useState([]);
  const rollno = localStorage.getItem("rollno");

  useEffect(() => {

    const fetchActivities = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/protected/get-pointhistory/${rollno}`,
          {
            headers: {
            "Authorization" : `Bearer ${localStorage.getItem("token")}`
            }
          }
        ); 
        const months = [
          "Jan", "Feb", "Mar", "Apr", "May", "Jun", 
          "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
        ];

        const formattedData = response.data.map((activity) => {
          const formattedDate = activity.completion_date.split("-");
          const month = months[parseInt(formattedDate[1], 10) - 1]; 
          const day = formattedDate[2];

          return {
            date: `${month} ${day}`, // e.g., "Jan 22"
            description: `${activity.category_level} - ${activity.ps_category}`,
            points: "300", 
            isHighlighted: false, 
          };
        });
        setActivities(formattedData);
      } catch (error) {
        console.error("Error fetching activity data:", error);
      }
    };

    fetchActivities();
  }, []);

  return (
    <div className="w-full max-w-1xl rounded-md bg-white shadow-md p-5">
      <h2 className="mb-6 text-lg font-semibold text-gray-600">
        Recently Earned Points
      </h2>

      <div className="relative space-y-6">
        <div className="absolute left-1 top-2 h-[calc(100%-24px)] w-[1px] bg-gray-200" />

        {activities.map((activity, index) => (
          <div key={index} className="flex items-start gap-3">
            <div
              className={`relative z-10 mt-2 h-2 w-2 rounded-full ${
                activity.isHighlighted ? "bg-[#6777EF]" : "bg-gray-200"
              }`}
            />
            <div className="flex min-w-0 flex-1 flex-col">
              <div className="flex items-center justify-between gap-2">
                <span className="text-sm font-medium text-gray-600">
                  {activity.date}
                </span>
                <div className="flex items-center gap-1 text-green-500">
                  <span className="font-medium">+{activity.points}</span>
                </div>
              </div>
              <p className="text-sm text-gray-600">{activity.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
