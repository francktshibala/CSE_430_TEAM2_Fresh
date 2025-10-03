'use client';

import { useState } from 'react';

interface StarRatingProps {
  rating: number;
  onRatingChange?: (rating: number) => void;
  readonly?: boolean;
  size?: number;
}

export default function StarRating({ 
  rating, 
  onRatingChange, 
  readonly = false, 
  size = 20 
}: StarRatingProps) {
  const [hoverRating, setHoverRating] = useState(0);

  const handleClick = (value: number) => {
    if (!readonly && onRatingChange) {
      onRatingChange(value);
    }
  };

  const handleMouseEnter = (value: number) => {
    if (!readonly) {
      setHoverRating(value);
    }
  };

  const handleMouseLeave = () => {
    if (!readonly) {
      setHoverRating(0);
    }
  };

  return (
    <div style={{ display: 'flex', gap: '2px' }}>
      {[1, 2, 3, 4, 5].map((star) => (
        <span
          key={star}
          onClick={() => handleClick(star)}
          onMouseEnter={() => handleMouseEnter(star)}
          onMouseLeave={handleMouseLeave}
          style={{
            fontSize: `${size}px`,
            color: star <= (hoverRating || rating) ? '#FFD700' : '#DDD',
            cursor: readonly ? 'default' : 'pointer',
            transition: 'color 0.2s'
          }}
        >
          ★
        </span>
      ))}
    </div>
  );
}