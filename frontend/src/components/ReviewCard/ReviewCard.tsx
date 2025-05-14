import { Review } from '../../types/types';
import './review-card.css';

interface ReviewCardProps {
  review: Review;
}

export const ReviewCard = ({ review }: ReviewCardProps) => {
  const formattedDate = new Date(review.date).toLocaleDateString('lt-LT', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
  return (
    <div className="review-card">
      <div className="review-card-header">
        <div className="review-card-author">
          <div className="author-avatar">{review.name[0]}</div>
          <h3>{review.name}</h3>
        </div>
        <span>{review.rating}/5</span>
      </div>
      <div className="review-card-content">
        <p className="review-text">{review.description}</p>
        <p className="review-date">{formattedDate}</p>
      </div>
    </div>
  );
};
