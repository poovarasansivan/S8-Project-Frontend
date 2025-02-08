import React from "react";
import { ChevronRight } from "lucide-react";

const activities = [
  {
    name: "Poovarasan - 7376211CS239",
    department: "CSE",
    points: "2000",
    isHighlighted: true,
  },
  {
    name: "Jayaprakash P - 7376211CS169",
    department: "CSE",
    points: "1900",
  },
  {
    name: "Hari Prasad S - 7376212IT146",
    department: "IT",
    points: "1800",
  },
  {
    name: "Nivetha M - 7376212IT196",
    department: "IT",
    points: "1700",
  },
];

export default function FullStackrank4() {
  return (
    <div className="w-full max-w-1xl rounded-md bg-white shadow-md p-6">
      <h2 className="mb-6 text-md font-semibold text-gray-900">
        Full Stack Rank - Top 4 student from 2025 Batch
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
                  {activity.name}
                </span>
                <ChevronRight className="h-4 w-4 flex-shrink-0 text-gray-400" />
              </div>
              <p className="text-sm text-gray-600">
                {activity.department} | {activity.points}{" "}
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className="text-center">
        <button className="mt-6  w-40 rounded-lg bg-[#6777EF] px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-[#6777EF]/90">
          View More
        </button>
      </div>
    </div>
  );
}
