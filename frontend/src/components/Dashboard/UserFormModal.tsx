// UserFormModal.tsx
import { useState, useEffect } from "react";
import { User } from "../../types/types";

interface Props {
  onModalClose: () => void;
  onSubmit: (formData: User) => void;
  selectedUser: User;
}

export const UserFormModal = ({
  onModalClose,
  onSubmit,
  selectedUser,
}: Props) => {
  const [role, setRole] = useState("user");

  useEffect(() => {
    if (selectedUser) {
      setRole(selectedUser.role);
    }
  }, [selectedUser]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit({ ...selectedUser, role });
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <span className="close" onClick={onModalClose}>
          x
        </span>
        <h2>Edit User Role</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Role:</label>
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              required
            >
              <option value="user">User</option>
              <option value="admin">Admin</option>
            </select>
          </div>
          <button type="submit" className="btn">
            Update Role
          </button>
        </form>
      </div>
    </div>
  );
};
