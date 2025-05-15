import React, { useContext, useEffect, useState } from "react";
import { WebContext } from "../context/WebContext";
import {
  assets,
  JobCategories,
  JobExperiences,
  JobLevels,
  JobLocations,
  JobTypes,
} from "../assets/assets";
import { FaFilter } from "react-icons/fa";
import JobCard from "./JobCard";
import { useNavigate } from "react-router-dom";

const JobList = () => {
  const { isSearched, searchFilter, setSearchFilter, job } = useContext(WebContext);

  const [showFilters, setShowFilters] = useState(true);
  const [currentPage, setcurrentPage] = useState(1);
  const [seclectedCategories, setSelectedCategories] = useState([]);
  const [seclectedLocations, setSelectedLocations] = useState([]);
  const [seclectedTypes, setSelectedTypes] = useState([]);
  const [filterJobs, setFilterJobs] = useState(job);

  // Tính tổng số lượng bộ lọc đang chọn
  const selectedFiltersCount =
    seclectedCategories.length +
    seclectedLocations.length +
    seclectedTypes.length;

  const handleCategoryChange = (category) => {
    setSelectedCategories((prev) =>
      prev.includes(category) ? prev.filter((c) => c !== category) : [...prev, category]
    );
  };

  const handleLocationChange = (location) => {
    setSelectedLocations((prev) =>
      prev.includes(location) ? prev.filter((c) => c !== location) : [...prev, location]
    );
  };

  const handleTypeChange = (type) => {
    setSelectedTypes((prev) =>
      prev.includes(type) ? prev.filter((c) => c !== type) : [...prev, type]
    );
  };

  // Logic xóa lọc
  const clearFilters = () => {
    setSelectedCategories([]);
    setSelectedLocations([]);
    setSelectedTypes([]);
  };

  useEffect(() => {
    const matchesCategories = (job) =>
      seclectedCategories.length === 0 || seclectedCategories.includes(job.category);
    const matchesLocations = (job) =>
      seclectedLocations.length === 0 || seclectedLocations.includes(job.location);
    const matchesType = (job) =>
      seclectedTypes.length === 0 || seclectedTypes.includes(job.type);
    const matchesTtitle = (job) =>
      searchFilter.title === "" || job.title.toLowerCase().includes(searchFilter.title.toLowerCase());
    const matchesLocation = (job) =>
      searchFilter.location === "" || job.location.toLowerCase().includes(searchFilter.location.toLowerCase());

    const newFilteredJobs = job
      .slice()
      .reverse()
      .filter(
        (job) =>
          matchesCategories(job) &&
          matchesLocations(job) &&
          matchesType(job) &&
          matchesTtitle(job) &&
          matchesLocation(job)
      );

    setFilterJobs(newFilteredJobs);
    setcurrentPage(1);
  }, [job, seclectedCategories, seclectedLocations, seclectedTypes, searchFilter]);

  const navigate = useNavigate();
  return (
    <div className="container 2xl:px-20 mx-auto flex flex-col lg:flex-row max-lg:space-y-8 py-8">
      {/* Sidebar */}
      <div className="w-full lg:w-1/4 bg-white px-4 border">
        {/* Nút xóa lọc */}
        <div className="flex items-center justify-between p-4 rounded-md">
          <div className="flex items-center gap-2 text-gray-800 font-semibold text-lg mt-2">
            <FaFilter className="text-green-500" />
            <h1>Bộ lọc</h1>
          </div>
          <button
            onClick={clearFilters}
            disabled={selectedFiltersCount === 0}
            className={`px-4 ml-5 mt-2 py-2 rounded-full font-bold text-lg transition ${
              selectedFiltersCount === 0
                ? "bg-gray-300 text-gray-500 cursor-not-allowed" 
                : "bg-white text-red-600 hover:bg-red-50"
            }`}
          >
            Xóa lọc ({selectedFiltersCount})
          </button>
        </div>

        {/* Bộ lọc ngành nghề */}
        <div className={showFilters ? "" : "max-lg:hidden"}>
          <h4 className="font-bold text-lg py-4">Ngành nghề</h4>
          <ul className="space-y-4 text-gray-600">
            {JobCategories.map((category, index) => (
              <li className="flex gap-3 items-center" key={index}>
                <input
                  className="scale-125"
                  type="checkbox"
                  onChange={() => handleCategoryChange(category)}
                  checked={seclectedCategories.includes(category)}
                />
                {category}
              </li>
            ))}
          </ul>
        </div>

        {/* Bộ lọc địa điểm */}
        <div className="max-lg:hidden">
          <h4 className="font-bold text-lg py-4 pt-9">Địa điểm</h4>
          <ul className="space-y-4 text-gray-600">
            {JobLocations.map((location, index) => (
              <li className="flex gap-3 items-center" key={index}>
                <input
                  className="scale-125"
                  type="checkbox"
                  onChange={() => handleLocationChange(location)}
                  checked={seclectedLocations.includes(location)}
                />
                {location}
              </li>
            ))}
          </ul>
        </div>

        {/* Bộ lọc loại hình */}
        <div className="max-lg:hidden">
          <h4 className="font-bold text-lg py-4 pt-9">Loại hình</h4>
          <div className="flex flex-wrap gap-4 text-gray-600">
            {JobTypes.map((type, index) => (
              <label className="flex items-center gap-2 w-1/3" key={index}>
                <input
                  className="scale-125"
                  type="checkbox"
                  onChange={() => handleTypeChange(type)}
                  checked={seclectedTypes.includes(type)}
                />
                {type}
              </label>
            ))}
          </div>
        </div>
      </div>

      {/* Danh sách công việc */}
      <section className="ml-4 w-full lg:w-3/4 text-gray-800 max-lg:px-4">
        <h3 className="font-bold text-3xl py-2" id="job-list">
          Việc làm mới nhất
        </h3>
        <p className="mb-8">
          Nơi bạn tìm thấy công việc phù hợp nhất với bản thân
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
          {Array.isArray(filterJobs) &&
            filterJobs
              .slice((currentPage - 1) * 12, currentPage * 12)
              .map((job, index) => <JobCard key={index} job={job} />)}
        </div>
                {/* Nút xem thêm */}
                <div className="flex justify-center mt-8">
          <button
            onClick={() => navigate("/collection-jobs")}
            className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-slate-200 hover:text-black transition"
          >
            Xem thêm
          </button>
          </div>
      </section>
    </div>
  );
};

export default JobList;
