import React from "react";

interface Props {
  genreId: number;
}

function SimilarAlbums({ genreId }: Props) {


  return (
    <div style={{  }}>
     {genreId}
    </div>
  );
}

export default SimilarAlbums;