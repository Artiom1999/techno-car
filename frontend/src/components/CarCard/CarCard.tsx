import { useNavigate } from "react-router-dom";
import { Car } from "../../types/types";
import "./car-card.css";

interface CarCardProps {
  car: Car;
}

export const CarCard = ({ car }: CarCardProps) => {
  const navigate = useNavigate();

  const handleClick = () => {
    // navigate - nuveda i kita puslapi jo neperkraunant
    navigate(`/cars/${car._id}`);
  };

  return (
    <div className="car-card" onClick={handleClick}>
      <img src={car.image} alt="Car" className="car-card-image" />
      <div className="car-card-content">
        <h3>
          {car.make} {car.model}
        </h3>
        <p>{car.description}</p>
      </div>
    </div>
  );
};
