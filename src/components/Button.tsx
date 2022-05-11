import React from 'react';

interface ButtonProps {
  handleClick: () => void;
  text: string;
  className: string;
}

export default function Button({
  handleClick,
  text,
  className,
}: ButtonProps): JSX.Element {
  return (
    <div>
      <button onClick={handleClick} className={className}>
        {text}
      </button>
    </div>
  );
}
