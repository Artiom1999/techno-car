import { useState, useEffect } from "react";
import "./reservation-modal.css";
import axios from "axios";
import { API_URL } from "../../constants/global";
import { Car } from "../../types/types";

interface ReservationModalProps {
  onModalClose: () => void;
  onSuccess: () => void;
  car: Car;
}

export const ReservationModal: React.FC<ReservationModalProps> = ({
  onModalClose,
  onSuccess,
  car,
}) => {
  const [startDate, setStartDate] = useState<string>("");
  const [endDate, setEndDate] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [totalPrice, setTotalPrice] = useState<number>(0);

  useEffect(() => {
    if (startDate && endDate) {
      // Calculate total price based on the selected dates
      const start = new Date(startDate);
      // new Date(endDate)
      const end = new Date(endDate);
      const diffTime = Math.abs(end.getTime() - start.getTime());
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      setTotalPrice(diffDays * car.price);
    }
  }, [startDate, endDate, car.price]);

  const handleFormSubmit = async (event: React.FormEvent) => {
    event?.preventDefault();

    if (!startDate || !endDate) {
      setError("Prašome pasirinkti datas");
      return;
    }

    try {
      const config = {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      };

      // Calculate total days between start and end date
      const start = new Date(startDate);
      const end = new Date(endDate);
      const diffDays = Math.ceil(
        (end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)
      );

      await axios.post(
        `${API_URL}/reservations`,
        {
          totalDays: diffDays,
          startDate: start.toISOString(),
          endDate: end.toISOString(),
          carId: car._id,
        },
        config
      );
      onModalClose();
      onSuccess();
      setError(null);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const errorMessage =
          error?.response?.data?.error || "Ivyko klaida rezervavimo metu.";
        setError(errorMessage);
      }
    }
  };

  const today = new Date().toISOString().split("T")[0];

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>
          Rezervuoti {car.make} {car.model}
        </h2>
        <form onSubmit={handleFormSubmit}>
          <div className="form-group">
            <label htmlFor="startDate">Pradžios data:</label>
            <input
              type="date"
              id="startDate"
              min={today}
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="endDate">Pabaigos data:</label>
            <input
              type="date"
              id="endDate"
              min={startDate || today}
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              required
            />
          </div>

          <div className="booking-summary">
            <div className="price-info">
              <p>
                Kaina per dieną: <strong>{car.price} €</strong>
              </p>
              <p className="total-price">
                Bendra kaina: <strong>{totalPrice} €</strong>
              </p>
            </div>
          </div>

          {error && <div className="error-container">{error}</div>}

          <div className="modal-actions">
            <button type="button" onClick={onModalClose}>
              Atšaukti
            </button>
            <button type="submit" disabled={!startDate || !endDate}>
              Rezervuoti
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
