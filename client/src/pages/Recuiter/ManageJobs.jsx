import React, { useState } from 'react';
import { manageJobsData } from '../../assets/assets';
import dayjs from 'dayjs';
import { useNavigate } from 'react-router-dom';

const ManageJobs = () => {
  const [openDropdownIndex, setOpenDropdownIndex] = useState(null);
  const [selectedJob, setSelectedJob] = useState(null); // state mo xem job
  const navigate = useNavigate();

  const toggleDropdown = (index) => {
    setOpenDropdownIndex(openDropdownIndex === index ? null : index);
  };

  const handleView = (job) => {
    setSelectedJob(job); // 👈 Mở modal xem chi tiết
    setOpenDropdownIndex(null); // Ẩn dropdown
  };

  const handleCloseDetail = () => {
    setSelectedJob(null); // 👈 Đóng modal
  };

  return (
    <div className="p-4 overflow-x-auto">
      <h2 className="text-2xl font-semibold mb-4">Quản lý công việc</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
          <thead className="bg-gray-100">
            <tr className="text-left text-sm text-gray-600 uppercase">
              <th className="px-6 py-3 border-b max-sm:hidden">#</th>
              <th className="px-6 py-3 border-b">Tên</th>
              <th className="px-6 py-3 border-b max-sm:hidden">Ngày đăng</th>
              <th className="px-6 py-3 border-b max-sm:hidden">Địa chỉ</th>
              <th className="px-6 py-3 border-b text-center">Số ứng viên</th>
              <th className="px-6 py-3 border-b">Trạng thái</th>
              <th className="px-6 py-3 border-b">Hành động</th>
            </tr>
          </thead>
          <tbody className="text-sm text-gray-700">
            {manageJobsData.map((job, index) => (
              <tr key={index} className="border-b hover:bg-gray-50">
                <td className="px-6 py-4 border-b max-sm:hidden">{index + 1}</td>
                <td className="px-6 py-4 font-medium">{job.title}</td>
                <td className="px-6 py-4 border-b max-sm:hidden">{dayjs(job.date).format('DD/MM/YYYY')}</td>
                <td className="px-6 py-4 border-b max-sm:hidden">{job.location}</td>
                <td className="px-6 py-4 border-b text-center">{job.applicants}</td>
                <td className="px-6 py-4">
                  <input type="checkbox" className="w-4 h-4 accent-green-600 ml-6" />
                </td>
                <td className="px-6 py-4 relative">
                  <button
                    onClick={() => toggleDropdown(index)}
                    className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300 text-sm"
                  >
                    •••
                  </button>
                  {openDropdownIndex === index && (
                    <div className="absolute right-0 mt-2 w-32 bg-white border rounded shadow z-10">
                      <button onClick={() => handleView(job)} className="block w-full px-4 py-2 text-left hover:bg-green-100 text-green-600">
                        Xem
                      </button>
                      <button className="block w-full px-4 py-2 text-left hover:bg-yellow-100 text-yellow-600">
                        Sửa
                      </button>
                      <button className="block w-full px-4 py-2 text-left hover:bg-red-100 text-red-600">
                        Xóa
                      </button>
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className='mt-4 flex justify-center'>
        <button onClick={()=>navigate('/dashboard/add-job')} className='bg-green-500 text-white py-2 px-4 rounded'>Thêm tin</button>
      </div>
      {selectedJob && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-[90%] max-w-xl relative">
            <h3 className="text-xl font-semibold mb-4">Chi tiết công việc</h3>
            <p><strong>Tên:</strong> {selectedJob.title}</p>
            <p><strong>Ngày đăng:</strong> {dayjs(selectedJob.date).format('DD/MM/YYYY')}</p>
            <p><strong>Địa chỉ:</strong> {selectedJob.location}</p>
            <p><strong>Số ứng viên:</strong> {selectedJob.applicants}</p>
            <p><strong>Mô tả:</strong> {selectedJob.description || 'Không có mô tả'}</p>

            <button
              onClick={handleCloseDetail}
              className="mt-6 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Đóng
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageJobs;
