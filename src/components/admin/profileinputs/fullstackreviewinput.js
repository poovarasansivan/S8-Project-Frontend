import React, { useState, useEffect } from "react";
import { HiPencil, HiEye } from "react-icons/hi";
import SearchBar from "../../table/search";
import AddEditModal from "../../table/reviewdataedit";
import ViewModal from "../../table/reviewviewmodal";
import Pagination from "../../table/pagenation";
import FileHandler from "../../table/reviewfilehandler";
import axios from "axios";

const ROWS_PER_PAGE = 6;

export default function Table() {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState(data);
  const [currentPage, setCurrentPage] = useState(1);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [currentItem, setCurrentItem] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

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
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get("http://localhost:8080/protected/get-fullstackreview-data", {
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setData(response.data);
      setFilteredData(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };


  const handleEdit = (editedItem) => {
    setData(
      data.map((item) => (item.rollno === editedItem.rollno ? editedItem : item))
    );
    setIsEditModalOpen(false);
  };



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
        <p>Full Stack Review Data</p>
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
               Reviewer Name
              </th>
              <th className="py-3 px-6 text-left whitespace-nowrap">
              Reviewer Email
              </th>
              <th className="py-3 px-6 text-left whitespace-nowrap">
              Department
              </th>
              <th className="py-3 px-6 text-left whitespace-nowrap">
              Venue
              </th>
              <th className="py-3 px-6 text-left whitespace-nowrap">
              Date
              </th>
              <th className="py-3 px-6 text-left whitespace-nowrap">
              Time
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
                  {item.reviewer_name}
                </td>
                <td className="py-3 px-6 text-left whitespace-nowrap">
                  {item.reviewer_email}
                </td>
                <td className="py-3 px-6 text-left whitespace-nowrap">
                  {item.rev_department}
                </td>
                <td className="py-3 px-6 text-left whitespace-nowrap">
                  {item.rev_venue}
                </td>
                <td className="py-3 px-6 text-left whitespace-nowrap">
                  {item.date}
                </td>
                <td className="py-3 px-6 text-left whitespace-nowrap">
                  {item.time}
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
                    <button
                      className="transform text-green-600 mr-3"
                      onClick={() => {
                        setCurrentItem(item);
                        setIsEditModalOpen(true);
                      }}
                    >
                      <HiPencil className="w-5 h-5" />
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

      {isEditModalOpen && (
        <AddEditModal
          isOpen={isEditModalOpen}
          onClose={() => setIsEditModalOpen(false)}
          onSubmit={handleEdit}
          item={currentItem}
        />
      )}

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
