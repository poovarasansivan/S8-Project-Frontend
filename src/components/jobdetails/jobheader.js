import React from "react";
import Mrcooper from "../../assets/companylogo/cooper.png";

export default function JobHeader() {
    return (
      <div className="mb-6 flex flex-col md:flex-row items-center gap-4">
        <div className="h-12 w-32 rounded-lg bg-green-100 ">
          <img src={Mrcooper} alt="Mr Cooper" className="h-full w-full" />
        </div>
        <div>
          <h1 className="text-xl text-gray-800 font-semibold">Software Developer</h1>
          <div className="flex items-center gap-2 text-gray-500">
            <span>Mr Cooper</span>
            <span>•</span>
            <span>Chennai</span>
          </div>
        </div>
      </div>
    );
  }
  