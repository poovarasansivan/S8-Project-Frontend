import React, { useState, useEffect } from "react";
import { HiPencil, HiTrash, HiEye } from "react-icons/hi";
import SearchBar from "../../table/search";
import AddEditModal from "../../table/addeditmodal";
import ViewModal from "../../table/viewmodal";
import DeleteConfirmation from "../../table/deletemodal";
import Pagination from "../../table/pagenation";
import FileHandler from "../../table/filehandler";
import axios from "axios";


const ROWS_PER_PAGE = 6;

export default function Table() {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState(data);
  const [currentPage, setCurrentPage] = useState(1);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [currentItem, setCurrentItem] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8080/protected/get-students-profile-data",
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

  const handleImport = async (importedData) => {
  
    try {
      // 1. Send the imported data to the API for insertion
      const response = await fetch(
        "http://localhost:8080/protected/add-students-profile-data", // Your import API
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify([
            {
              roll_no: importedData.rollno,
              name: importedData.name,
              dob: importedData.dob,
              gender: importedData.gender,
              phone_no: importedData.mobile,
              regulation: importedData.regulation,
              batch: importedData.batch,
              department: importedData.department,
              year: importedData.year,
              mentor_id: importedData.mentorId,
              mentor_name: importedData.mentorName,
              aadhaar_no: importedData.aadhaarNo,
              pan_no: importedData.panNo,
              college_email: importedData.collegeEmail,
              personal_email: importedData.personalEmail,
              parent_mobile: importedData.parentMobile,
              leetcode_username: importedData.leetcodeUsername,
              github_username: importedData.githubUsername,
              role: importedData.role,
            },
          ]),
        }
      );
  
      if (!response.ok) {
        throw new Error("Failed to import data");
      }
  
      const importDataResponse = await response.text();
      console.log("Data successfully imported");
  
      const retrieveResponse = await fetch(
        "http://localhost:8080/protected/get-students-profile-data", // Your retrieve API
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
  
      if (!retrieveResponse.ok) {
        throw new Error("Failed to retrieve data");
      }
  
      const retrievedData = await retrieveResponse.json();
      console.log("Retrieved Data:", retrievedData);
  
      setData((prevData) => [...prevData, ...retrievedData]);
  
    } catch (error) {
      console.error("Error importing or retrieving data:", error);
    }
  };
  

  const handleEdit = (editedItem) => {
    setData(
      data.map((item) =>
        item.rollno === editedItem.rollno ? editedItem : item
      )
    );
    setIsEditModalOpen(false);
  };

  const handleDelete = (id) => {
    setData(data.filter((item) => item.id !== id));
    setIsDeleteModalOpen(false);
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
        <p>Students Profile Data</p>
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
                Date Of Birth
              </th>
              <th className="py-3 px-6 text-left whitespace-nowrap">Gender</th>
              <th className="py-3 px-6 text-left whitespace-nowrap">
                Phone No
              </th>
              <th className="py-3 px-6 text-left whitespace-nowrap">Batch</th>
              <th className="py-3 px-6 text-left whitespace-nowrap">
                Department
              </th>
              <th className="py-3 px-6 text-left whitespace-nowrap">
                Year
              </th>
              <th className="py-3 px-6 text-left whitespace-nowrap">
                Mentor Id
              </th>
              <th className="py-3 px-6 text-left whitespace-nowrap">
                Mentor Name
              </th>
              <th className="py-3 px-6 text-left whitespace-nowrap">
                Aadhaar No
              </th>
              <th className="py-3 px-6 text-left whitespace-nowrap">Pan No</th>
              <th className="py-3 px-6 text-left whitespace-nowrap">
                College Email
              </th>
              <th className="py-3 px-6 text-left whitespace-nowrap">
                Personal Email
              </th>
              <th className="py-3 px-6 text-left whitespace-nowrap">
                Parent Mobile
              </th>
              <th className="py-3 px-6 text-left whitespace-nowrap">
                Leetcode Username
              </th>
              <th className="py-3 px-6 text-left whitespace-nowrap">
                Github Username
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
                  {item.rollno}
                </td>
                <td className="py-3 px-6 text-left whitespace-nowrap">
                  {item.name}
                </td>
                <td className="py-3 px-6 text-left whitespace-nowrap">
                  {item.dob}
                </td>
                <td className="py-3 px-6 text-left whitespace-nowrap">
                  {item.gender}
                </td>
                <td className="py-3 px-6 text-left whitespace-nowrap">
                  {item.phone_no}
                </td>
                <td className="py-3 px-6 text-left whitespace-nowrap">
                  {item.batch}
                </td>
                <td className="py-3 px-6 text-left whitespace-nowrap">
                  {item.department}
                </td>
                <td className="py-3 px-6 text-left whitespace-nowrap">
                  {item.year}
                </td>
                <td className="py-3 px-6 text-left whitespace-nowrap">
                  {item.mentor_id}
                </td>
                <td className="py-3 px-6 text-left whitespace-nowrap">
                  {item.mentor_name}
                </td>
                <td className="py-3 px-6 text-left whitespace-nowrap">
                  {item.aadhar_no}
                </td>
                <td className="py-3 px-6 text-left whitespace-nowrap">
                  {item.pan_no}
                </td>
                <td className="py-3 px-6 text-left whitespace-nowrap">
                  {item.college_email}
                </td>
                <td className="py-3 px-6 text-left whitespace-nowrap">
                  {item.personal_email}
                </td>
                <td className="py-3 px-6 text-left whitespace-nowrap">
                  {item.parent_mobile_no}
                </td>
                <td className="py-3 px-6 text-left whitespace-nowrap">
                  {item.leetcode_username}
                </td>
                <td className="py-3 px-6 text-left whitespace-nowrap">
                  {item.github_username}
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
                    <button
                      className="transform text-red-600"
                      onClick={() => {
                        setCurrentItem(item);
                        setIsDeleteModalOpen(true);
                      }}
                    >
                      <HiTrash className="w-5 h-5" />
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

      {isDeleteModalOpen && (
        <DeleteConfirmation
          isOpen={isDeleteModalOpen}
          onClose={() => setIsDeleteModalOpen(false)}
          onConfirm={() => handleDelete(currentItem.roll_no)}
          itemName={currentItem.name}
        />
      )}
    </div>
  );
}
