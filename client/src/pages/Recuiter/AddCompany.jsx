import React, { useState } from 'react';

const AddCompany = () => {
  const [companyInfo, setCompanyInfo] = useState({
    managerName: '',
    gender: 'Nam',
    email: '',
    companyName: '',
    phone: '',
    address: '',
    description: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCompanyInfo({ ...companyInfo, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Gửi dữ liệu lên server hoặc xử lý thêm mới ở đây
    console.log('Dữ liệu công ty mới:', companyInfo);
    alert('Thêm hồ sơ công ty thành công!');
    // Reset form (nếu muốn)
    setCompanyInfo({
      managerName: '',
      gender: 'Nam',
      email: '',
      companyName: '',
      phone: '',
      address: '',
      description: '',
    });
  };

  return (
    <div className="max-w-xl mx-auto p-4 bg-white shadow-md rounded-md">
      <h2 className="text-2xl font-bold text-center text-green-600 mb-4">Thêm hồ sơ công ty</h2>
      <form onSubmit={handleSubmit} className="space-y-3">
        <input
          className="w-full border p-2 rounded"
          type="text"
          name="managerName"
          placeholder="Tên người quản lý"
          value={companyInfo.managerName}
          onChange={handleChange}
          required
        />
        <select
          className="w-full border p-2 rounded"
          name="gender"
          value={companyInfo.gender}
          onChange={handleChange}
        >
        
          <option value="Nam">Nam</option>
          <option value="Nữ">Nữ</option>
        </select>
        <input
          className="w-full border p-2 rounded"
          type="email"
          name="email"
          placeholder="Email"
          value={companyInfo.email}
          onChange={handleChange}
          required
        />
        <input
          className="w-full border p-2 rounded"
          type="text"
          name="companyName"
          placeholder="Tên công ty"
          value={companyInfo.companyName}
          onChange={handleChange}
          required
        />
        <input
          className="w-full border p-2 rounded"
          type="text"
          name="phone"
          placeholder="Số điện thoại"
          value={companyInfo.phone}
          onChange={handleChange}
          required
        />
        <input
          className="w-full border p-2 rounded"
          type="text"
          name="address"
          placeholder="Địa chỉ"
          value={companyInfo.address}
          onChange={handleChange}
        />
        <textarea
          className="w-full border p-2 rounded"
          name="description"
          placeholder="Mô tả về công ty"
          rows={3}
          value={companyInfo.description}
          onChange={handleChange}
        />
        <button
          type="submit"
          className="w-full bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600"
        >
          Thêm công ty
        </button>
      </form>
      <h1>4:55;35</h1>
    </div>
  );
};

export default AddCompany;
