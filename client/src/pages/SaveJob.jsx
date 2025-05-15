import React, { useState } from 'react';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';
import { Link } from 'react-router-dom';
import { FaTrashAlt } from 'react-icons/fa';

const SaveJob = () => {
  // Fake data for saved jobs
  const [jobs, setJobs] = useState([
    {
      id: 1,
      title: 'Frontend Developer',
      company: 'Tech Solutions Inc.',
      location: 'Hanoi, Vietnam',
      posted: '2 ngày trước',
      logo: 'https://via.placeholder.com/60',
    },
    {
      id: 2,
      title: 'Backend Engineer',
      company: 'Innovatech',
      location: 'Ho Chi Minh City, Vietnam',
      posted: '5 ngày trước',
      logo: 'https://via.placeholder.com/60',
    },
    {
      id: 3,
      title: 'Fullstack Developer',
      company: 'Global Soft',
      location: 'Da Nang, Vietnam',
      posted: '1 tuần trước',
      logo: 'https://via.placeholder.com/60',
    },
  ]);

  // Handler to remove a job from saved list
  const handleRemove = (id) => {
    setJobs(prev => prev.filter(job => job.id !== id));
  };

  return (
    <>
      <Navbar />
      <div className="container mx-auto px-4 py-6">
        <nav className="text-sm text-gray-600 mb-6">
          <Link to="/" className="hover:text-blue-500">
            Trang chủ
          </Link>
          <span className="mx-2">/</span>
          <Link to="/handbook" className="hover:text-blue-500">
            Cẩm nang nghề nghiệp
          </Link>
          <span className="mx-2">/</span>
          <span className="text-gray-800 font-medium">Việc làm đã lưu</span>
        </nav>

        <h1 className="text-2xl font-semibold mb-4">Việc làm đã lưu</h1>

        {jobs.length === 0 ? (
          <p className="text-gray-600">Bạn chưa lưu việc làm nào.</p>
        ) : (
          <ul className="space-y-4">
            {jobs.map(job => (
              <li key={job.id} className="flex items-center justify-between p-4 bg-white rounded-lg shadow">
                <div className="flex items-center">
                  <img src={job.companyId?.image} className="w-12 h-12 rounded-md object-cover mr-4" />
                  <div>
                    <Link to={`/jobs/${job.id}`} className="text-lg font-medium hover:text-blue-600">
                      {job.title}
                    </Link>
                    <p className="text-gray-600 text-sm">{job.company}    •    {job.location}</p>
                    <p className="text-gray-400 text-xs">Ngày đăng: {job.posted}  {/*để dành cho backend vì show mẫu để coi Ũx{dayjs(JobData.date).locale("vi").fromNow()}*/}</p>
                  </div>
                </div>
                <button
                  onClick={() => handleRemove(job.id)}
                  className="text-red-500 hover:text-red-700"
                  title="Xóa khỏi danh sách đã lưu"
                >
                  Bỏ lưu
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
      <Footer />
    </>
  );
};

export default SaveJob;
