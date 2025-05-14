import { User } from "../../types/types";

interface AccountInfoProps {
  user: User | null;
}

export const AccountInfo = ({ user }: AccountInfoProps) => {
  return (
    <div className="dashboard-card">
      <h3>Account Information</h3>
      <div className="account-info">
        <p>
          <strong>Name:</strong> {user?.name}
        </p>
        <p>
          <strong>Email:</strong> {user?.email}
        </p>
        <p>
          <strong>Role:</strong> {user?.role}
        </p>
      </div>
    </div>
  );
};
