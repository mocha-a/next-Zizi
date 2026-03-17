import React from 'react'

interface IconButtonContentProps {
    icon: React.ReactNode;
    text: string;
    onClick?: () => void;
}

export const IconButton = ({icon, text, onClick}: IconButtonContentProps) => {
  return (
    <button className="icon-button" onClick={onClick}>
        {icon}
        <p>{text}</p>
    </button>
  )
}
