import TrackItem from '@/components/common/TrackItem';
import TrackSkeleton from '@/components/loading/item/TrackSkeleton';
import { getFlow } from '@/lib/api/playlist';
import { Track } from '@/types/deezer/deezer';
import { useQuery } from '@tanstack/react-query';
import React from 'react'

interface Props{
  id: number;
}

const PlaylistFlow = ({ id }: Props) => {

  const { data: flow, isLoading } = useQuery<Track[]>({
    queryKey: ['flow', id],
    queryFn: () => getFlow(id!),
    enabled: !!id
  });

   return (
    <div className='playlist-flow'>
      <p>{`주인장’s 취향으로 꽉- 채운 추천 트랙.. ( ^_− ) ☆`}</p>

      <ul className="tracklist">
        {isLoading &&
          Array.from({ length: 5 }).map((_, i) => (
            <TrackSkeleton key={i} index={i} /> ))
        }

        {!isLoading && flow?.map((track, i) => (
          <TrackItem
            key={track.id}
            track={track}
            index={i}
          />
        ))}
      </ul>

      {!isLoading && !flow?.length && (
        <div>아티스트 없음</div>
      )}
    </div>
  )
}

export default PlaylistFlow