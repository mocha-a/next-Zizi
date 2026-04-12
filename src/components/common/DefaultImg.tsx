import { getDefaultImg } from '@/lib/defaultImg';
import Image, { ImageProps } from 'next/image';
import { useState } from 'react';

interface Props extends ImageProps {
  fallback?: string;
}

const DefaultImage = ({ src, fallback = '/imgs/default.png', ...props }: Props) => {
  const initialSrc =
    typeof src === 'string' ? getDefaultImg(src, fallback) : fallback;

  const [imgSrc, setImgSrc] = useState(initialSrc);

  return (
    <Image
      {...props}
      src={imgSrc}
      alt="default"
      onError={() => setImgSrc(fallback)}
    />
  );
};

export default DefaultImage;