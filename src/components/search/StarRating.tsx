import * as React from 'react';
import Box from '@mui/material/Box';
import Rating from '@mui/material/Rating';
import Star from '/public/icons/star.svg';
import StarHalf from '/public/icons/star-half.svg';
import StarEmpty from '/public/icons/star-empty.svg';

interface Props {
  popularity: number; // 0~100
}

export default function StarRating({ popularity }: Props) {
  const rawRating = (popularity / 100) * 5;
  const ratingValue = Math.round(rawRating * 2) / 2;

  const IconContainer = (props: { value: number }) => {
    let Icon = StarEmpty;
    if (props.value <= Math.floor(ratingValue)) {
      Icon = Star;
    } else if (props.value - 0.5 === Math.floor(ratingValue)) {
      Icon = StarHalf;
    }
  return (
      <Icon width={15} height={15} />
  );
  };

  return (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
      <Rating
        name="custom-star"
        value={ratingValue}
        readOnly
        precision={0.5}
        IconContainerComponent={IconContainer}
        sx={{
          '& .MuiRating-root': { lineHeight: 0 },   // 중요: 전체 height 줄이기
          '& svg': { display: 'block', height: 15, width: 15 }, // SVG 크기 확실하게
        }}
      />
      <span style={{ fontSize: '11.5px' }}>{rawRating.toFixed(1)}</span>
    </Box>
  );
}