import { useState, useEffect } from "react";
import axios from "axios";
import { API_URL } from "../../constants/global";
import { Car } from "../../types/types";
import { CarFormModal } from "./CarFormModal";

export const AdminCarsTab = () => {
  const [cars, setCars] = useState<Car[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCar, setSelectedCar] = useState<Car | null>(null);

  const fetchCars = async () => {
    try {
      const response = await axios.get(`${API_URL}/cars`);
      setCars(response.data);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCarSubmit = async (formData: Car) => {
    const config = {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
      },
    };

    try {
      if (selectedCar) {
        await axios.patch(
          `${API_URL}/cars/${selectedCar._id}`,
          formData,
          config
        );
      } else {
        await axios.post(`${API_URL}/cars`, formData, config);
      }

      setIsModalOpen(false);
      fetchCars();
    } catch (error) {
      console.log(error);
      alert("Failed to create car");
    }
  };

  const handleEditCar = (car: Car) => {
    setSelectedCar(car);
    setIsModalOpen(true);
  };

  const handleDelete = async (car: Car) => {
    const confirm = window.confirm(
      "Are you sure you want to delete this car? This action cannot be undone."
    );

    if (!confirm) {
      return;
    }

    const config = {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
      },
    };

    try {
      await axios.delete(`${API_URL}/cars/${car._id}`, config);
      fetchCars();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchCars();
  }, []);

  return (
    <div className="admin-tab">
      <div className="admin-header">
        <h2>Car Management</h2>
        <button className="btn" onClick={() => setIsModalOpen(true)}>
          Add New Car
        </button>
      </div>

      {isLoading ? (
        <p>Loading cars...</p>
      ) : (
        <table className="reservation-table">
          <thead>
            <tr>
              <th>Image</th>
              <th>Make</th>
              <th>Model</th>
              <th>Year</th>
              <th>Price/day</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {cars.map((car) => (
              <tr key={car._id}>
                <td>
                  <img src={car.image} alt={car.make} className="car-image" />
                </td>
                <td>{car.make}</td>
                <td>{car.model}</td>
                <td>{car.year}</td>
                <td>{car.price}€</td>
                <td>
                  <button
                    className="btn-edit"
                    onClick={() => handleEditCar(car)}
                  >
                    Edit
                  </button>
                  <button
                    className="btn-delete"
                    onClick={() => handleDelete(car)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {isModalOpen && (
        <CarFormModal
          onModalClose={() => {
            setIsModalOpen(false);
            setSelectedCar(null);
          }}
          onSubmit={handleCarSubmit}
          selectedCar={selectedCar}
        />
      )}
    </div>
  );
};
