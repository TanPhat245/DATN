import React, { useContext, useEffect, useState } from "react";
import Navbar from "../components/Navbar"; // Thanh điều hướng
import Footer from "../components/Footer"; // Footer
import JobCard from "../components/JobCard"; // Thẻ công việc
import { FaSearch } from "react-icons/fa"; // Icon tìm kiếm
import { WebContext } from "../context/WebContext";
import { Link } from "react-router-dom";
import axios from "axios";
import JobCardCollect from "../components/JobCardCollect";

const CollectionJobs = () => {
  const { job } = useContext(WebContext);
  const [searchKeyword, setSearchKeyword] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const [provinces, setProvinces] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [selectedProvinceCode, setSelectedProvinceCode] = useState("");
  const [selectedDistrict, setSelectedDistrict] = useState("");

  const jobsPerPage = 12;

  // Lọc công việc dựa trên từ khóa, ngành nghề và địa điểm
  const filteredJobs = job.filter((jobItem) => {
    const matchesKeyword =
      searchKeyword === "" ||
      jobItem.title.toLowerCase().includes(searchKeyword.toLowerCase());

    const matchesCategory =
      selectedCategory === "" || jobItem.category === selectedCategory;

    const matchesLocation =
      (selectedDistrict === "" ||
        jobItem.location
          .toLowerCase()
          .includes(selectedDistrict.toLowerCase())) &&
      (selectedProvinceCode === "" ||
        (provinces.find((p) => p.code === Number(selectedProvinceCode))?.name &&
          jobItem.location
            .toLowerCase()
            .includes(
              provinces
                .find((p) => p.code === Number(selectedProvinceCode))
                ?.name.toLowerCase() || ""
            )));
    const matchesDistricts = selectedDistrict === "" || jobItem.location.toLowerCase().includes(selectedDistrict.toLowerCase());
    return matchesKeyword && matchesCategory && matchesLocation && matchesDistricts;
  });

  // Phân trang
  const totalPages = Math.ceil(filteredJobs.length / jobsPerPage);
  const displayedJobs = filteredJobs.slice(
    (currentPage - 1) * jobsPerPage,
    currentPage * jobsPerPage
  );

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  // Fetch danh sách tỉnh
  useEffect(() => {
    axios
      .get("https://provinces.open-api.vn/api/p/")
      .then((res) => setProvinces(res.data))
      .catch((err) => console.error(err));
  }, []);

  // Fetch huyện theo tỉnh
  useEffect(() => {
    if (selectedProvinceCode) {
      axios
        .get(
          `https://provinces.open-api.vn/api/p/${selectedProvinceCode}?depth=2`
        )
        .then((res) => setDistricts(res.data.districts))
        .catch((err) => console.error(err));
    }
  }, [selectedProvinceCode]);

  return (
    <>
      <Navbar />
      <div className="min-h-screen">
        {/* Thanh điều hướng */}
        <div className="container mx-auto px-4 py-4">
          <nav className="text-sm text-gray-600">
            <Link to="/" className="hover:text-blue-500">
              Trang chủ
            </Link>
            <span className="mx-2">/</span>
            <Link to="/collection-jobs" className="hover:text-blue-500">
              Cơ hội việc làm
            </Link>
          </nav>
        </div>

        <div className="bg-gray-100 min-h-screen">
          {/* Thanh tìm kiếm */}
          <div className="bg-white shadow-md py-6">
            <div className="container mx-auto px-4">
              <h1
                className="text-2xl font-bold text-gray-800 mb-4"
                id="job-list"
              >
                Tuyển dụng {job.length} việc làm tại Toàn quốc mới nhất năm 2025
              </h1>
              <div className="flex flex-wrap gap-4 mb-3">
                <input
                  type="text"
                  placeholder="Nhập từ khóa..."
                  value={searchKeyword}
                  onChange={(e) => setSearchKeyword(e.target.value)}
                  className="flex-1 border border-gray-300 rounded-lg px-4 py-2"
                />
              </div>
              <div className="flex flex-wrap gap-4">
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="border border-gray-300 rounded-lg px-4 py-2"
                >
                  <option value="">Tất cả ngành nghề</option>
                  <option value="Công nghệ thông tin">
                    Công nghệ thông tin
                  </option>
                  <option value="Kinh doanh">Kinh doanh</option>
                </select>
                {/* Dropdown lương */}
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="border border-gray-300 rounded-lg px-4 py-2"
                >
                  <option value="">Lương</option>
                  <option value="Công nghệ thông tin">
                    Công nghệ thông tin
                  </option>
                  <option value="Kinh doanh">Kinh doanh</option>
                </select>
                
                {/* Dropdown vị trí */}
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="border border-gray-300 rounded-lg px-4 py-2"
                >
                  <option value="">Lương</option>
                  <option value="Công nghệ thông tin">
                    Công nghệ thông tin
                  </option>
                  <option value="Kinh doanh">Kinh doanh</option>
                </select>

                {/* Dropdown địa điểm tỉnh + huyện lấy từ api */}
                {/* Tỉnh */}
                <div className="flex flex-col">
                  <label className="mb-1 font-semibold">Tỉnh</label>
                  <select
                    onChange={(e) => {setSelectedProvinceCode(e.target.value); setSelectedDistrict("");}}
                    className="border p-2 rounded"
                  >
                    <option value="">Chọn tỉnh</option>
                    {provinces.map((province) => (
                      <option key={province.code} value={province.code}>
                        {province.name}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Huyện */}
                <div className="flex flex-col">
                  <label className="mb-1 font-semibold">Quận/Huyện</label>
                  <select
                    onChange={(e) => setSelectedDistrict(e.target.value)}
                    className="border p-2 rounded"
                    disabled={!districts.length}
                  >
                    <option value="">Chọn huyện</option>
                    {districts.map((district) => (
                      <option key={district.code} value={district.name}>
                        {district.name}
                      </option>
                    ))}
                  </select>
                </div>
                <button className="bg-blue-500 text-white px-6 py-2 rounded-lg flex items-center gap-2">
                  <FaSearch />
                  Tìm kiếm
                </button>
              </div>
            </div>
          </div>

          {/* Danh sách công việc */}
          <div className="container mx-auto px-4 py-6">
            {displayedJobs.length > 0 ? (
<div className="flex flex-col gap-4">
  {displayedJobs.map((jobItem, index) => (
    <JobCardCollect key={index} job={jobItem} />
  ))}
</div>

            ) : (
              <p className="text-center text-gray-600">
                Không tìm thấy công việc phù hợp.
              </p>
            )}
          </div>

          {/* Phân trang */}
          <div className="container mx-auto px-4 py-6 flex justify-center">
            <nav className="flex items-center space-x-2">
              {Array.from({ length: totalPages }, (_, index) => (
                <a href="#job-list" key={index}>
                  <button
                    key={index}
                    onClick={() => handlePageChange(index + 1)}
                    className={`px-4 py-2 rounded-lg ${
                      currentPage === index + 1
                        ? "bg-blue-500 text-white"
                        : "bg-gray-200 text-gray-700"
                    }`}
                  >
                    {index + 1}
                  </button>
                </a>
              ))}
            </nav>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default CollectionJobs;
