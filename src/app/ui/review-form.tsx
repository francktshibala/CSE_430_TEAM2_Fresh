'use client';

import { useState } from 'react';
import StarRating from './star-rating';

interface ReviewFormProps {
  productId: number;
  onReviewSubmitted: () => void;
}

export default function ReviewForm({ productId, onReviewSubmitted }: ReviewFormProps) {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (rating === 0) {
      setError('Please select a rating');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const response = await fetch('/api/reviews', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          rating,
          comment: comment.trim() || undefined,
          productId
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setSuccess(true);
        setRating(0);
        setComment('');
        onReviewSubmitted();
        
        // Hide success message after 3 seconds
        setTimeout(() => setSuccess(false), 3000);
      } else {
        setError(data.error || 'Failed to submit review');
      }
    } catch {
      setError('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      backgroundColor: 'white',
      padding: '25px',
      borderRadius: '8px',
      border: '1px solid #ddd',
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
    }}>
      <h3 style={{ 
        color: '#8B4513', 
        marginBottom: '20px',
        fontSize: '20px'
      }}>
        Write a Review
      </h3>

      {success && (
        <div style={{
          backgroundColor: '#d4edda',
          color: '#155724',
          padding: '12px',
          borderRadius: '4px',
          marginBottom: '20px',
          textAlign: 'center'
        }}>
          Review submitted successfully!
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '20px' }}>
          <label style={{
            display: 'block',
            marginBottom: '8px',
            color: '#333',
            fontWeight: '500'
          }}>
            Rating *
          </label>
          <StarRating 
            rating={rating} 
            onRatingChange={setRating}
            size={30}
          />
          {rating > 0 && (
            <span style={{ 
              marginLeft: '10px', 
              color: '#666',
              fontSize: '14px'
            }}>
              {rating} star{rating !== 1 ? 's' : ''}
            </span>
          )}
        </div>

        <div style={{ marginBottom: '20px' }}>
          <label style={{
            display: 'block',
            marginBottom: '8px',
            color: '#333',
            fontWeight: '500'
          }}>
            Comment (Optional)
          </label>
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Share your experience with this product..."
            rows={4}
            style={{
              width: '100%',
              padding: '12px',
              border: '2px solid #ddd',
              borderRadius: '4px',
              fontSize: '16px',
              outline: 'none',
              resize: 'vertical',
              fontFamily: 'inherit'
            }}
            onFocus={(e) => e.target.style.borderColor = '#8B4513'}
            onBlur={(e) => e.target.style.borderColor = '#ddd'}
          />
        </div>

        {error && (
          <div style={{
            backgroundColor: '#fee',
            color: '#c33',
            padding: '12px',
            borderRadius: '4px',
            marginBottom: '20px',
            textAlign: 'center'
          }}>
            {error}
          </div>
        )}

        <button
          type="submit"
          disabled={loading || rating === 0}
          style={{
            backgroundColor: loading || rating === 0 ? '#ccc' : '#8B4513',
            color: 'white',
            padding: '12px 24px',
            border: 'none',
            borderRadius: '4px',
            fontSize: '16px',
            fontWeight: 'bold',
            cursor: loading || rating === 0 ? 'not-allowed' : 'pointer',
            transition: 'background-color 0.3s'
          }}
          onMouseOver={(e) => {
            if (!loading && rating > 0) e.currentTarget.style.backgroundColor = '#a0522d';
          }}
          onMouseOut={(e) => {
            if (!loading && rating > 0) e.currentTarget.style.backgroundColor = '#8B4513';
          }}
        >
          {loading ? 'Submitting...' : 'Submit Review'}
        </button>
      </form>
    </div>
  );
}