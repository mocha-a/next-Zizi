import Skeleton from '@mui/material/Skeleton';
import React from 'react';

interface Props {
  i: number;
}

const TrendingSkeleton = ({ i }: Props) => {
  return (
    <li className="trending">
      <b className="num">{i + 1}</b>
      <Skeleton variant="rectangular" width="50%" height={16} className="keyword" />
    </li>
  )
}

export default TrendingSkeleton