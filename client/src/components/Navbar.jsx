import React, { useState } from "react";
import { assets } from "../assets/assets";
import { useClerk, UserButton, useUser } from "@clerk/clerk-react";
import { Link, useNavigate } from "react-router-dom";
import { HiMenu, HiX } from "react-icons/hi";

// ToolsDropdown Component
const ToolsDropdown = ({ isMobile, onLinkClick }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div
      className={isMobile ? "flex flex-col" : "relative"}
      onMouseEnter={() => !isMobile && setIsOpen(true)}
      onMouseLeave={() => !isMobile && setIsOpen(false)}
    >
      <h1
        className="text-gray-700 font-medium cursor-pointer hover:text-blue-500 transition"
        onClick={() => isMobile && setIsOpen(!isOpen)}
      >
        Công cụ
      </h1>
      {isOpen && (
        <div
          className={
            isMobile
              ? "ml-4 flex gap-2"
              : "absolute top-full left-0 bg-white shadow-md rounded-md py-2 min-w-[220px] whitespace-nowrap z-50"
          }
        >
          <div
            onClick={() => onLinkClick("/info")}
            className="block px-4 py-2 hover:bg-green-300 cursor-pointer"
          >
            Hồ sơ
          </div>
          <div
            onClick={() => onLinkClick("/saved-jobs")}
            className="block px-4 py-2 hover:bg-green-300 cursor-pointer"
          >
            Việc làm đã lưu
          </div>
        </div>
      )}
    </div>
  );
};

// NavLinks Component
const NavLinks = ({ isMobile, setIsMenuOpen }) => {
  const navigate = useNavigate();

  const handleLinkClick = (path) => {
    navigate(path);
    if (isMobile) setIsMenuOpen(false);
  };

  return (
    <div className={isMobile ? "flex flex-col gap-4" : "flex gap-6"}>
      <h1
        onClick={() => handleLinkClick("/collection-jobs")}
        className="text-gray-700 font-medium cursor-pointer hover:text-blue-500 transition"
      >
        Cơ hội việc làm
      </h1>
      <h1
        onClick={() => handleLinkClick("/handbook")}
        className="text-gray-700 font-medium cursor-pointer hover:text-blue-500 transition"
      >
        Cẩm nang nghề nghiệp
      </h1>
      <ToolsDropdown isMobile={isMobile} onLinkClick={handleLinkClick} />
    </div>
  );
};

// Navbar Component
const Navbar = () => {
  const { openSignIn } = useClerk();
  const { user } = useUser();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <div className="shadow py-4 sticky top-0 bg-white z-50">
      <div className="container px-4 2xl:px-20 mx-auto flex justify-between items-center">
        {/* Logo */}
        <img
          onClick={() => navigate("/")}
          className="cursor-pointer h-8 sm:h-10"
          src={assets.logonew}
          alt="logo"
        />
        {/* Desktop Navigation Links */}
        <div className="hidden sm:flex">
          <NavLinks isMobile={false} setIsMenuOpen={setIsMenuOpen} />
        </div>
        {/* Hamburger Menu Icon */}
        <button
          className="sm:hidden text-2xl"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <HiX /> : <HiMenu />}
        </button>
        {/* Desktop User Section */}
        <div className="hidden sm:flex items-center gap-4">
          {user ? (
            <div className="relative flex items-center gap-3">
              <Link to="/recruiterLogin" className="text-gray-600 text-sm">
                Bạn là nhà tuyển dụng?{" "}
                <span className="text-blue-600 font-semibold">
                  Đăng tuyển ngay »
                </span>
              </Link>
              <p>|</p>
              <p>CHÀO, {user.firstName + " " + user.lastName}</p>
              <UserButton />
            </div>
          ) : (
            <div className="flex gap-4 text-sm">
              <button
                onClick={() => navigate("/recruiterLogin")}
                className="text-gray-600"
              >
                Nhà tuyển dụng
              </button>
              <button
                onClick={openSignIn}
                className="bg-blue-500 text-white px-4 py-2 rounded-full"
              >
                Đăng nhập
              </button>
            </div>
          )}
        </div>
        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="fixed inset-0 bg-white z-50 sm:hidden">
            <div className="flex flex-col gap-4 p-4">
              <button
                className="text-2xl"
                onClick={() => setIsMenuOpen(false)}
                aria-label="Close menu"
              >
                <HiX />
              </button>
              <NavLinks isMobile={true} setIsMenuOpen={setIsMenuOpen} />
              {/* Mobile User Section */}
              {user ? (
                <div className="flex flex-col gap-4">
                  <p>CHÀO, {user.firstName + " " + user.lastName}</p>
                  <UserButton />
                </div>
              ) : (
                <div className="flex flex-col gap-4">
                  <button
                    onClick={() => navigate("/recruiterLogin")}
                    className="text-gray-600"
                  >
                    Nhà tuyển dụng
                  </button>
                  <button
                    onClick={openSignIn}
                    className="bg-blue-500 text-white px-4 py-2 rounded-full"
                  >
                    Đăng nhập
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
