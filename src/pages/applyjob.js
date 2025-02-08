"use client";

import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function JobRegistrationForm() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    dob: "",
    nativePlace: "",
    rollNo: "",
    department: "",
    cgpa: "",
    sslcScore: "",
    hscScore: "",
    arrearsCount: "",
    skills: "",
    certificationCourses: "",
    resume: null,
  });

  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};

    // Required field validation
    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.dob) newErrors.dob = "Date of Birth is required";
    if (!formData.nativePlace.trim())
      newErrors.nativePlace = "Native Place is required";
    if (!formData.rollNo.trim()) newErrors.rollNo = "Roll Number is required";
    if (!formData.department.trim())
      newErrors.department = "Department is required";
    if (!formData.cgpa || isNaN(formData.cgpa))
      newErrors.cgpa = "Enter a valid CGPA";
    if (!formData.sslcScore || isNaN(formData.sslcScore))
      newErrors.sslcScore = "Enter a valid SSLC Score";
    if (!formData.hscScore || isNaN(formData.hscScore))
      newErrors.hscScore = "Enter a valid HSC Score";
    if (!formData.arrearsCount || isNaN(formData.arrearsCount))
      newErrors.arrearsCount = "Enter a valid number of arrears";
    if (!formData.skills.trim()) newErrors.skills = "Skills are required";
    if (!formData.certificationCourses.trim())
      newErrors.certificationCourses = "Certification courses are required";
    if (!formData.resume) newErrors.resume = "Please upload your resume";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      console.log("Form submitted:", formData);
      // Handle form submission
    }
    navigate("/job-details");
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData((prev) => ({ ...prev, resume: file }));
    }
  };

  const handlecancel = () => {
    navigate("/job-details");
  };
  return (
    <div className="w-auto md:w-2/3 mx-auto p-6 bg-white rounded-lg shadow-md">
      <div className="mb-6">
        <h2 className="text-xl text-gray-800 font-semibold mb-2">
          Registration Form
        </h2>
        <p className="text-gray-600">
          Fills the Required Details Completely and don't make any mistake in
          the details. Review before submitting the form.
        </p>
      </div>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="name" className="block font-medium">
            Name
          </label>
          <input
            id="name"
            type="text"
            value={formData.name}
            placeholder="Poovarasan S"
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className={`w-full px-3 py-2 border ${
              errors.name ? "border-red-500" : "border-gray-300"
            } rounded-md`}
          />
          {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
        </div>

        <div>
          <label htmlFor="dob" className="block font-medium">
            Date of Birth
          </label>
          <input
            id="dob"
            type="date"
            value={formData.dob}
            onChange={(e) => setFormData({ ...formData, dob: e.target.value })}
            className={`w-full px-3 py-2 border ${
              errors.dob ? "border-red-500" : "border-gray-300"
            } rounded-md`}
          />
          {errors.dob && <p className="text-red-500 text-sm">{errors.dob}</p>}
        </div>

        <div>
          <label htmlFor="nativePlace" className="block font-medium">
            Native Place
          </label>
          <input
            id="nativePlace"
            type="text"
            value={formData.nativePlace}
            placeholder="Dharmapuri"
            onChange={(e) =>
              setFormData({ ...formData, nativePlace: e.target.value })
            }
            className={`w-full px-3 py-2 border ${
              errors.nativePlace ? "border-red-500" : "border-gray-300"
            } rounded-md`}
          />
          {errors.nativePlace && (
            <p className="text-red-500 text-sm">{errors.nativePlace}</p>
          )}
        </div>
        <div>
          <label htmlFor="rollNo" className="block font-medium">
            Roll Number
          </label>
          <input
            id="rollNo"
            type="text"
            value={formData.rollNo}
            placeholder="7376211CS239"
            onChange={(e) =>
              setFormData({ ...formData, rollNo: e.target.value })
            }
            className={`w-full px-3 py-2 border ${
              errors.rollNo ? "border-red-500" : "border-gray-300"
            } rounded-md`}
          />
          {errors.rollNo && (
            <p className="text-red-500 text-sm">{errors.rollNo}</p>
          )}
        </div>

        <div>
          <label htmlFor="department" className="block font-medium">
            Department
          </label>
          <input
            id="department"
            type="text"
            value={formData.department}
            placeholder="CSE"
            onChange={(e) =>
              setFormData({ ...formData, department: e.target.value })
            }
            className={`w-full px-3 py-2 border ${
              errors.department ? "border-red-500" : "border-gray-300"
            } rounded-md`}
          />
          {errors.department && (
            <p className="text-red-500 text-sm">{errors.department}</p>
          )}
        </div>

        <div>
          <label htmlFor="cgpa" className="block font-medium">
            CGPA
          </label>
          <input
            id="cgpa"
            type="text"
            value={formData.cgpa}
            placeholder="8.5"
            onChange={(e) => setFormData({ ...formData, cgpa: e.target.value })}
            className={`w-full px-3 py-2 border ${
              errors.cgpa ? "border-red-500" : "border-gray-300"
            } rounded-md`}
          />
          {errors.cgpa && <p className="text-red-500 text-sm">{errors.cgpa}</p>}
        </div>

        <div>
          <label htmlFor="sslcScore" className="block font-medium">
            SSLC Score Percentage
          </label>
          <input
            id="sslcScore"
            type="text"
            value={formData.sslcScore}
            placeholder="89"
            onChange={(e) =>
              setFormData({ ...formData, sslcScore: e.target.value })
            }
            className={`w-full px-3 py-2 border ${
              errors.sslcScore ? "border-red-500" : "border-gray-300"
            } rounded-md`}
          />
          {errors.sslcScore && (
            <p className="text-red-500 text-sm">{errors.sslcScore}</p>
          )}
        </div>

        <div>
          <label htmlFor="hscScore" className="block font-medium">
            HSC Score Percentage
          </label>
          <input
            id="hscScore"
            type="text"
            value={formData.hscScore}
            placeholder="93"
            onChange={(e) =>
              setFormData({ ...formData, hscScore: e.target.value })
            }
            className={`w-full px-3 py-2 border ${
              errors.hscScore ? "border-red-500" : "border-gray-300"
            } rounded-md`}
          />
          {errors.hscScore && (
            <p className="text-red-500 text-sm">{errors.hscScore}</p>
          )}
        </div>

        <div>
          <label htmlFor="arrearsCount" className="block font-medium">
            No. of Arrears
          </label>
          <input
            id="arrearsCount"
            type="text"
            value={formData.arrearsCount}
            placeholder="0"
            onChange={(e) =>
              setFormData({ ...formData, arrearsCount: e.target.value })
            }
            className={`w-full px-3 py-2 border ${
              errors.arrearsCount ? "border-red-500" : "border-gray-300"
            } rounded-md`}
          />
          {errors.arrearsCount && (
            <p className="text-red-500 text-sm">{errors.arrearsCount}</p>
          )}
        </div>

        <div>
          <label htmlFor="skills" className="block font-medium">
            Skills
          </label>
          <input
            id="skills"
            type="text"
            value={formData.skills}
            placeholder="Web Developer, Java Programmer"
            onChange={(e) =>
              setFormData({ ...formData, skills: e.target.value })
            }
            className={`w-full px-3 py-2 border ${
              errors.skills ? "border-red-500" : "border-gray-300"
            } rounded-md`}
          />
          {errors.skills && (
            <p className="text-red-500 text-sm">{errors.skills}</p>
          )}
        </div>

        <div>
          <label htmlFor="certificationCourses" className="block font-medium">
            Certification Courses
          </label>
          <input
            id="certificationCourses"
            type="text"
            value={formData.certificationCourses}
            placeholder="Blockchain Basics"
            onChange={(e) =>
              setFormData({ ...formData, certificationCourses: e.target.value })
            }
            className={`w-full px-3 py-2 border ${
              errors.certificationCourses ? "border-red-500" : "border-gray-300"
            } rounded-md`}
          />
          {errors.certificationCourses && (
            <p className="text-red-500 text-sm">
              {errors.certificationCourses}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="resume" className="block font-medium">
            Resume
          </label>
          <input
            id="resume"
            type="file"
            accept=".pdf,.doc,.docx"
            onChange={handleFileChange}
            className={`w-full px-3 py-2 border ${
              errors.resume ? "border-red-500" : "border-gray-300"
            } rounded-md`}
          />
          {errors.resume && (
            <p className="text-red-500 text-sm">{errors.resume}</p>
          )}
        </div>

        <div className="flex gap-4">
          <button
            type="submit"
            className="px-4 py-2 bg-[#556ee6] text-white rounded-md hover:bg-[#6777EF]/90"
          >
            Submit
          </button>
          <button
            type="button"
            className="px-4 py-2 bg-gray-300  text-gray-700 rounded-md hover:bg-gray-400"
            onClick={handlecancel}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
