import React, { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom"; //import react-router-dom
import { WebContext } from "../context/WebContext"; //import context
import Loading from "../components/Loading"; //import loading
import Navbar from "../components/Navbar"; //import thanh điều hướng
import { assets } from "../assets/assets"; //import các icon
import kconvert from "k-convert"; //convert số tiền từ triệu sang tỷ
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import "dayjs/locale/vi"; // Import tiếng Việt
dayjs.extend(relativeTime);
dayjs.locale("vi");
import JobCard from "../components/JobCard"; //import card việc làm
import Footer from "../components/Footer";

const ApplyJob = () => {
  const { id } = useParams();
  const [JobData, setJobData] = useState(null);
  const { job } = useContext(WebContext);
  const fetchJob = async () => {
    const data = job.filter((job) => job._id === id);
    if (data.length > 0) {
      setJobData(data[0]);
      console.log(data[0]);
    }
  };
  useEffect(() => {
    if (job.length > 0) {
      fetchJob();
    }
  }, [id, job]);

  return JobData ? (
    <>
      <Navbar />
      <div className="container mx-auto px-4 py-10 min-h-screen flex flex-col 2xl:px-20">
        {/* Thanh điều hướng */}
        <nav className="text-sm text-gray-600 mb-9">
          <Link to="/" className="hover:text-blue-500">
            Trang chủ
          </Link>
          <span className="mx-2">/</span>
          <Link to="/collection-jobs" className="hover:text-blue-500">
            Tin tuyển dụng
          </Link>
          <span className="mx-2">/</span>
          <span className="text-gray-800 font-medium">
            {JobData?.title || "Chi tiết công việc"}
          </span>
        </nav>

        {/* Nội dung công việc */}
        <div className="bg-white text-black rounded-lg w-full">
          <div className="flex justify-center md:justify-between flex-wrap gap-8 px-14 py-20 mb-6 bg-sky-50 border border-sky-400 rounded-xl">
            <div className="flex flex-col md:flex-row items-center">
              <img
                className="h-24 bg-white rounded-lg p-4 mr-4 max-md:mb-4 border"
                src={JobData.companyId.image}
                alt="logo"
              />
              <div className="text-center md:text-left text-neutral-700">
                <h1 className="text-2xl sm:text-4xl font-medium">
                  {JobData.title}
                </h1>
                <div className="flex flex-row flex-wrap max-md:justify-center gap-y-2 gap-6 items-center text-gray-600 mt-2">
                  <span className="flex flex-items-center gap-1">
                    <img src={assets.suitcase_icon} alt="name" />
                    {JobData.companyId.name}
                  </span>
                  <span className="flex flex-items-center gap-1">
                    <img src={assets.location_icon} alt="address" />
                    {JobData.location}
                  </span>
                  <span className="flex flex-items-center gap-1">
                    <img src={assets.person_icon} alt="salary" />
                    {JobData.level}
                  </span>
                  <span className="flex flex-items-center gap-1">
                    <img src={assets.money_icon} alt="salary" />
                    Lương: {kconvert.convertTo(JobData.salary)} triệu
                  </span>
                </div>
              </div>
            </div>
            <div className="flex flex-col justify-center text-end text-sm max-md:mx-auto max-md:text-center">
              <button className="bg-green-500 p-2.5 px-10 text-white rounded">
                Ứng tuyển
              </button>
              <p className="mt-1 text-gray-600">
                Ngày đăng: {dayjs(JobData.date).locale("vi").fromNow()}
              </p>
            </div>
          </div>
          {/* Mô tả công việc */}
          <div className="flex flex-col lg:flex-row justify-between items-start">
            <div className="w-full lg:w-2/3 px-14 py-10 bg-white rounded-lg border border-gray-300">
              <h2 className="font-bold text-2xl mb-4">Mô tả công việc</h2>
              <div
                className="rich-text"
                dangerouslySetInnerHTML={{ __html: JobData.description }}
              ></div>
              <button className="bg-green-500 mt-10 p-2.5 px-10 text-white rounded">
                Ứng tuyển
              </button>
            </div>
            {/* Section right*/}
            <div className="w-full lg:w-1/3 mt-8 lg:mt-0 lg:ml-8 space-y-5">
              <h2 className="text-xl font-bold text-gray-800 border-b pb-2">
                Thêm việc làm từ {JobData.companyId.name}
              </h2>{" "}
              {job
                .filter(
                  (job) =>
                    job._id !== JobData._id &&
                    job.companyId._id === JobData.companyId._id
                )
                .filter((job) => true)
                .slice(0, 4)
                .map((job, index) => (
                  <JobCard key={index} job={job} />
                ))}
            </div>
          </div>
        </div>
        <h1>da lam toi day, tiep theo qua apply + post</h1>
      </div>
      <Footer />
    </>
  ) : (
    <Loading />
  );
};

export default ApplyJob;
