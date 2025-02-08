import React, { useState, useEffect } from 'react';
import { HiX } from 'react-icons/hi';

export default function AddEditModal({ isOpen, onClose, onSubmit, item }) {
  const [formData, setFormData] = useState({
    rollno: '',
    name: '',
    dob: '',
    gender: 'Male',
    mobile: '',
    batch: '',
    department: '',
    mentorid: '',
    mentorname: '',
    aadhaar: '',
    pan: '',
    collegeemail: '',
    personalmail: '',
    parentmobile: '',
    leetcodeusername: '',
    githubusername: '',
  });

  useEffect(() => {
    if (item) {
      setFormData(item);
    }
  }, [item]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full">
      <div className="relative top-20 mx-auto p-5 border w-[500px] shadow-lg rounded-md bg-white">
        <div className="mt-3 text-center">
          <h3 className="text-lg leading-6 font-medium text-gray-900">
            {item ? 'Edit' : 'Add'} Student Data
          </h3>
          <form onSubmit={handleSubmit} className="mt-2 text-left grid grid-cols-2 gap-4">
            {Object.keys(formData).map((key) => (
              <div key={key} className="mb-2">
                <label className="block text-gray-700 text-sm font-bold mb-1" htmlFor={key}>
                  {key.charAt(0).toUpperCase() + key.slice(1)}
                </label>
                <input
                  type={key === 'dob' ? 'date' : 'text'}
                  name={key}
                  id={key}
                  value={formData[key]}
                  onChange={handleChange}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  required
                />
              </div>
            ))}
            <div className="col-span-2 flex items-center justify-between mt-4">
              <button
                type="submit"
                className="bg-[#6777EF] hover:bg-[#6777EF]/90 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              >
                {item ? 'Update' : 'Add'}
              </button>
              <button
                onClick={onClose}
                className="bg-red-500 hover:bg-red-500/90 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
