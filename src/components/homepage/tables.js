import React, { useState } from "react";

const Companydetails = [
  {
    sno: 1,
    companyname: "Mr Cooper",
    date: "04 March 2024",
    interviewstatus: "Rejected",
    registrationstatus: "Registered",
    presentstatus: "Attended",
  },
  {
    sno: 2,
    companyname: "TechX",
    date: "10 March 2024",
    interviewstatus: "Rejected",
    registrationstatus: "Not Registered",
    presentstatus: "Not Attended",
  },
  {
    sno: 3,
    companyname: "Presidio",
    date: "22 May 2024",
    interviewstatus: "Offered",
    registrationstatus: "Registered",
    presentstatus: "Attended",
  },
  {
    sno: 4,
    companyname: "Avasoft",
    date: "12 April 2024",
    interviewstatus: "Rejected",
    registrationstatus: "Registered",
    presentstatus: "Attended",
  },
  {
    sno: 5,
    companyname: "Juspay",
    date: "6 June 2024",
    interviewstatus: "Rejected",
    registrationstatus: "Registered",
    presentstatus: "Attended",
  },
  {
    sno: 6,
    companyname: "Survey Sparrow",
    date: "15 April 2024",
    interviewstatus: "Rejected",
    registrationstatus: "Registered",
    presentstatus: "Attended",
  },
  {
    sno: 7,
    companyname: "Zoho Summer Intern",
    date: "26 May 2024",
    interviewstatus: "Rejected",
    registrationstatus: "Registered",
    presentstatus: "Attended",
  },
  {
    sno: 8,
    companyname: "Zoho SDE Role",
    date: "1 June 2024",
    interviewstatus: "Rejected",
    registrationstatus: "Not Registered",
    presentstatus: "Not Attended",
  },
];

const getBadgeColor = (status) => {
  switch (status.toLowerCase()) {
    case "rejected":
    case "not registered":
    case "not attended":
      return "bg-red-100 text-red-600";
    case "offered":
    case "registered":
    case "attended":
      return "bg-green-100 text-green-600";
    default:
      return "bg-gray-100 text-gray-600";
  }
};

const TransactionTable = () => {
  const rowsPerPage = 7;
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(Companydetails.length / rowsPerPage);

  const paginateTransactions = () => {
    const startIndex = (currentPage - 1) * rowsPerPage;
    return Companydetails.slice(startIndex, startIndex + rowsPerPage);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="w-full mt-5 max-w-1xl rounded-md bg-white shadow-md overflow-x-auto">
      <div className="bg-white rounded-lg shadow-md p-5">
        <h2 className="text-lg font-semibold mb-4">
          Oncampus Company Interviews
        </h2>
        <div className="overflow-x-auto">
          <table className="table-auto w-full border-collapse">
            <thead>
              <tr className="bg-slate-100">
                <th className="border-b-2 p-2 text-left text-sm">S No</th>
                <th className="border-b-2 p-2 text-left text-sm">
                  Company Name
                </th>
                <th className="border-b-2 p-2 text-left text-sm">
                  Interview Date
                </th>
                <th className="border-b-2 p-2 text-left text-sm">
                  Offer Status
                </th>
                <th className="border-b-2 p-2 text-left text-sm">
                  Registration Status
                </th>
                <th className="border-b-2 p-2 text-left text-sm">
                  Present Status
                </th>
              </tr>
            </thead>
            <tbody>
              {paginateTransactions().map((transaction, index) => (
                <tr key={index} className="hover:bg-slate-50">
                  <td className="border-b-2 p-2">{transaction.sno}</td>
                  <td className="border-b-2 p-2">{transaction.companyname}</td>
                  <td className="border-b-2 p-2">{transaction.date}</td>
                  <td className="border-b-2 p-2">
                    <span
                      className={`px-3 py-1 text-xs font-medium rounded-full ${getBadgeColor(
                        transaction.interviewstatus
                      )}`}
                    >
                      {transaction.interviewstatus}
                    </span>
                  </td>
                  <td className="border-b-2 p-2">
                    <span
                      className={`px-3 py-1 text-xs font-medium rounded-full ${getBadgeColor(
                        transaction.registrationstatus
                      )}`}
                    >
                      {transaction.registrationstatus}
                    </span>
                  </td>
                  <td className="border-b-2 p-2">
                    <span
                      className={`px-3 py-1 text-xs font-medium rounded-full ${getBadgeColor(
                        transaction.presentstatus
                      )}`}
                    >
                      {transaction.presentstatus}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="flex justify-center mt-4 space-x-2">
          <button
            disabled={currentPage === 1}
            onClick={() => handlePageChange(currentPage - 1)}
            className="px-3 py-1 bg-gray-100 rounded-md text-gray-600 hover:bg-gray-200 disabled:opacity-50"
          >
            &lt;
          </button>
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i + 1}
              onClick={() => handlePageChange(i + 1)}
              className={`px-3 py-1 rounded-md ${
                currentPage === i + 1
                  ? "bg-[#556ee6] text-white"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              {i + 1}
            </button>
          ))}
          <button
            disabled={currentPage === totalPages}
            onClick={() => handlePageChange(currentPage + 1)}
            className="px-3 py-1 bg-gray-100 rounded-md text-gray-600 hover:bg-gray-200 disabled:opacity-50"
          >
            &gt;
          </button>
        </div>
      </div>
    </div>
  );
};

export default TransactionTable;
