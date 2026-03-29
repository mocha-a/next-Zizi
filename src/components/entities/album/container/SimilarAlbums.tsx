import React from "react";

interface Props {
  genreId: number;
}

function SimilarAlbums({ genreId }: Props) {


  return (
    <div style={{  }}>
     {genreId}
     <p>{`record_type : "album"`} 으로 필터 만들기 !</p>
     <p>
       앨범별 nb_tracks 속성으로 아티스트의 총 곡 수 표현 할 수 있을지 고민하기
     </p>
    </div>
  );
}

export default SimilarAlbums;