import React from 'react';

interface Props {
  className?: string;
  image?: React.ReactNode;
  title?: string;
  description: string;
  keyword?: string;
}

function EmptyState({ className, image, title = '텅!', description, keyword }: Props) {
  return (
    <div className={`empty-state ${className ?? ''}`}>
      {image}

      <p className="empty-state__title">
        {title}
      </p>

      <p className="empty-state__description">
        {keyword && <span className="empty-state__keyword"> &#39;{keyword}&#39;</span> }
        {description}
      </p>
    </div>
  );
}

export default EmptyState;