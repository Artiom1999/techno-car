import { useEffect, useState } from "react";
import { Car } from "../../types/types";

interface CarFormModalProps {
  onModalClose: () => void;
  onSubmit: (formData: Car) => void;
  selectedCar: Car | null;
}

export const CarFormModal = ({
  onModalClose,
  onSubmit,
  selectedCar,
}: CarFormModalProps) => {
  const [make, setMake] = useState("");
  const [model, setModel] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(0);
  const [features, setFeatures] = useState<string[]>([]);
  const [transmission, setTransmission] = useState("manual");
  const [fuelType, setFuelType] = useState("petrol");
  const [seats, setSeats] = useState(0);
  const [year, setYear] = useState(0);
  const [image, setImageUrl] = useState("");

  const handleFeaturesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setFeatures(value.split(",").map((item) => item.trim()));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = {
      make,
      model,
      description,
      price,
      features,
      transmission,
      fuelType,
      seats,
      year,
      image,
    };

    onSubmit(formData);
  };

  useEffect(() => {
    if (selectedCar) {
      setMake(selectedCar.make);
      setModel(selectedCar.model);
      setDescription(selectedCar.description);
      setPrice(selectedCar.price);
      setFeatures(selectedCar.features);
      setTransmission(selectedCar.transmission);
      setFuelType(selectedCar.fuelType);
      setSeats(selectedCar.seats);
      setYear(selectedCar.year);
      setImageUrl(selectedCar.image);
    }
  }, [selectedCar]);

  return (
    <div className="modal">
      <div className="modal-content">
        <span className="close" onClick={onModalClose}>
          x
        </span>
        <h2>{selectedCar ? "Edit Car" : "Add New Car"}</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Make:</label>
            <input
              required
              value={make}
              type="text"
              onChange={(e) => setMake(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label>Model:</label>
            <input
              required
              value={model}
              type="text"
              onChange={(e) => setModel(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label>Description:</label>
            <textarea
              required
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label>Price per day:</label>
            <input
              required
              value={price}
              type="number"
              onChange={(e) => setPrice(Number(e.target.value))}
            />
          </div>
          <div className="form-group">
            <label>Features (comma separated):</label>
            <input
              required
              value={features.join(", ")}
              type="text"
              onChange={handleFeaturesChange}
            />
          </div>
          <div className="form-group">
            <label>Transmission:</label>
            <select
              required
              value={transmission}
              onChange={(e) => setTransmission(e.target.value)}
            >
              <option value="manual">Manual</option>
              <option value="automatic">Automatic</option>
            </select>
          </div>
          <div className="form-group">
            <label>Fuel Type:</label>
            <select
              required
              value={fuelType}
              onChange={(e) => setFuelType(e.target.value)}
            >
              <option value="petrol">Petrol</option>
              <option value="diesel">Diesel</option>
              <option value="electric">Electric</option>
            </select>
          </div>
          <div className="form-group">
            <label>Seats:</label>
            <input
              required
              value={seats}
              type="number"
              onChange={(e) => setSeats(Number(e.target.value))}
            />
          </div>
          <div className="form-group">
            <label>Year:</label>
            <input
              required
              value={year}
              type="number"
              onChange={(e) => setYear(Number(e.target.value))}
            />
          </div>
          <div className="form-group">
            <label>Image URL:</label>
            <input
              required
              value={image}
              type="text"
              onChange={(e) => setImageUrl(e.target.value)}
            />
          </div>
          <button type="submit" className="btn">
            {selectedCar ? "Update Car" : "Add Car"}
          </button>
        </form>
      </div>
    </div>
  );
};
