import React from 'react';
import { HiX } from 'react-icons/hi';

export default function ViewModal({ isOpen, onClose, item }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full" id="my-modal">
      <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
        <div className="mt-3">
          <h3 className="text-lg leading-6 font-medium text-gray-600">Student Details</h3>
          <div className="mt-2">
            <p className="text-md text-gray-500">
              <strong>Rollno:</strong> {item.rollno}
            </p>
            <p className="text-md text-gray-500">
              <strong>Name:</strong> {item.name}
            </p>
            <p className="text-md text-gray-500">
              <strong>Date Of Birth:</strong> {item.dob}
            </p>
            <p className="text-md text-gray-500">
              <strong>Aadhaar:</strong> {item.aadhar_no}
            </p>
            <p className="text-md text-gray-500">
              <strong>Pan:</strong> {item.pan_no}
            </p>
            <p className="text-md text-gray-500">
              <strong>Personal Mail:</strong> {item.personal_email}
            </p>
            <p className="text-md text-gray-500">
              <strong>College Mail:</strong> {item.college_email}
            </p>
            <p className="text-md text-gray-500">
              <strong>Parent Mobile:</strong> {item.parent_mobile_no}
            </p>
            <p className="text-md text-gray-500">
              <strong>Leetcode Username:</strong> {item.leetcode_username}
            </p>
            <p className="text-md text-gray-500">
              <strong>Github Username:</strong> {item.github_username}
            </p>
          </div>
          <div className="mt-4">
            <button
              onClick={onClose}
              className="bg-gray-400 hover:bg-gray-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

