'use client';

import { useRouter } from 'next/navigation';
import React from 'react';

interface ActionButtonProps {
  label: string;
  color?: string;          // background color
  hoverColor?: string;     // hover background color
  path?: string;           // where to navigate on click
  onClick?: () => void;    // optional custom click handler
}

const ActionButton: React.FC<ActionButtonProps> = ({
  label,
  color = '#8B4513',
  hoverColor = '#a0522d',
  path,
  onClick,
}) => {
  const router = useRouter();

  const handleClick = () => {
    if (onClick) return onClick();
    if (path) router.push(path);
  };

  return (
    <button
      style={{
        backgroundColor: color,
        color: 'white',
        padding: '15px 20px',
        border: 'none',
        borderRadius: '4px',
        fontSize: '14px',
        fontWeight: '500',
        cursor: 'pointer',
        textAlign: 'center',
        transition: 'background-color 0.2s',
      }}
      onClick={handleClick}
      onMouseOver={(e) => (e.currentTarget.style.backgroundColor = hoverColor)}
      onMouseOut={(e) => (e.currentTarget.style.backgroundColor = color)}
    >
      {label}
    </button>
  );
};

export default ActionButton;
