import React, { useState } from "react";
import { assets, viewApplicationsPageData } from "../../assets/assets";

const ViewApplication = () => {
  const [openDropdownIndex, setOpenDropdownIndex] = useState(null);

  const toggleDropdown = (index) => {
    setOpenDropdownIndex(openDropdownIndex === index ? null : index);
  };

  return (
    <div className="p-4 md:p-6 bg-white shadow rounded-md overflow-x-auto">
      <h2 className="text-xl md:text-2xl font-semibold mb-4">Danh sách ứng viên</h2>

      <table className="min-w-full text-sm">
        <thead>
          <tr className="bg-gray-100 text-gray-600 uppercase text-xs">
            <th className="px-4 py-3 text-left">#</th>
            <th className="px-4 py-3 text-left">Tên</th>
            <th className="px-4 py-3 text-left">Công việc</th>
            <th className="px-4 py-3 text-left">Địa chỉ</th>
            <th className="px-4 py-3 text-left">CV</th>
            <th className="px-4 py-3 text-left">Ngày nộp</th>
            <th className="px-4 py-3 text-left">Hành động</th>
          </tr>
        </thead>
        <tbody>
          {viewApplicationsPageData.map((application, index) => (
            <tr key={index} className="border-b hover:bg-gray-50">
              <td className="px-4 py-3">{index + 1}</td>
              <td className="px-4 py-3">
                <div className="flex items-center gap-2">
                  <img
                    src={application.imgSrc}
                    alt="avatar"
                    className="w-9 h-9 rounded-full object-cover"
                  />
                  <span className="font-medium">{application.name}</span>
                </div>
              </td>
              <td className="px-4 py-3">{application.jobTitle}</td>
              <td className="px-4 py-3">{application.location}</td>
              <td className="px-4 py-3">
                <a
                  href={application.cvUrl || "#"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline flex items-center gap-1"
                >
                  CV
                  <img
                    src={assets.resume_download_icon}
                    alt="Download"
                    className="w-4 h-4"
                  />
                </a>
              </td>
              <td className="px-4 py-3">{application.date}</td>
              <td className="px-4 py-3 relative">
                <button
                  onClick={() => toggleDropdown(index)}
                  className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300 text-sm"
                >
                  •••
                </button>
                {openDropdownIndex === index && (
                  <div className="absolute right-0 mt-2 w-32 bg-white border rounded shadow z-10">
                    <button className="block w-full px-4 py-2 text-left hover:bg-green-100 text-green-600">
                      Chấp nhận
                    </button>
                    <button className="block w-full px-4 py-2 text-left hover:bg-red-100 text-red-600">
                      Từ chối
                    </button>
                  </div>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ViewApplication;
