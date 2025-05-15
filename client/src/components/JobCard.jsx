import React from 'react';
import { assets } from '../assets/assets';
import { useNavigate } from 'react-router-dom';
import HeartIcon from './HeartIcon';

const JobCard = ({ job }) => {
  const companyName = job.companyId?.name || "Tên công ty không xác định";
  const navigate = useNavigate();

  return (
    
    <div onClick={() => { navigate(`/apply-job/${job._id}`); scrollTo(0, 0); }} navigate className="border border-gray-400 rounded-xl p-5 shadow-sm bg-white hover:shadow-lg transition-shadow duration-300 flex flex-col gap-4 max-w-sm mx-auto cursor-pointer">
      {/* Header with Logo and Job Info */}
      <div className="flex items-start gap-4">
        <img
          className="h-14 w-14 object-cover rounded-lg border border-gray-100"
          src={job.companyId?.image || assets.company_icon}
          alt="Company Logo"
        />
        <div className="flex-1">
          <h4 className="font-semibold text-lg text-gray-900 line-clamp-1">{job.title}</h4>
          <p className="text-sm text-gray-600 mt-1">{companyName}</p>
        </div>
      </div>

      {/* Job Details */}
      <div className="flex flex-wrap gap-2 text-sm">
        <span className="bg-green-50 text-green-700 px-3 py-1 rounded-full font-medium">
          {job.salary || "Thỏa thuận"} triệu
        </span>
        <span className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full font-medium">
          {job.location}
        </span>
      </div>

      {/* Action Button */}
<div className="mt-4 flex justify-between items-center gap-2">
  <button
    onClick={() => { navigate(`/apply-job/${job._id}`); scrollTo(0, 0); }}
    className="flex-1 bg-gradient-to-r from-green-500 to-green-600 text-white py-2 rounded-lg font-medium hover:from-green-600 hover:to-green-700 transition-all duration-200"
  >
    Xem chi tiết
  </button>
  <HeartIcon />
</div>

    </div>
  );
};

export default JobCard;