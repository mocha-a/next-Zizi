import React from 'react';
import Image from 'next/image';

interface props {
  name: string;
  imageUrl?: string;
  genres?: string[];
  popularity?: number;
  onClick?: () => void;
}

// 장르 맵핑
const genreMap: Record<string, string> = {
  "k-ballad": "발라드",
  "soundtrack": "OST",
  "k-pop": "K-POP",
  "k-rock": "락",
  "k-rap": "랩"
};

const ArtistCard = ({ name, imageUrl, genres, onClick }: props) => {
  // 매핑 후 문자열로 변환
  const mappedGenres = genres?.map((g) => genreMap[g] || g).join(' • ');

  return (
    <div className='artist-box' onClick={onClick}>
      <div className='artist-image'>
        <Image
          src={imageUrl || '/placeholder.png'}
          alt={name}
          width={98}
          height={98}
        />
      </div>
      <div>
        <p className='artist-name'>{name}</p>
        {mappedGenres && (
          <p className='artist-genre'>
            {mappedGenres}
          </p>
        )}
      </div>
    </div>
  )
}

export default ArtistCard;