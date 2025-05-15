import React from 'react';

const Detail = () => {
  const categories = [
    { icon: '💵', title: 'Kinh doanh - Bán hàng', jobs: '11.584 việc làm' },
    { icon: '📣', title: 'Marketing - PR - Quảng cáo', jobs: '8.473 việc làm' },
    { icon: '💬', title: 'Chăm sóc khách hàng', jobs: '2.710 việc làm' },
    { icon: '📎', title: 'Nhân sự - Hành chính - Pháp lý', jobs: '4.426 việc làm' },
    { icon: '🏦', title: 'Tài chính - Ngân hàng - Bảo hiểm', jobs: '961 việc làm' },
    { icon: '💻', title: 'Công nghệ Thông tin', jobs: '4.502 việc làm' },
    { icon: '🏢', title: 'Bất động sản - Xây dựng', jobs: '2.619 việc làm' },
    { icon: '📊', title: 'Kế toán - Kiểm toán - Thuế', jobs: '4.940 việc làm' },
  ];

  return (
    <div className="container mx-auto my-10">
      <h2 className="text-2xl font-bold text-green-600 text-center mb-2">Top ngành nghề nổi bật</h2>
      <p className="text-center text-gray-600 mb-6">
        Bạn muốn tìm việc mới? Xem danh sách việc làm <a href="#job-list" className="text-green-600 underline">tại đây</a>.
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {categories.map((category, index) => (
          <div
            key={index}
            className="bg-gray-100 p-4 rounded-lg shadow hover:shadow-lg transition duration-300 text-center"
          >
            <div className="text-4xl mb-4">{category.icon}</div>
            <h3 className="font-semibold text-lg">{category.title}</h3>
            <p className="text-green-600 font-medium">{category.jobs}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Detail;