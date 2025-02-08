import React from 'react';

export default function ViewModal({ isOpen, onClose, item }) {
  if (!isOpen || !item) return null;

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full" id="my-modal">
      <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
        <div className="mt-3">
          <h3 className="text-lg leading-6 font-medium text-gray-600">Fullstack Review Details</h3>
          <div className="mt-2 space-y-2">
            <p className="text-md text-gray-500">
              <strong>Roll Number:</strong> {item.roll_no}
            </p>
            <p className="text-md text-gray-500">
              <strong>Name:</strong> {item.name}
            </p>
            <p className="text-md text-gray-500">
              <strong>Reviewer Name:</strong> {item.reviewer_name}
            </p>
            <p className="text-md text-gray-500">
              <strong>Reviewer Email:</strong> {item.reviewer_email}
            </p>
            <p className="text-md text-gray-500">
              <strong>Department:</strong> {item.rev_department}
            </p>
            <p className="text-md text-gray-500">
              <strong>Venue:</strong> {item.rev_venue}
            </p>
            <p className="text-md text-gray-500">
              <strong>Date:</strong> {item.date}
            </p>
            <p className="text-md text-gray-500">
              <strong>Time:</strong> {item.time}
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
