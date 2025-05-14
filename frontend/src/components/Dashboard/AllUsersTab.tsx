// src/pages/Dashboard/AllUsersTab.tsx
import { useEffect, useState, useContext } from "react";
import axios from "axios";
import { API_URL } from "../../constants/global";
import { AuthContext } from "../../context/AuthContext";
import { User } from "../../types/types";

export const AllUsersTab = () => {
  const { access_token } = useContext(AuthContext);
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const config = {
          headers: {
            Authorization: `Bearer ${access_token}`,
          },
        };
        const response = await axios.get(`${API_URL}/users`, config);
        setUsers(response.data);
      } catch (err) {
        console.error("Failed to fetch users", err);
      }
    };

    fetchUsers();
  }, [access_token]);

  return (
    <div>
      <h2>All Users</h2>
      <table className="reservation-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user._id}>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.role}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
