import { useEffect, useState, useContext } from "react";
import axios from "axios";
import { API_URL } from "../../constants/global";
import { AuthContext } from "../../context/AuthContext";
import { User } from "../../types/types";
import { UserFormModal } from "./UserFormModal";

export const AllUsersTab = () => {
  const { access_token } = useContext(AuthContext);
  const [users, setUsers] = useState<User[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

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

  const handleEditClick = (user: User) => {
    setSelectedUser(user);
    setIsModalOpen(true);
  };

  const handleUserSubmit = async (formData: User) => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      };
      await axios.patch(
        `${API_URL}/users/${formData._id}`,
        { role: formData.role },
        config
      );
      setIsModalOpen(false);
      setSelectedUser(null);

      // fetch again
      const updatedUsers = await axios.get(`${API_URL}/users`, config);
      setUsers(updatedUsers.data);
    } catch (err) {
      console.error("Failed to update user role", err);
    }
  };

  return (
    <div>
      <h2>All Users</h2>
      <table className="reservation-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user._id}>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.role}</td>
              <td>
                <button
                  className="btn-edit"
                  onClick={() => handleEditClick(user)}
                >
                  Edit
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {isModalOpen && selectedUser && (
        <UserFormModal
          selectedUser={selectedUser}
          onModalClose={() => {
            setIsModalOpen(false);
            setSelectedUser(null);
          }}
          onSubmit={handleUserSubmit}
        />
      )}
    </div>
  );
};
