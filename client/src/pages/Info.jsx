import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Link } from "react-router-dom";
import { assets } from "../assets/assets";

const Info = () => {
  const [showChangePassword, setShowChangePassword] = useState(false);
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");


  const account = {
    username: "tanphat",
    email: "phatt@gmail.com",
    password: "********", // ẩn đi
  };

  const handleSaveProfile = (e) => {
    e.preventDefault();

    // Gọi API cập nhật hồ sơ ở đây nếu có
    // await axios.post('/api/profile/update', editedProfile);

    setMessage("Cập nhật hồ sơ thành công!");
    setIsEditingProfile(false);
  };

  const profile = {
    fullName: "Huỳnh Tấn Phát",
    phone: "0375567352",
    email: "phatt4071@gmail.com",
    cvUrl: "https://example.com/uploads/cv-tranthib.jpg",
  };
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [editedProfile, setEditedProfile] = useState({ ...profile });
  
  const handleChangePassword = (e) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      setMessage("Mật khẩu xác nhận không khớp.");
      return;
    }

    // Gọi API thay đổi mật khẩu ở đây
    // Example:
    // await axios.post('/api/account/change-password', { oldPassword, newPassword });

    setMessage("Đổi mật khẩu thành công!");
    setOldPassword("");
    setNewPassword("");
    setConfirmPassword("");
    setShowChangePassword(false);
  };

  return (
    <>
      <Navbar />
      <div className="max-w-4xl mx-auto p-6">
        <nav className="text-sm text-gray-600 mb-6">
          <Link to="/" className="hover:text-blue-500">
            Trang chủ
          </Link>
          <span className="mx-2">/</span>
          <Link to="/info" className="hover:text-blue-500 font-semibold">
            Thông tin tài khoản
          </Link>
        </nav>

        {/* THÔNG TIN TÀI KHOẢN */}
        <div className="bg-white shadow-md rounded-md p-6 mb-8">
          <h2 className="text-xl font-bold text-blue-600 mb-4">
            Thông tin tài khoản
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-700">
            <div>
              <strong>Tên tài khoản:</strong> {account.username}
            </div>
            <div>
              <strong>Email:</strong> {account.email}
            </div>
            <div>
              <strong>Mật khẩu:</strong> {account.password}
            </div>
          </div>

          <div className="mt-4 text-right">
            <button
              onClick={() => setShowChangePassword(!showChangePassword)}
              className="bg-yellow-500 text-white py-2 px-4 rounded hover:bg-yellow-600 transition"
            >
              {showChangePassword ? "Hủy" : "Thay đổi mật khẩu"}
            </button>
          </div>

          {showChangePassword && (
            <form onSubmit={handleChangePassword} className="mt-4 space-y-4">
              <div>
                <label className="block text-sm font-medium">Mật khẩu cũ</label>
                <input
                  type="password"
                  value={oldPassword}
                  onChange={(e) => setOldPassword(e.target.value)}
                  className="mt-1 w-full border px-3 py-2 rounded"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium">
                  Mật khẩu mới
                </label>
                <input
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="mt-1 w-full border px-3 py-2 rounded"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium">
                  Xác nhận mật khẩu mới
                </label>
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="mt-1 w-full border px-3 py-2 rounded"
                  required
                />
              </div>

              {message && <div className="text-sm text-red-600">{message}</div>}

              <button
                type="submit"
                className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
              >
                Xác nhận đổi mật khẩu
              </button>
            </form>
          )}
        </div>

        {/* HỒ SƠ NGƯỜI TÌM VIỆC */}
        <div className="bg-white shadow-md rounded-md p-6">
          <h2 className="text-xl font-bold text-blue-600 mb-4">
            Hồ sơ người tìm việc
          </h2>

          {isEditingProfile ? (
            <form
              onSubmit={handleSaveProfile}
              className="space-y-4 text-gray-700"
            >
              <div>
                <label className="block text-sm font-medium">Họ tên</label>
                <input
                  type="text"
                  value={editedProfile.fullName}
                  onChange={(e) =>
                    setEditedProfile({
                      ...editedProfile,
                      fullName: e.target.value,
                    })
                  }
                  className="mt-1 w-full border px-3 py-2 rounded"
                />
              </div>
              <div>
                <label className="block text-sm font-medium">
                  Số điện thoại
                </label>
                <input
                  type="text"
                  value={editedProfile.phone}
                  onChange={(e) =>
                    setEditedProfile({
                      ...editedProfile,
                      phone: e.target.value,
                    })
                  }
                  className="mt-1 w-full border px-3 py-2 rounded"
                />
              </div>
              <div>
                <label className="block text-sm font-medium">Email</label>
                <input
                  type="email"
                  value={editedProfile.email}
                  onChange={(e) =>
                    setEditedProfile({
                      ...editedProfile,
                      email: e.target.value,
                    })
                  }
                  className="mt-1 w-full border px-3 py-2 rounded"
                />
              </div>
              <div className="text-right space-x-2">
                <button
                  type="button"
                  onClick={() => setIsEditingProfile(false)}
                  className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500"
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
                >
                  Lưu thay đổi
                </button>
              </div>
            </form>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-700">
              <div>
                <strong>Họ tên:</strong> {profile.fullName}
              </div>
              <div>
                <strong>Số điện thoại:</strong> {profile.phone}
              </div>
              <div>
                <strong>Email:</strong> {account.email}
              </div>
              <div>
                <strong>CV:</strong>
                <br />
                {profile.cvUrl ? (
                  <img
                    src={assets.cv}
                    alt="CV"
                    className="mt-2 max-w-xs rounded border"
                  />
                ) : (
                  <span>Chưa tải lên</span>
                )}
              </div>

              <div className="mt-4 text-right col-span-2">
                <button
                  onClick={() => setIsEditingProfile(true)}
                  className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition"
                >
                  Chỉnh sửa hồ sơ
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      <Footer />
    </>
  );
};

export default Info;
