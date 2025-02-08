import React from "react";
import { FiPhone, FiMail, FiGlobe, FiMapPin } from "react-icons/fi";
import Mrcooper from "../../assets/companylogo/cooper.png";

export default function CompanyProfileCard() {
  return (
    <div className="rounded-lg bg-white p-6 shadow-sm">
      <div className="mb-4 flex items-center justify-center">
        <div className="h-12 w-32 overflow-hidden rounded-lg bg-gray-100">
          <img
            src={Mrcooper}
            alt="Mr Cooper"
            className="h-full w-full object-contains"
          />
        </div>
      </div>
      <h3 className="mb-2 text-center text-xl text-gray-800 font-semibold">Mr Cooper</h3>
      <p className="mb-4 text-center text-sm text-gray-500">Since July 2004</p>
      <div className="space-y-4">
        {[
          { icon: <FiPhone />, text: "+918667536844" },
          { icon: <FiMail />, text: "careersinfo@cooper.com" },
          { icon: <FiGlobe />, text: "www.mrcooper.in" },
          { icon: <FiMapPin />, text: "Chennai, TN" },
        ].map((item, index) => (
          <div
            key={index}
            className="flex items-center gap-3 text-sm text-gray-600"
          >
            {item.icon}
            <span className="truncate">{item.text}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
