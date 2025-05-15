import React, { useState } from "react";
import Navbar from "../components/Navbar";
import { Link } from "react-router-dom";
import { assets, jobsApplied } from "../assets/assets";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import "dayjs/locale/vi"; // Import tiếng Việt
dayjs.extend(relativeTime);
dayjs.locale("vi");
import Footer from "../components/Footer";

const Application = () => {
  const [isEdit, setIsEdit] = useState(false);
  const [resume, setResume] = useState(null);
  return (
    <>
      {/* Header */}
      <Navbar />
      {/* Thanh điều hướng */}
      <div className="container mx-auto px-4 py-4">
        <nav className="text-sm text-gray-600">
          <Link to="/" className="hover:text-blue-500">
            Trang chủ
          </Link>
          <span className="mx-2">/</span>
          <Link to="/applications" className="hover:text-blue-500">
            Tin đã ứng tuyển
          </Link>
        </nav>
      </div>
      {/* Nội dung ứng tuyển */}
      <div className="container px-4 min-h-[65vh] 2xl:px-20 mx-auto my-10">
        <h2 className="text-xl font-semibold">Thông tin của bạn</h2>
        <div className="flex gap-2 mb-6 mt-3">
          {isEdit ? (
            <>
              <label className="flex items-center" htmlFor="resumeUpload">
                <p className="bg-blue-100 text-blue px-4 py-2 rounded-lg mr-2">Chọn thông tin</p>
                <input id="resumeUpload" onChange={e => setResume(e.target.files[0])} type="file" hidden accept="application/pdf"/>
                <img src={assets.profile_upload_icon} alt="" />
              </label>
              <button onClick={e=>setIsEdit(false)} className="bg-green-100 border border-green-400 rounded-lg px-4 py-2">Lưu</button>
            </>
          ) : (
            <div className="flex gap-2">
              <a className="bg-blue-100 text-blue-600 px-4 py-2 rounded-lg" href="">Thông tin cá nhân</a>
              <button onClick={()=>setIsEdit(true)} className="text-gray-500 border border-gray-300 rounded-lg px-4 py-2">Chỉnh sửa</button>
            </div>
          )}        
          </div>
        <h2 className="text-xl font-semibold mb-4">Tin đã ứng tuyển</h2>
        <table className="w-full border-collapse border border-gray-300 text-left">
          <thead>
            <tr className="bg-gray-100">
              <th className="border border-gray-300 px-4 py-2 max-sm:hidden">Tên công ty</th>
              <th className="border border-gray-300 px-4 py-2 max-sm:hidden">Tên công việc</th>
              <th className="border border-gray-300 px-4 py-2 max-sm:hidden">Địa chỉ</th>
              <th className="border border-gray-300 px-4 py-2 max-sm:hidden">Ngày nộp</th>
              <th className="border border-gray-300 px-4 py-2">Trạng thái</th>
            </tr>
          </thead>
          <tbody>
            {jobsApplied.map((job, index) => (
              <tr key={index} className="hover:bg-gray-50">
                <td className="border border-gray-300 px-4 py-2 flex items-center gap-2">
                  <img
                    src={job.logo}
                    alt="Logo"
                    className="w-10 h-10 object-cover rounded-full"
                  />
                  {job.company}
                </td>
                <td className="border border-gray-300 px-4 py-2">{job.title}</td>
                <td className="border border-gray-300 px-4 py-2 max-sm:hidden">
                  {job.location}
                </td>
                <td className="border border-gray-300 px-4 py-2 max-sm:hidden">
                  {dayjs(job.date).format("DD/MM/YYYY")}
                </td>
                <td className="border border-gray-300 px-4 py-2 text-green-600">
                  <span className={`${job.status === 'Accepted' ? 'bg-green-100' : job.status === 'Rejected' ? 'bg-red-100' : 'bg-yellow-100'} text-green-600 px-4 py-1.5 rounded`}>
                  {job.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Footer />
    </>
  );
};

export default Application;
