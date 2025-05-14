import { useEffect, useState } from "react";
import axios from "axios";
import { API_URL } from "../../constants/global";
import { Reservation } from "../../types/types";

export const AdminReservationsTab = () => {
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchReservations = async () => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      };
      const response = await axios.get(`${API_URL}/reservations/all`, config);
      setReservations(response.data);
    } catch (error) {
      console.error("Error fetching reservations:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchReservations();
  }, []);

  return (
    <div className="admin-tab">
      <h2>All Reservations</h2>

      {isLoading ? (
        <p>Loading reservations...</p>
      ) : (
        <table className="reservation-table">
          <thead>
            <tr>
              <th>User</th>
              <th>Car</th>
              <th>Start Date</th>
              <th>End Date</th>
              <th>Total Price</th>
              <th>Booking Date</th>
            </tr>
          </thead>
          <tbody>
            {reservations.map((res) => (
              <tr key={res._id}>
                <td>{res.user.email}</td>
                <td>
                  {res.car.make} {res.car.model}
                </td>
                <td>{res.startDate.slice(0, 10)}</td>
                <td>{res.endDate.slice(0, 10)}</td>
                <td>{res.totalPrice} €</td>
                <td>{res.createdAt.slice(0, 10)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};
