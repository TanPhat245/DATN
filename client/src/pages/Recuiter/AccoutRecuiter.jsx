import React, { useState } from 'react';

const AccoutRecuiter = () => {
  const [email] = useState('recruiter@example.com');
  const [password] = useState('********'); // hiển thị che
  const [showChangePassword, setShowChangePassword] = useState(false);
  const [form, setForm] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (form.newPassword !== form.confirmPassword) {
      alert('Mật khẩu xác nhận không khớp.');
      return;
    }

    // Gửi form.currentPassword & form.newPassword tới API đổi mật khẩu ở đây
    console.log('Đổi mật khẩu:', form);

    alert('Đổi mật khẩu thành công!');
    setForm({
      currentPassword: '',
      newPassword: '',
      confirmPassword: ''
    });
    setShowChangePassword(false);
  };

  return (
    <div className="max-w-md mx-auto p-4 bg-white shadow-md rounded space-y-4">
      <h2 className="text-2xl font-bold text-center text-blue-600">Thông tin tài khoản nhà tuyển dụng</h2>
      <div><strong>Email:</strong> {email}</div>
      <div><strong>Mật khẩu:</strong> {password}</div>

      <div className="text-right">
        <button
          className="text-sm text-blue-500 hover:underline"
          onClick={() => setShowChangePassword(!showChangePassword)}
        >
          {showChangePassword ? 'Hủy' : 'Thay đổi mật khẩu'}
        </button>
      </div>

      {showChangePassword && (
        <form onSubmit={handleSubmit} className="space-y-3">
          <input
            type="password"
            name="currentPassword"
            placeholder="Mật khẩu hiện tại"
            className="w-full border p-2 rounded"
            value={form.currentPassword}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="newPassword"
            placeholder="Mật khẩu mới"
            className="w-full border p-2 rounded"
            value={form.newPassword}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="confirmPassword"
            placeholder="Xác nhận mật khẩu mới"
            className="w-full border p-2 rounded"
            value={form.confirmPassword}
            onChange={handleChange}
            required
          />
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
          >
            Xác nhận đổi mật khẩu
          </button>
        </form>
      )}
    </div>
  );
};

export default AccoutRecuiter;
