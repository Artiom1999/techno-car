import { useNavigate, useParams } from "react-router-dom";
import "./car-details.css";
import { Car } from "../../types/types";
import { useEffect, useState, useContext } from "react";
import axios from "axios";
import { API_URL } from "../../constants/global";
import { AuthContext } from "../../context/AuthContext";
import { ReservationModal } from "../ReservationModal/ReservationModal";

export const CarDetails = () => {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const [car, setCar] = useState<Car | null>(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  // useParams yra HOOK kuris naudojamas gauti URL parametrus pvz id => :id
  const { id } = useParams();

  useEffect(() => {
    const fetchCarDetails = async () => {
      const response = await axios.get(`${API_URL}/cars/${id}`);
      setCar(response.data);
    };

    fetchCarDetails();
  }, []);

  const handleBackClick = () => {
    navigate("/");
  };

  const handleReserveClick = () => {
    // Check if user is authenticated
    if (!user) {
      navigate("/login");
      return;
    }

    setIsModalVisible(true);
  };

  return (
    <div className="car-detail">
      <div className="car-detail-container">
        {/* Kaire puse */}
        <div className="car-detail-left">
          <img src={car?.image} alt="Car" className="car-detail-image" />
        </div>
        {/* Desine puse */}
        <div className="car-detail-right">
          {/* header */}
          <div className="car-header">
            <h2>
              {car?.make} {car?.model}
            </h2>
            <p className="car-year">{car?.year} m.</p>
          </div>
          {/*  */}
          <div className="car-description">
            <p>Nuostabus automobilis!</p>
          </div>
          <div className="car-specs">
            <div className="spec-item">
              <span className="spec-label">Pavarų dėžė: </span>
              <span className="spec-value">{car?.transmission}</span>
            </div>
            <div className="spec-item">
              <span className="spec-label">Kuro tipas: </span>
              <span className="spec-value">{car?.fuelType}</span>
            </div>
            <div className="spec-item">
              <span className="spec-label">Sėdimų vietų: </span>
              <span className="spec-value">{car?.seats}</span>
            </div>
            <div className="spec-item">
              <span className="spec-label">Kaina per dieną: </span>
              <span className="spec-value">${car?.price}</span>
            </div>
          </div>
          <div className="car-actions">
            <button
              className="button button-primary"
              onClick={handleReserveClick}
            >
              Rezervuoti
            </button>
            <button
              className="button button-secondary"
              onClick={handleBackClick}
            >
              Grįžti į pagrindinį
            </button>
          </div>
        </div>
      </div>
      {isModalVisible && car && (
        <ReservationModal
          onModalClose={() => setIsModalVisible(false)}
          onSuccess={() => setIsModalVisible(false)}
          car={car}
        />
      )}
    </div>
  );
};
