import React, { useEffect, useState } from "react";
import { FaSort } from "react-icons/fa";

function LeetcodeSubmissions({student}) {
  const [tableData, setTableData] = useState([]);
  const [sortKey, setSortKey] = useState("title");
  const [sortOrder, setSortOrder] = useState("asc");
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 5;

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(
          `http://localhost:5000/${student}/submission`
        );
        const data = await response.json();
        setTableData(data.submission);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }

    fetchData();
  }, [student]);

  const sortedData = [...tableData].sort((a, b) => {
    const aValue = a[sortKey];
    const bValue = b[sortKey];

    if (typeof aValue === "string" && typeof bValue === "string") {
      return sortOrder === "asc"
        ? aValue.localeCompare(bValue)
        : bValue.localeCompare(aValue);
    }

    if (sortKey === "timestamp") {
      return sortOrder === "asc"
        ? parseInt(aValue, 10) - parseInt(bValue, 10)
        : parseInt(bValue, 10) - parseInt(aValue, 10);
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

  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = sortedData.slice(indexOfFirstRow, indexOfLastRow);
  const totalPages = Math.ceil(tableData.length / rowsPerPage);

  return (
    <div className="w-full max-w-1xl p-5 rounded-md bg-white shadow-md overflow-x-auto">
      <div className="container mx-auto min-h-52">
        <h1 className="text-md md:text-lg font-medium text-gray-600 mb-6">
          Recent Problem Submissions
        </h1>
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              {["S No", "Title", "Language", "Timestamp", "Status"].map(
                (header, index) => (
                  <th
                    key={index}
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
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
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {currentRows.map((row, index) => (
              <tr key={index}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-500">
                  {indexOfFirstRow + index + 1}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 font-medium">
                  {row.title}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {row.lang}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {new Date(row.timestamp * 1000).toLocaleString()}
                </td>
                <td
                  className={`px-6 py-4 whitespace-nowrap text-sm font-medium ${
                    row.statusDisplay === "Accepted"
                      ? "text-green-500"
                      : row.statusDisplay === "Wrong Answer" ||
                        row.statusDisplay === "Runtime Error"
                      ? "text-red-500"
                      : "text-yellow-500"
                  }`}
                >
                  {row.statusDisplay}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="flex justify-center items-center mt-4 gap-1">
          <button
            className="p-2 text-gray-600 rounded-lg hover:bg-gray-100 disabled:opacity-50"
            disabled={currentPage === 1}
            onClick={() => setCurrentPage(currentPage - 1)}
          >
            ←
          </button>
          {[...Array(totalPages)].map((_, index) => (
            <button
              key={index + 1}
              className={`w-8 h-8 rounded-lg ${
                currentPage === index + 1
                  ? "bg-[#6777EF] text-white"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
              onClick={() => setCurrentPage(index + 1)}
            >
              {index + 1}
            </button>
          ))}
          <button
            className="p-2 text-gray-600 rounded-lg hover:bg-gray-100 disabled:opacity-50"
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage(currentPage + 1)}
          >
            →
          </button>
        </div>
      </div>
    </div>
  );
}

export default LeetcodeSubmissions;
