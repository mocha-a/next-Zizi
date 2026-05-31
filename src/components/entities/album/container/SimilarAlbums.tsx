import React from "react";
import { useRouter } from 'next/navigation';
import { getSimilarAlbums } from "@/lib/api/album";
import { useQuery } from "@tanstack/react-query";
import AlbumList from "../ui/AlbumList";

interface Props {
  id: string;
  genreId: number;
}

function SimilarAlbums({ genreId, id }: Props) {
  const router = useRouter();

  const { data: albums = [], isLoading } = useQuery({
    queryKey: ['albums', 'similar', genreId, id],
    queryFn: () => getSimilarAlbums(Number(genreId), Number(id)),
    enabled: !!genreId,
  });

  return (
    <AlbumList
      albums={albums}
      loading={isLoading}
      hasMore={false}
      loadMore={() => {}}
      onClick={(id) => router.push(`/album/${id}`)}
    />
  );
}

export default SimilarAlbums;