import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logOut, reset } from "../../../features/authSlice";
import "../ComponenCss/UserLits.css";

// Define the interface for Use
interface User {
  uuid: string;
  name: string;
  email: string;
  role: string;
  phone: string;
  province: string;
  city: string;
}

const UserLists: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const dispatch = useDispatch<any>();
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [msg, setMsg] = useState<string>('');
  //const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    getUsers();
  }, []);  // Dependency array is correct

  const logout = () => {
    dispatch(logOut());
    dispatch(reset());
    navigate("/");
  }

  const getUsers = async () => {
    try {
      const response = await axios.get<User[]>("http://localhost:7000/users");
      console.log(response.data); // Log the response data for debugging
      setUsers(response.data);
    } catch (error) {
      console.error("Failed to fetch users", error);
    }
  };

  const deleteUser = async (userId: string) => {
    try {
      await axios.delete(`http://localhost:7300/users/${userId}`);
    setUsers(users.filter(user => user.uuid !== userId)); //  UUID yang tidak dipilih, bakal tetea ada di state baru!
    } catch (err) {
      console.error('Failed to delete user', err);
      setMsg('Failed to delete user');
    }
    
  };



  return (
    <div className='class1'>
      <a onClick={logout} className="navbar-item white-text" >
                Logout
              </a>
      <table>
        <thead>
          <tr>
            <th>No</th>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Province</th>
            <th>City</th>
            <th>Role</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.length === 0 ? (
            <tr>
              <td colSpan={8}>No users found</td>
            </tr>
          ) : (
            users.map((user, index) => (
              <tr key={user.uuid}>
                <td>{index + 1}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.phone}</td>
                <td>{user.province}</td>
                <td>{user.city}</td>
                <td>{user.role}</td>
                <td>
                  <Link
                    to={`/EditUser/${user.uuid}`}
                    className="button is-small is-info"
                  >
                    Edit
                  </Link>
                  <button
                    onClick={() => deleteUser(user.uuid)}
                    className="button is-small is-danger"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  )
}

export default UserLists;
