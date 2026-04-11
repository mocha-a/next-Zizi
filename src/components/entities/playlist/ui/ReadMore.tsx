import React, { useState } from 'react'

interface Props{
  description: string;
}

const ReadMore = ({ description }: Props) => {
  const [readMore, setReadMore] = useState(false);
  const isLong = description.length > 50;

  return (
    <p className="playlist-description">
      <span className={readMore ? "" : "text"}>
        “ {description} ”
      </span>

      {isLong && (
        <span
          className="more-btn"
          onClick={() => setReadMore(prev => !prev)}
        >
          {readMore ? "접기" : "··· 더보기"}
        </span>
      )}
    </p>
  );
};

export default ReadMore