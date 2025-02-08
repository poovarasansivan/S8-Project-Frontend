import React from "react";

export default function ViewModal({ isOpen, onClose, item }) {
  if (!isOpen || !item) return null;

  return (
    <div
      className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full"
      id="my-modal"
    >
      <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
        <div className="mt-3">
          <h3 className="text-lg leading-6 font-medium text-gray-600">
            Fullstack Developer Details
          </h3>
          <div className="mt-2 space-y-2">
            <p className="text-md text-gray-500">
              <strong>Roll Number:</strong> {item.roll_no}
            </p>
            <p className="text-md text-gray-500">
              <strong>Name:</strong> {item.name}
            </p>
            <p className="text-md text-gray-500">
              <strong>Full Stack Pointk:</strong> {item.full_stack_point}
            </p>
            <p className="text-md text-gray-500">
              <strong>Fullstack Rank:</strong> {item.full_stack_rank}
            </p>
            <p className="text-md text-gray-500">
              <strong>Current Level:</strong> {item.current_level}
            </p>
            <p className="text-md text-gray-500">
              <strong>Assigned Stack:</strong> {item.assigned_stack}
            </p>
            <p className="text-md text-gray-500">
              <strong>Project ID:</strong> {item.project_id}
            </p>
            <p className="text-md text-gray-500">
              <strong>Project Title:</strong> {item.project_title}
            </p>
            <p className="text-md text-gray-500">
              <strong>Description:</strong> {item.project_description}
            </p>
            <p className="text-md text-gray-500">
              <strong>Assigned By:</strong> {item.assigned_by}
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
