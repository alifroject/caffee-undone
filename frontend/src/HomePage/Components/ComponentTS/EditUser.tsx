import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

interface User {
  name: string;
  email: string;
  phone: string;
  province: string;
  city: string;
  role: string;
  password?: string;
}

const EditUser = () => {
  const [user, setUser] = useState<User | null>(null); //Edit hanya pada satu pengguna
  const [msg, setMsg] = useState<string>('');
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    const getUser = async () => {
      if (id) {
        try {
          const response = await axios.get(`http://localhost:7000/users/${id}`);
          setUser(response.data);
        } catch (err) {
          if (axios.isAxiosError(err)) {
            console.error("Failed to fetch user:", err.message);
            setMsg('Failed to fetch user');
          } else {
            console.error("Unexpected error:", err);
            setMsg('Unexpected error occurred');
          }
        }
      }
    };
    getUser();
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (user) {
      setUser({ ...user, [e.target.name]: e.target.value });
    }
  };

  const updateUser = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (user) {
      try {
        await axios.patch(`http://localhost:7000/users/${id}`, user);
        setMsg('User updated successfully');
      } catch (error) {
        console.error('Failed to update user', error);
        setMsg('Failed to update user');
      }
    }
  };

  if (!user) return <p>Loading...</p>;

  return (
    <div>
      <h2>Edit User</h2>
      <form onSubmit={updateUser}>
        <div>
          <label>Name:</label>
          <input
            type="text"
            name="name"
            value={user.name || ''}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={user.email || ''}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            name="password"
            value={user.password || ''}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Phone:</label>
          <input
            type="text"
            name="phone"
            value={user.phone || ''}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Province:</label>
          <input
            type="text"
            name="province"
            value={user.province || ''}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>City:</label>
          <input
            type="text"
            name="city"
            value={user.city || ''}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Role:</label>
          <input
            type="text"
            name="role"
            value={user.role || ''}
            onChange={handleChange}
          />
        </div>
        <button type="submit">Save User</button>
      </form>
      {msg && <p>{msg}</p>}
    </div>
  );
};

export default EditUser;
