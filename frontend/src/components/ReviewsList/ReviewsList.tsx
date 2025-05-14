import axios from "axios";
import "./reviews-list.css";
import { useEffect, useState } from "react";
import { API_URL } from "../../constants/global";
import { Review } from "../../types/types";
import { ReviewCard } from "../ReviewCard/ReviewCard";
import { ReviewModal } from "../ReviewModal/ReviewModal";

export const ReviewsList = () => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const fetchReviews = async () => {
    try {
      const response = await axios.get(`${API_URL}/reviews`);
      setReviews(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  return (
    <>
      <div className="hero">
        <h1>Atsiliepimai</h1>
        <p>Skaitykite musu klientu atsiliepimus ir suzinokite ju patirti.</p>
        <button
          className="add-review-button"
          onClick={() => setIsModalVisible(true)}
        >
          Palikite atsiliepima
        </button>
      </div>
      <div className="reviews-list">
        {reviews.map((review) => (
          <ReviewCard key={review._id} review={review} />
        ))}
      </div>
      {isModalVisible && (
        <ReviewModal
          onModalClose={() => setIsModalVisible(false)}
          onSuccess={fetchReviews}
        />
      )}
    </>
  );
};
