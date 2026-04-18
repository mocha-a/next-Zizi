'use client';

interface DeezerPlayerProps {
    trackId: string | number;
}

export default function DeezerPlayer({ trackId }: DeezerPlayerProps) {
  return (
    <div className="deezer-widget-container" style={{ width: '100%', height:  '100%' }}>
      <iframe
        title="deezer-player" 
        src={`https://widget.deezer.com/widget/dark/track/${trackId}?tracklist=false&radius=true`}
        width={'100%'}
        height={'100%'}
        allow="encrypted-media; clipboard-write"
        style={{ borderRadius: '8px', border: 'none' }}
      ></iframe>
    </div>
  );
}
