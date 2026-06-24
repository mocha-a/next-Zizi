import React from 'react';

interface Props {
  image?: React.ReactNode;
  title?: string;
  description: string;
}

function EmptyState({ image, title = '텅!', description }: Props) {
  return (
    <div className="empty-state">
      {image}

      <p className="empty-state__title">
        {title}
      </p>

      <p className="empty-state__description">
        {description}
      </p>
    </div>
  );
}

export default EmptyState;