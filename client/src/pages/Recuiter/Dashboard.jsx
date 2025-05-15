import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { assets } from "../../assets/assets";
import { useState } from "react";
import Footer from "../../components/Footer";
import { IoChevronDown, IoChevronUp } from "react-icons/io5";
import { FaRegUser } from "react-icons/fa";

const Dashboard = () => {
  const navigate = useNavigate();
  const [isAccountOpen, setIsAccountOpen] = useState(false);
  const [isJobOpen, setIsJobOpen] = useState(false);
  const [isCompanyOpen, setIsCompanyOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // Mobile sidebar toggle
  const [isapplicationOpen, setIsApplicationOpen] = useState(false);

  return (
    <div className="min-h-screen">
      {/* Navbar nhà tuyển dụng */}
      <div className="shadow py-4 border bg-white z-40 relative">
        <div className="px-5 flex justify-between items-center">
          <div className="flex items-center gap-3">
            {/* Nút mở sidebar trên mobile */}
            <button
              className="sm:hidden block text-2xl"
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            >
              ☰
            </button>
            <img
              onClick={() => navigate("/")}
              className="h-10 max-sm:w-32 cursor-pointer"
              src={assets.logonew}
              alt="logo"
            />
          </div>
          <div className="flex items-center gap-3">
            <p className="max-sm:hidden">Xin chào, Tấn Phát</p>
            <div className="relative group">
              <img
                className="w-8 border rounded-full"
                src={assets.company_icon}
                alt="avatar"
              />
              <div className="absolute hidden group-hover:block top-0 right-0 z-10 text-black rounded pt-12">
                <ul className="list-none m-0 p-2 bg-white rounded-md border text-sm">
                  <li className="py-1 px-3 cursor-pointer whitespace-nowrap hover:text-red-500 rounded">
                    Đăng xuất
                  </li>
                  <li className="py-1 px-3 cursor-pointer whitespace-nowrap hover:text-red-500 rounded">
                    Thông tin
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Nội dung chính */}
      <div className="flex items-start relative">
        {/* Sidebar left */}
        <aside
          className={`fixed sm:static top-0 left-0 h-full bg-white shadow-lg border-r w-64 z-50 transform transition-transform duration-300 ${
            isSidebarOpen ? "translate-x-0" : "-translate-x-full"
          } sm:translate-x-0`}
        >
          <div className="p-5">
            <h2 className="text-xl font-semibold mb-6 text-gray-800">
              Bảng điều khiển
            </h2>
            <ul className="space-y-3">
              {/* Tài khoản */}
              <li>
                <div
                  onClick={() => setIsAccountOpen(!isAccountOpen)}
                  className="flex items-center border-2 justify-between p-3 rounded-lg hover:bg-green-300 hover:border-green-500 cursor-pointer transition"
                >
                  <span className="flex items-center text-gray-700">
                    <img
                      src={assets.person_tick_icon}
                      alt="Account"
                      className="w-5 h-5 mr-2"
                    />
                    Tài khoản
                  </span>
                  <span>
                    {isAccountOpen ? <IoChevronDown /> : <IoChevronUp />}
                  </span>
                </div>
                {isAccountOpen && (
                  <ul className="border ml-6 mt-2 space-y-1 transition-all duration-300">
                    <li>
                      <NavLink
                        to="/dashboard/info-account"
                        className="block p-2 rounded hover:bg-gray-100 text-sm text-gray-600"
                      >
                        Xem thông tin
                      </NavLink>
                    </li>
                  </ul>
                )}
              </li>

              {/* Tin tuyển dụng */}
              <li>
                <div
                  onClick={() => setIsJobOpen(!isJobOpen)}
                  className="flex items-center border-2 justify-between p-3 rounded-lg hover:bg-green-300 hover:border-green-500 cursor-pointer transition"
                >
                  <span className="flex items-center text-gray-700">
                    <img
                      src={assets.home_icon}
                      alt="Jobs"
                      className="w-5 h-5 mr-2"
                    />
                    Tin tuyển dụng
                  </span>
                  <span>{isJobOpen ? <IoChevronDown /> : <IoChevronUp />}</span>
                </div>
                {isJobOpen && (
                  <ul className="border ml-6 mt-2 space-y-1 transition-all duration-300">
                    <li>
                      <NavLink
                        to="/dashboard/add-job"
                        className="block p-2 rounded hover:bg-gray-100 text-sm text-gray-600"
                      >
                        Đăng tin mới
                      </NavLink>
                    </li>
                    <li>
                      <NavLink
                        to="/dashboard/manage-jobs"
                        className="block p-2 rounded hover:bg-gray-100 text-sm text-gray-600"
                      >
                        Quản lý tin đăng
                      </NavLink>
                    </li>
                  </ul>
                )}
              </li>

              {/* Công ty */}
              <li>
                <div
                  onClick={() => setIsCompanyOpen(!isCompanyOpen)}
                  className="border-2 flex items-center justify-between p-3 rounded-lg hover:bg-green-300 hover:border-green-500 cursor-pointer transition"
                >
                  <span className="flex items-center text-gray-700">
                    <img
                      src={assets.company_icon}
                      alt="Company"
                      className="w-5 h-5 mr-2"
                    />
                    Công ty
                  </span>
                  <span>
                    {isCompanyOpen ? <IoChevronDown /> : <IoChevronUp />}
                  </span>
                </div>
                {isCompanyOpen && (
                  <ul className="border ml-6 mt-2 space-y-1 transition-all duration-300">
                    <li>
                      <NavLink
                        to="/dashboard/info-company"
                        className="block p-2 rounded hover:bg-gray-100 text-sm text-gray-600"
                      >
                        Hồ sơ công ty
                      </NavLink>
                    </li>
                      <li>
                      <NavLink
                        to="/dashboard/add-info-company"
                        className="block p-2 rounded hover:bg-gray-100 text-sm text-gray-600"
                      >
                        Thêm hồ sơ công ty
                      </NavLink>
                    </li>
                  </ul>
                )}
              </li>
              {/* Quản lý ứng viên */}
              <li>
                <div
                  onClick={() => setIsApplicationOpen(!isapplicationOpen)}
                  className="border-2 flex items-center justify-between p-3 rounded-lg hover:bg-green-300 hover:border-green-500 cursor-pointer transition"
                >
                  <span className="flex items-center text-gray-700">
                    <FaRegUser className="w-5 h-5 mr-2"/>
                    Quản lý ứng viên
                  </span>
                  <span>
                    {isapplicationOpen ? <IoChevronDown /> : <IoChevronUp />}
                  </span>
                </div>
                {isapplicationOpen && (
                  <ul className="border ml-6 mt-2 space-y-1 transition-all duration-300">
                    <li>
                      <NavLink
                        to="/dashboard/view-applications"
                        className="block p-2 rounded hover:bg-gray-100 text-sm text-gray-600"
                      >
                        Danh sách ứng viên
                      </NavLink>
                    </li>
                  </ul>
                )}
              </li>
            </ul>
          </div>
        </aside>

        {/* Overlay che khi sidebar mở (mobile) */}
        {isSidebarOpen && (
          <div
            className="fixed inset-0 bg-black bg-opacity-30 z-40 sm:hidden"
            onClick={() => setIsSidebarOpen(false)}
          ></div>
        )}

        {/* Main content */}
        <main className="flex-1 p-6 bg-gray-50 min-h-screen sm:ml-0">
          <Outlet />
        </main>
      </div>

      <Footer />
    </div>
  );
};

export default Dashboard;
