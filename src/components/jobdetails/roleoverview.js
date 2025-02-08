import React from "react";
import { useNavigate } from "react-router-dom";

export default function OverviewCard() {
  const navigate = useNavigate();
  const handleapplynow = () => {
    navigate("/register-job");
  };
  return (
    <div className="rounded-lg bg-white p-6 shadow-sm">
      <h2 className="mb-4 text-xl font-semibold text-gray-800">Overview</h2>
      <div className="space-y-4">
        {[
          { label: "Job Title", value: "Software Developer" },
          { label: "Experience", value: "0 Years" },
          {
            label: "Job Type",
            value: "Full Time",
            badge: "bg-green-100 text-green-600",
          },
          { label: "Posted Date", value: "25 Jan, 2025" },
          { label: "Close Date", value: "13 Feb, 2025" },
          { label: "Interview Date", value: "18 Feb, 2025" },
        ].map((item, index) => (
          <div key={index}>
            <div className="text-sm text-gray-500">{item.label}</div>
            {item.badge ? (
              <div
                className={`inline-block rounded-full px-3 py-1 text-sm ${item.badge}`}
              >
                {item.value}
              </div>
            ) : (
              <div>{item.value}</div>
            )}
          </div>
        ))}
      </div>
      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
        <button
          className="rounded-lg bg-[#556ee6] px-4 py-2 text-white hover:bg-[#6777EF]/90"
          onClick={handleapplynow}
        >
          Apply Now
        </button>
        <button className="rounded-lg bg-pink-100 px-4 py-2 text-pink-600 hover:bg-pink-200">
          Contact Us
        </button>
      </div>
    </div>
  );
}
