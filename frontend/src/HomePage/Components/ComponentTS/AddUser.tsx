import React, { useState } from 'react';
import axios from 'axios';

interface User {
  name: string;
  email: string;
  phone: string;
  province: string;
  city: string;
  role: string;
  // Tambahkan hashPassword jika diperlukan
  password?: string; // Tidak wajib jika tidak ada di form
}

const AddUser = () => {
  const [userState, setUserState] = useState<User>({
    name: "",
    email: "",
    phone: "",
    province: "",
    city: "",
    role: "",
    password: "" // Tambahkan hashPassword jika diperlukan
  });

  // Tambahkan state untuk menangani pesan error
  const [msg, setMsg] = useState<string>("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserState({
      ...userState,
      [name]: value,
    });
  };

  const saveUser = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:7000/users", {
        name: userState.name,
        email: userState.email,
        password: userState.password, // Mengirimkan password hash
        role: userState.role,
        phone: userState.phone,
        province: userState.province,
        city: userState.city
      });
      setMsg("User saved successfully!");
    } catch (err: any) {
      if (err.response) {
        setMsg(err.response.data.msg);
      }
    }
  };

  return (
    <div>
      <h2>Add User</h2>
      <form onSubmit={saveUser}>
        <div>
          <label>Name:</label>
          <input
            type="text"
            name="name"
            value={userState.name}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={userState.email}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            name="password"
            value={userState.password}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Phone:</label>
          <input
            type="text"
            name="phone"
            value={userState.phone}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Province:</label>
          <input
            type="text"
            name="province"
            value={userState.province}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>City:</label>
          <input
            type="text"
            name="city"
            value={userState.city}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Role:</label>
          <input
            type="text"
            name="role"
            value={userState.role}
            onChange={handleChange}
          />
        </div>
        <button type="submit">Save User</button>
      </form>
      {msg && <p>{msg}</p>}
    </div>
  );
};

export default AddUser;
