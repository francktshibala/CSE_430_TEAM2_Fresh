'use client';

import { useEffect, useState } from 'react';
import StarRating from './star-rating';

interface Review {
  id: number;
  rating: number;
  comment: string | null;
  createdAt: string;
  user: {
    name: string;
  };
}

interface ReviewsListProps {
  productId: number;
  refreshTrigger?: number;
}

export default function ReviewsList({ productId, refreshTrigger }: ReviewsListProps) {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchReviews = async () => {
    try {
      setLoading(true);
      const response = await fetch(`/api/reviews?productId=${productId}`);
      const data = await response.json();

      if (response.ok) {
        setReviews(data.reviews);
      } else {
        setError(data.error || 'Failed to load reviews');
      }
    } catch {
      setError('Network error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, [productId, refreshTrigger]);

  if (loading) {
    return (
      <div style={{ textAlign: 'center', padding: '20px', color: '#666' }}>
        Loading reviews...
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ 
        textAlign: 'center', 
        padding: '20px', 
        color: '#c33',
        backgroundColor: '#fee',
        borderRadius: '4px'
      }}>
        {error}
      </div>
    );
  }

  if (reviews.length === 0) {
    return (
      <div style={{ 
        textAlign: 'center', 
        padding: '40px', 
        color: '#666',
        backgroundColor: '#f9f9f9',
        borderRadius: '8px'
      }}>
        <p>No reviews yet. Be the first to review this product!</p>
      </div>
    );
  }

  const averageRating = reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length;

  return (
    <div>
      <div style={{ 
        marginBottom: '20px', 
        padding: '15px',
        backgroundColor: '#f9f9f9',
        borderRadius: '8px',
        textAlign: 'center'
      }}>
        <h3 style={{ margin: '0 0 10px 0', color: '#8B4513' }}>
          Customer Reviews ({reviews.length})
        </h3>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px' }}>
          <StarRating rating={averageRating} readonly size={24} />
          <span style={{ fontSize: '18px', fontWeight: 'bold', color: '#333' }}>
            {averageRating.toFixed(1)}
          </span>
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
        {reviews.map((review) => (
          <div
            key={review.id}
            style={{
              padding: '20px',
              backgroundColor: 'white',
              border: '1px solid #ddd',
              borderRadius: '8px',
              boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
            }}
          >
            <div style={{ 
              display: 'flex', 
              justifyContent: 'space-between', 
              alignItems: 'center',
              marginBottom: '10px'
            }}>
              <div>
                <strong style={{ color: '#333' }}>{review.user.name}</strong>
                <div style={{ marginTop: '5px' }}>
                  <StarRating rating={review.rating} readonly size={16} />
                </div>
              </div>
              <span style={{ color: '#666', fontSize: '14px' }}>
                {new Date(review.createdAt).toLocaleDateString()}
              </span>
            </div>
            
            {review.comment && (
              <p style={{ 
                margin: '0', 
                color: '#555', 
                lineHeight: '1.5',
                fontStyle: review.comment ? 'normal' : 'italic'
              }}>
                {review.comment}
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}