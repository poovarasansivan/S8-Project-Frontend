import React, { useState, useEffect } from "react";
import {  HiEye } from "react-icons/hi";
import SearchBar from "../../table/search";
import ViewModal from "../../table/fullstackviewmodal";
import Pagination from "../../table/pagenation";
import FileHandler from "../../table/academicfilehandle";
import axios from "axios";


const ROWS_PER_PAGE = 6;

export default function Table() {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState(data);
  const [currentPage, setCurrentPage] = useState(1);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [currentItem, setCurrentItem] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const token = localStorage.getItem("token");

  useEffect(() => {
    const lowercasedFilter = searchTerm.toLowerCase();
    const filteredItems = data.filter((item) =>
      Object.keys(item).some((key) =>
        item[key].toString().toLowerCase().includes(lowercasedFilter)
      )
    );
    setFilteredData(filteredItems);
    setCurrentPage(1); // Reset to first page when searching
  }, [data, searchTerm]);

  const handleImport = (importedData) => {
    setData((prevData) => [...prevData, ...importedData]);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8080/protected/get-fullstackproject-data",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setData(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);



  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  // Calculate pagination
  const totalPages = Math.ceil(filteredData.length / ROWS_PER_PAGE);
  const startIndex = (currentPage - 1) * ROWS_PER_PAGE;
  const paginatedData = filteredData.slice(
    startIndex,
    startIndex + ROWS_PER_PAGE
  );

  return (
    <div className="container mx-auto ">
      <div className="text-xl text-gray-600 font-semibold mb-3">
        <p>Full Stack Project Details</p>
      </div>
      <div className="mb-4 flex justify-between items-center">
        <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        <FileHandler onImport={handleImport} data={data} />
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white">
          <thead>
            <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
              <th className="py-3 px-6 text-left whitespace-nowrap">S No</th>
              <th className="py-3 px-6 text-left whitespace-nowrap">Rollno</th>
              <th className="py-3 px-6 text-left whitespace-nowrap">Name</th>

              <th className="py-3 px-6 text-left whitespace-nowrap">
              Full Stack Rank
              </th>
              <th className="py-3 px-6 text-left whitespace-nowrap">
              Full Stack Point
              </th>
              <th className="py-3 px-6 text-left whitespace-nowrap">Stack</th>
              <th className="py-3 px-6 text-left whitespace-nowrap">
                Current Level
              </th>
              <th className="py-3 px-6 text-left whitespace-nowrap">
              Project ID
              </th>
              <th className="py-3 px-6 text-left whitespace-nowrap">Title</th>
              <th className="py-3 px-6 text-left whitespace-nowrap">
              Description
              </th>
              <th className="py-3 px-6 text-left whitespace-nowrap">
              Assigned By
              </th>
              <th className="py-3 px-6 text-left whitespace-nowrap">Action</th>
            </tr>
          </thead>
          <tbody className="text-gray-600 text-md font-normal">
            {paginatedData.map((item, index) => (
              <tr
                key={item.id}
                className="border-b border-gray-200 hover:bg-gray-100"
              >
                <td className="py-3 px-6 text-left whitespace-nowrap">
                  {(currentPage - 1) * ROWS_PER_PAGE + index + 1}
                </td>
                <td className="py-3 px-6 text-left whitespace-nowrap">
                  {item.roll_no}
                </td>
                <td className="py-3 px-6 text-left whitespace-nowrap">
                  {item.name}
                </td>
                <td className="py-3 px-6 text-left whitespace-nowrap">
                  {item.full_stack_point}
                </td>
                <td className="py-3 px-6 text-left whitespace-nowrap">
                  {item.full_stack_rank}
                </td>
                <td className="py-3 px-6 text-left whitespace-nowrap">
                  {item.current_level}
                </td>
                <td className="py-3 px-6 text-left whitespace-nowrap">
                  {item.assigned_stack}
                </td>
                <td className="py-3 px-6 text-left whitespace-nowrap">
                  {item.project_id}
                </td>
                <td className="py-3 px-6 text-left whitespace-nowrap">
                  {item.project_title}
                </td>
                <td className="py-3 px-6 text-left whitespace-nowrap">
                  {item.project_description}
                </td>
                <td className="py-3 px-6 text-left whitespace-nowrap">
                  {item.assigned_by}
                </td>

                <td className="py-3 px-6 text-center">
                  <div className="flex item-center justify-center">
                    <button
                      className="transform text-[#6777EF] mr-3"
                      onClick={() => {
                        setCurrentItem(item);
                        setIsViewModalOpen(true);
                      }}
                    >
                      <HiEye className="w-5 h-5" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />

     

      {isViewModalOpen && (
        <ViewModal
          isOpen={isViewModalOpen}
          onClose={() => setIsViewModalOpen(false)}
          item={currentItem}
        />
      )}

      
    </div>
  );
}
