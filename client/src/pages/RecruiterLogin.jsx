import { assets } from "../assets/assets";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import ToggleQuyDinh from "../components/ToggleQuyDinh";

const RecruiterLogin = () => {
  const [state, setState] = useState("Login"); // "Login" hoặc "Register"
  const [provinces, setProvinces] = useState([]); // Danh sách tỉnh/thành phố
  const [districts, setDistricts] = useState([]); // Danh sách quận/huyện
  const [selectedProvince, setSelectedProvince] = useState(""); // Tỉnh/thành phố được chọn
  const [selectedDistrict, setSelectedDistrict] = useState(""); // Quận/huyện được chọn

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [rePassword, setRePassword] = useState("");
  const [agreeTerms, setAgreeTerms] = useState(false);
  const navigate = useNavigate();
  // Lấy danh sách tỉnh/thành phố từ API
  useEffect(() => {
    axios
      .get("https://provinces.open-api.vn/api/p/")
      .then((response) => setProvinces(response.data))
      .catch((error) => console.error("Error fetching provinces:", error));
  }, []);

  // Lấy danh sách quận/huyện khi tỉnh/thành phố thay đổi
  useEffect(() => {
    if (selectedProvince) {
      axios
        .get(`https://provinces.open-api.vn/api/p/${selectedProvince}?depth=2`)
        .then((response) => setDistricts(response.data.districts))
        .catch((error) => console.error("Error fetching districts:", error));
      setSelectedDistrict(""); // Reset quận/huyện khi tỉnh/thành phố thay đổi
    } else {
      setDistricts([]);
    }
  }, [selectedProvince]);

  const handleRegister = (e) => {

  }
  const handleLogin = (e) => {

  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white shadow-md rounded-lg p-8 w-full max-w-lg">
        {/* Logo */}
        <div className="text-center mb-6">
          <img
            src={assets.logonew}
            onClick={() => navigate("/")}
            alt="Logo"
            className="mx-auto mb-4 cursor-pointer"
          />
          <h1 className="text-2xl font-bold text-green-700">
            {state === "Login"
              ? "Chào mừng bạn đã quay trở lại"
              : "Đăng ký tài khoản Nhà tuyển dụng"}
          </h1>
          <p className="text-gray-600">
            {state === "Login"
              ? "Cùng tạo dựng lợi thế cho doanh nghiệp bằng trải nghiệm công nghệ tuyển dụng ứng dụng sâu AI & Hiring Funnel"
              : "Cùng tạo dựng lợi thế cho doanh nghiệp bằng trải nghiệm công nghệ tuyển dụng ứng dụng sâu AI & Hiring Funnel."}
          </p>
        </div>

        {/* Đăng nhập */}
        {state === "Login" && (
          <>
            <button className="w-full bg-blue-500 text-white py-2 rounded-lg mb-4 hover:bg-blue-600 transition">
              Đăng nhập bằng Google
            </button>
            <div className="text-center text-gray-500 mb-4">Hoặc đăng nhập bằng email</div>
            <form onSubmit={handleLogin}>
              <div className="mb-4">
                <label className="block text-gray-700 mb-2">Email</label>
                <input onChange={(e) => setEmail(e.target.value)}
                  value={email}
                  type="email"
                  placeholder="Email"
                  className="w-full border border-gray-300 rounded-lg px-4 py-2"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 mb-2">Mật khẩu</label>
                <input onChange={(e) => setPassword(e.target.value)}
                  value={password}
                  type="password"
                  placeholder="Mật khẩu"
                  className="w-full border border-gray-300 rounded-lg px-4 py-2"
                />
              </div>
              <div className="flex justify-between items-center mb-4">
                <a href="#" className="text-blue-500 hover:underline">
                  Quên mật khẩu
                </a>
              </div>
              <button type="submit" className="w-full bg-green-500 text-white py-2 rounded-lg hover:bg-green-600 transition">
                Đăng nhập
              </button>
            </form>
            <div className="text-center mt-4">
              Chưa có tài khoản?{" "}
              <span
                onClick={() => setState("Register")}
                className="text-blue-500 cursor-pointer hover:underline"
              >
                Đăng ký ngay
              </span>
            </div>
          </>
        )}

        {/* Đăng ký */}
        {state === "Register" && (
          <>
            <div className="bg-gray-100 p-4 rounded-lg mb-6">
              <ToggleQuyDinh/>
            </div>
            <form onSubmit={handleRegister}>
              <div className="mb-4">
                <label className="block text-gray-700 mb-2">Email</label>
                <input
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
                  type="email"
                  placeholder="Email"
                  className="w-full border border-gray-300 rounded-lg px-4 py-2"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 mb-2">Mật khẩu</label>
                <input
                  onChange={(e) => setPassword(e.target.value)}
                  value={password}
                  type="password"
                  placeholder="Mật khẩu"
                  className="w-full border border-gray-300 rounded-lg px-4 py-2"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 mb-2">Nhập lại mật khẩu</label>
                <input
                  onChange={(e) => setRePassword(e.target.value)}
                  value={rePassword}
                  type="password"
                  placeholder="Nhập lại mật khẩu"
                  className="w-full border border-gray-300 rounded-lg px-4 py-2"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 mb-2">Họ và tên</label>
                <input
                  onChange={(e) => setFullName(e.target.value)}
                  value={fullName}
                  type="text"
                  placeholder="Họ và tên"
                  className="w-full border border-gray-300 rounded-lg px-4 py-2"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 mb-2">Công ty</label>
                <input
                  onChange={(e) => setCompanyName(e.target.value)}
                  value={companyName}
                  type="text"
                  placeholder="Tên công ty"
                  className="w-full border border-gray-300 rounded-lg px-4 py-2"
                />
              </div>
              {/* Dropdown chọn tỉnh/thành phố */}
              <div className="mb-4">
                <label className="block text-gray-700 mb-2">Địa điểm làm việc</label>
                <select
                  value={selectedProvince}
                  onChange={(e) => setSelectedProvince(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2"
                >
                  <option value="">Chọn tỉnh/thành phố</option>
                  {provinces.map((province) => (
                    <option key={province.code} value={province.code}>
                      {province.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Dropdown chọn quận/huyện */}
              <div className="mb-4">
                <label className="block text-gray-700 mb-2">Quận/huyện</label>
                <select
                  value={selectedDistrict}
                  onChange={(e) => setSelectedDistrict(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2"
                  disabled={!selectedProvince}
                >
                  <option value="">Chọn quận/huyện</option>
                  {districts.map((district) => (
                    <option key={district.code} value={district.code}>
                      {district.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex items-center mb-4">
                <input type="checkbox" id="terms" className="mr-2" required  onChange={(e) => setAgreeTerms(e.target.checked)}/>
                <label htmlFor="terms" className="text-sm text-gray-600">
                  Tôi đã đọc và đồng ý với{" "}
                  <a href="#" className="text-blue-500 hover:underline">
                    Điều khoản dịch vụ
                  </a>{" "}
                  và{" "}
                  <a href="#" className="text-blue-500 hover:underline">
                    Chính sách bảo mật
                  </a>
                  .
                </label>
              </div>
              <button type="submit" className="w-full bg-green-500 text-white py-2 rounded-lg hover:bg-green-600 transition">
                Hoàn tất
              </button>
            </form>

            <div className="text-center mt-4">
              Đã có tài khoản?{" "}
              <span
                onClick={() => setState("Login")}
                className="text-blue-500 cursor-pointer hover:underline"
              >
                Đăng nhập ngay
              </span>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default RecruiterLogin;