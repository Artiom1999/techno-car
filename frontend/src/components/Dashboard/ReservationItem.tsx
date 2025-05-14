import { Reservation } from "../../types/types";

interface ReservationItemProps {
  reservation: Reservation;
  onDelete: (id: string) => void;
  isDeleting: boolean;
}

export const ReservationItem = ({
  reservation,
  onDelete,
  isDeleting,
}: ReservationItemProps) => {
  // Format date for display
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString();
  };

  return (
    <div className="reservation-item">
      <div className="reservation-car-info">
        <h4>
          {reservation.car.make} {reservation.car.model}
        </h4>
        <img
          src={reservation.car.image}
          alt="Car"
          className="reservation-car-image"
        />
      </div>
      <div className="reservation-details">
        <p>
          <strong>From:</strong> {formatDate(reservation.startDate)}
        </p>
        <p>
          <strong>To:</strong> {formatDate(reservation.endDate)}
        </p>
        <p>
          <strong>Total:</strong> €{reservation.totalPrice}
        </p>
        <p>
          <strong>Booked on:</strong> {formatDate(reservation.createdAt)}
        </p>
      </div>
      <div className="reservation-actions">
        <button
          className="delete-button"
          onClick={() => onDelete(reservation._id)}
          disabled={isDeleting}
        >
          {isDeleting ? "Cancelling..." : "Cancel"}
        </button>
      </div>
    </div>
  );
};
