import React, { useState } from "react";
import { FaSort, FaEdit, FaTrash, FaPlus, FaSearch } from "react-icons/fa";

const initialData = [
  {
    id: "1",
    companyname: "Soliton",
    role: "Software Engineer",
    location: "Coimbatore",
    date: "2024/03/17",
    salary: 750000,
  },
  {
    id: "2",
    companyname: "Mr Cooper",
    role: "Software Developer",
    location: "Chennai",
    date: "2024/03/22",
    salary: 850000,
  },
  {
    id: "3",
    companyname: "Survey Sparrow",
    role: "Frontend and Backend Developer",
    location: "Chennai",
    date: "2024/04/22",
    salary: "600000 - 800000",
  },
  {
    id: "4",
    companyname: "Presidio",
    role: "Associate Software Developer",
    location: "Chennai, Coimbatore",
    date: "2024/05/22",
    salary: 950000,
  },
];

function PipelinedCompany() {
  const [employees, setEmployees] = useState(initialData);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortKey, setSortKey] = useState("companyname");
  const [sortOrder, setSortOrder] = useState("asc");

  const filteredEmployees = employees.filter((employee) =>
    Object.values(employee).some((value) =>
      value.toString().toLowerCase().includes(searchQuery.toLowerCase())
    )
  );

  const sortedEmployees = [...filteredEmployees].sort((a, b) => {
    const aValue = a[sortKey];
    const bValue = b[sortKey];

    if (typeof aValue === "string" && typeof bValue === "string") {
      return sortOrder === "asc"
        ? aValue.localeCompare(bValue)
        : bValue.localeCompare(aValue);
    }

    if (typeof aValue === "number" && typeof bValue === "number") {
      return sortOrder === "asc" ? aValue - bValue : bValue - aValue;
    }

    return 0;
  });

  const handleSort = (key) => {
    if (sortKey === key) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortKey(key);
      setSortOrder("asc");
    }
  };

  return (
    <div className="w-full mt-5 max-w-1xl p-5 rounded-md bg-white shadow-md overflow-x-auto">
      <div className="container mx-auto min-h-52">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-md md:text-xl font-medium text-gray-600">
            Pipelined Company
          </h1>
          <div className="flex items-center space-x-2">
            <input
              type="text"
              placeholder="Search..."
              className="border rounded-lg px-4 py-2 focus:outline-none focus:ring-1 focus:ring-blue-400"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <FaSearch className="text-gray-600" />
          </div>
        </div>

        <div className="bg-white overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  {["Company Name", "Role", "Location", "Date", "Salary"].map(
                    (header) => (
                      <th
                        key={header.toLowerCase().replace(" ", "")}
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100 transition duration-300 ease-in-out"
                        onClick={() =>
                          handleSort(header.toLowerCase().replace(" ", ""))
                        }
                      >
                        <div className="flex items-center">
                          {header}
                          <FaSort className="ml-1" />
                        </div>
                      </th>
                    )
                  )}
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {sortedEmployees.map((employee) => (
                  <tr key={employee.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {employee.companyname}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {employee.role}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {employee.location}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {employee.date}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {employee.salary.toLocaleString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <button className="bg-[#556ee6] px-3 py-2 rounded-lg text-white hover:bg-[#6777EF]/90 mr-4 transition duration-300 ease-in-out">
                        <FaEdit className="inline mr-1" /> Edit
                      </button>
                      <button className="bg-red-600 text-white px-3 py-2 rounded-lg hover:bg-red-300/90 transition duration-300 ease-in-out">
                        <FaTrash className="inline mr-1" /> Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PipelinedCompany;
