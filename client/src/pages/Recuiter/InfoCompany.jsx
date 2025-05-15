import React, { useState } from 'react';

const InfoCompany = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [companyInfo, setCompanyInfo] = useState({
    managerName: 'Nguyễn Văn A',
    gender: 'Nam',
    email: 'nguyenvana@example.com',
    companyName: 'Công ty TNHH Công Nghệ Sáng Tạo',
    phone: '0123 456 789',
    address: '123 Đường ABC, Phường XYZ, Quận 1, TP. Hồ Chí Minh',
    description:
      'Chúng tôi chuyên cung cấp giải pháp phần mềm và dịch vụ công nghệ thông tin với đội ngũ chuyên gia giàu kinh nghiệm.',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCompanyInfo({ ...companyInfo, [name]: value });
  };

  const handleSave = () => {
    setIsEditing(false);
    // Có thể gọi API cập nhật dữ liệu ở đây
  };

  return (
    <div className="max-w-xl mx-auto p-4 bg-white shadow-md rounded-md space-y-4">
      <h2 className="text-2xl font-bold text-center text-blue-600">Thông tin công ty</h2>

      {isEditing ? (
        <div className="space-y-3">
          <input
            className="w-full border p-2 rounded"
            type="text"
            name="managerName"
            value={companyInfo.managerName}
            onChange={handleChange}
            placeholder="Tên người quản lý"
          />
          <select
            className="w-full border p-2 rounded"
            name="gender"
            value={companyInfo.gender}
            onChange={handleChange}
          >
            <option value="Nam">Nam</option>
            <option value="Nữ">Nữ</option>
            <option value="Khác">Khác</option>
          </select>
          <input
            className="w-full border p-2 rounded"
            type="email"
            name="email"
            value={companyInfo.email}
            onChange={handleChange}
            placeholder="Email"
          />
          <input
            className="w-full border p-2 rounded"
            type="text"
            name="companyName"
            value={companyInfo.companyName}
            onChange={handleChange}
            placeholder="Tên công ty"
          />
          <input
            className="w-full border p-2 rounded"
            type="text"
            name="phone"
            value={companyInfo.phone}
            onChange={handleChange}
            placeholder="Số điện thoại"
          />
          <input
            className="w-full border p-2 rounded"
            type="text"
            name="address"
            value={companyInfo.address}
            onChange={handleChange}
            placeholder="Địa chỉ"
          />
          <textarea
            className="w-full border p-2 rounded"
            name="description"
            value={companyInfo.description}
            onChange={handleChange}
            placeholder="Mô tả về công ty"
            rows={3}
          />
          <div className="flex justify-end space-x-2">
            <button
              className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
              onClick={() => setIsEditing(false)}
            >
              Hủy
            </button>
            <button
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              onClick={handleSave}
            >
              Lưu
            </button>
          </div>
        </div>
      ) : (
        <div className="space-y-2">
          <div><strong>Người quản lý:</strong> {companyInfo.managerName}</div>
          <div><strong>Giới tính:</strong> {companyInfo.gender}</div>
          <div><strong>Email:</strong> {companyInfo.email}</div>
          <div><strong>Tên công ty:</strong> {companyInfo.companyName}</div>
          <div><strong>Số điện thoại:</strong> {companyInfo.phone}</div>
          <div><strong>Địa chỉ:</strong> {companyInfo.address}</div>
          <div><strong>Mô tả:</strong> {companyInfo.description}</div>
          <div className="flex justify-end">
            <button
              className="px-4 py-2 bg-green-500 text-white rounded hover:bg-red-600"
              onClick={() => setIsEditing(true)}
            >
              Chỉnh sửa
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default InfoCompany;
