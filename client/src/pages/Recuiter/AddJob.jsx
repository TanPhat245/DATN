import { useEffect, useRef, useState } from "react";
import Quill from "quill";
import {
  JobCategories,
  JobExperiences,
  JobLevels,
  JobTypes,
} from "../../assets/assets";
import axios from "axios";

const AddJob = () => {
  const [title, setTitle] = useState("");
  const [salary, setSalary] = useState({ min: "", max: "" });
  const [category, setCategory] = useState("");
  const [level, setLevel] = useState("Intern");
  const [type, setType] = useState("On-site");
  const [experiences, setExperiences] = useState("Chưa có");
  const [time, setTime] = useState("Full-time");
  const editorRef = useRef(null);
  const quillRef = useRef(null);

  const [provinces, setProvinces] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [selectedProvinceCode, setSelectedProvinceCode] = useState("");
  const [selectedDistrict, setSelectedDistrict] = useState("");

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

  // Khởi tạo Quill
  useEffect(() => {
    if (!quillRef.current && editorRef.current) {
      quillRef.current = new Quill(editorRef.current, {
        theme: "snow",
      });
    }
  }, []);

  return (
    <form className="max-w-4xl mx-auto p-6 bg-white rounded-xl shadow-md space-y-6">
      {/* Tên công việc */}
      <div className="flex flex-col">
        <label className="mb-1 font-semibold">Tên công việc</label>
        <input
          type="text"
          className="border border-gray-300 p-2 rounded"
          placeholder="Nhập tên..."
          onChange={(e) => setTitle(e.target.value)}
          value={title}
          required
        />
      </div>

      {/* Mô tả */}
      <div className="flex flex-col">
        <label className="mb-1 font-semibold">Mô tả</label>
        <div
          ref={editorRef}
          className="bg-white border border-gray-300 rounded min-h-[200px] px-2 py-1"
        />
      </div>

      {/* Grid 2 cột */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Ngành nghề */}
        <div className="flex flex-col">
          <label className="mb-1 font-semibold">Ngành nghề</label>
          <select
            onChange={(e) => setCategory(e.target.value)}
            className="border p-2 rounded"
          >
            {JobCategories.map((cat, index) => (
              <option value={cat} key={index}>
                {cat}
              </option>
            ))}
          </select>
        </div>

        {/* Tỉnh */}
        <div className="flex flex-col">
          <label className="mb-1 font-semibold">Địa chỉ: Tỉnh</label>
          <select
            onChange={(e) => setSelectedProvinceCode(e.target.value)}
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
          <label className="mb-1 font-semibold">Địa chỉ: Huyện</label>
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

        {/* Loại hình */}
        <div className="flex flex-col">
          <label className="mb-1 font-semibold">Loại hình</label>
          <select
            onChange={(e) => setTime(e.target.value)}
            className="border p-2 rounded"
          >
            <option value="Full-time">Full-time</option>
            <option value="Part-time">Part-time</option>
          </select>
        </div>

        {/* Kinh nghiệm */}
        <div className="flex flex-col">
          <label className="mb-1 font-semibold">Kinh nghiệm</label>
          <select
            onChange={(e) => setExperiences(e.target.value)}
            className="border p-2 rounded"
          >
            {JobExperiences.map((exp, index) => (
              <option value={exp} key={index}>
                {exp}
              </option>
            ))}
          </select>
        </div>

        {/* Hình thức làm việc */}
        <div className="flex flex-col">
          <label className="mb-1 font-semibold">Hình thức</label>
          <select
            onChange={(e) => setType(e.target.value)}
            className="border p-2 rounded"
          >
            {JobTypes.map((t, index) => (
              <option value={t} key={index}>
                {t}
              </option>
            ))}
          </select>
        </div>

        {/* Chức vụ */}
        <div className="flex flex-col">
          <label className="mb-1 font-semibold">Chức vụ</label>
          <select
            onChange={(e) => setLevel(e.target.value)}
            className="border p-2 rounded"
          >
            {JobLevels.map((lvl, index) => (
              <option value={lvl} key={index}>
                {lvl}
              </option>
            ))}
          </select>
        </div>

        {/* Lương */}
        <div className="flex flex-col md:col-span-2">
          <label className="mb-1 font-semibold">Lương</label>
          <div className="flex flex-wrap items-center gap-4 mb-2">
            <input
              type="number"
              placeholder="Tối thiểu (triệu)"
              className="border p-2 rounded w-40"
              disabled={salary === "negotiable"}
              onChange={(e) =>
                setSalary((prev) => ({
                  ...prev,
                  min: e.target.value,
                }))
              }
              value={salary !== "negotiable" ? salary.min || "" : ""}
            />
            <span>-</span>
            <input
              type="number"
              placeholder="Tối đa (triệu)"
              className="border p-2 rounded w-40"
              disabled={salary === "negotiable"}
              onChange={(e) =>
                setSalary((prev) => ({
                  ...prev,
                  max: e.target.value,
                }))
              }
              value={salary !== "negotiable" ? salary.max || "" : ""}
            />
            <label className="flex items-center gap-2 ml-4">
              <input
                type="checkbox"
                checked={salary === "negotiable"}
                onChange={(e) => {
                  if (e.target.checked) {
                    setSalary("negotiable");
                  } else {
                    setSalary({ min: "", max: "" });
                  }
                }}
              />
              Thỏa thuận
            </label>
          </div>
        </div>
      </div>

      {/* Nút submit */}
      <div className="text-right">
        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-semibold"
        >
          Đăng tin
        </button>
      </div>
    </form>
  );
};

export default AddJob;
