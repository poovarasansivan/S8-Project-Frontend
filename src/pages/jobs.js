import { useState, useEffect } from "react";
import { FaMapMarkerAlt, FaClock, FaSearch } from "react-icons/fa";
import { BsBriefcase } from "react-icons/bs";
import Presidio from "../assets/companylogo/presidio.png";
import Cooper from "../assets/companylogo/cooper.png";
import Surveysparrow from "../assets/companylogo/sparrow.png";
import { useNavigate } from "react-router-dom";

export default function JobGrid() {
  const [searchTerm, setSearchTerm] = useState("");
  const [locationFilter, setLocationFilter] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [timeFilter, setTimeFilter] = useState("");
  const [filteredJobs, setFilteredJobs] = useState([]);
  const Navigate = useNavigate();
  const categories = [
    "All Categories",
    "Technology",
    "Marketing",
    "Design",
    "Management",
  ];
  const timeOptions = [
    "All Time",
    "Full Time",
    "Part Time",
    "Freelance",
    "Internship",
  ];

  const jobs = [
    {
      id: 1,
      title: "Software Developer",
      company: "Mrcooper Technology Pvt.Ltd",
      location: "Chennai",
      salary: "850000 / LPA",
      experience: "0-2 Yrs Exp.",
      category: "Technology",
      type: ["Full Time"],
      logo: Cooper,
    },
    {
      id: 2,
      title: "Frontend Developer",
      company: "Survey Sparrow Technology Pvt.Ltd",
      location: "Chennai",
      salary: "600000 - 800000 / LPA",
      experience: "0-2 Yrs Exp.",
      category: "Technology",
      type: ["Full Time"],
      logo: Surveysparrow,
    },
    {
      id: 3,
      title: "Backend Developer",
      company: "Survey Sparrow Technology Pvt.Ltd",
      location: "Chennai",
      salary: "600000 - 800000 / LPA",
      experience: "0-2 Yrs Exp.",
      category: "Technology",
      type: ["Full Time"],
      logo: Surveysparrow,
    },
    {
      id: 4,
      title: "Associate Software Engineer",
      company: "Presidio Inc Pvt.Ltd",
      location: "Chennai",
      salary: "9500000 / LPA",
      experience: "0-2 Yrs Exp.",
      category: "Technology",
      type: ["Full Time"],
      logo: Presidio,
    },
  ];

  // Filter jobs based on search criteria
  useEffect(() => {
    const filtered = jobs.filter((job) => {
      const matchesSearch =
        job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.company.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesLocation =
        !locationFilter ||
        job.location.toLowerCase().includes(locationFilter.toLowerCase());
      const matchesCategory =
        !categoryFilter ||
        categoryFilter === "All Categories" ||
        job.category === categoryFilter;
      const matchesTime =
        !timeFilter ||
        timeFilter === "All Time" ||
        job.type.includes(timeFilter);

      return matchesSearch && matchesLocation && matchesCategory && matchesTime;
    });
    setFilteredJobs(filtered);
  }, [searchTerm, locationFilter, categoryFilter, timeFilter]);

  // Handle search submission
  const handleSearch = (e) => {
    e.preventDefault();
    // Search is already handled by useEffect
  };

  const handledetails = () => {
    Navigate("/job-details");
  };
  const handleapplyjob = () => {
    Navigate("/register-job");
  };
  return (
    <div className=" bg-white shadow-md rounded-lg  p-4 md:p-8">
      <form onSubmit={handleSearch} className="mb-8 grid gap-4 md:grid-cols-5">
        <div className="relative md:col-span-2">
          <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search your job"
            className="w-full rounded-md border border-gray-300 py-2 pl-10 pr-4 focus:border-[#556ee6] focus:outline-none"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="relative">
          <FaMapMarkerAlt className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Chennai, TN"
            className="w-full rounded-md border border-gray-300 py-2 pl-10 pr-4 focus:border-[#556ee6] focus:outline-none"
            value={locationFilter}
            onChange={(e) => setLocationFilter(e.target.value)}
          />
        </div>
        <div className="relative">
          <BsBriefcase className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <select
            className="w-full appearance-none rounded-md border border-gray-300 bg-white py-2 pl-10 pr-4 focus:border-[#556ee6] focus:outline-none"
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
          >
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>
        <div className="relative">
          <FaClock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <select
            className="w-full appearance-none rounded-md border border-gray-300 bg-white py-2 pl-10 pr-4 focus:border-[#556ee6] focus:outline-none"
            value={timeFilter}
            onChange={(e) => setTimeFilter(e.target.value)}
          >
            {timeOptions.map((time) => (
              <option key={time} value={time}>
                {time}
              </option>
            ))}
          </select>
        </div>
      </form>
      {/* Jobs Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredJobs.map((job) => (
          <div
            key={job.id}
            className="overflow-hidden rounded-lg border border-gray-200 bg-white p-6 shadow-sm"
          >
            <div className="mb-4">
              <div className="mb-4">
                <img
                  src={job.logo}
                  alt={job.company}
                  className="h-12 w-32 rounded-md object-contain "
                />
              </div>
            </div>
            <h3 className="mb-2 text-lg text-gray-800 font-semibold">
              {job.title}
            </h3>
            <p className="mb-4 text-medium text-gray-600">{job.experience}</p>
            <div className="mb-4">
              <p className="mb-1 flex items-center gap-2 text-sm text-gray-600">
                <span className="font-medium">{job.company}</span>
              </p>
              <p className="mb-1 flex items-center gap-2 text-md text-gray-600">
                <FaMapMarkerAlt className="text-gray-400" />
                {job.location}
              </p>
              <p className="flex items-center gap-2 text-md text-gray-600">
                {job.salary}
              </p>
            </div>
            <div className="mb-4 flex flex-wrap gap-2">
              {job.type.map((type, index) => (
                <span
                  key={index}
                  className={`rounded-full px-3 py-1 text-xs ${
                    type === "Full Time"
                      ? "bg-green-100 text-green-600"
                      : type === "Urgent"
                      ? "bg-orange-100 text-orange-600"
                      : "bg-blue-100 text-[#556ee6]"
                  }`}
                >
                  {type}
                </span>
              ))}
            </div>
            <div className="flex gap-4">
              <button
                className="flex-1 rounded-md border border-[#556ee6] py-2 text-sm text-[#556ee6] hover:bg-[#6777EF]/10"
                onClick={handledetails}
              >
                View Details
              </button>
              <button
                className="flex-1 rounded-md bg-[#556ee6] py-2 text-sm text-white hover:bg-[#6777EF] "
                onClick={handleapplyjob}
              >
                Apply Now
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
