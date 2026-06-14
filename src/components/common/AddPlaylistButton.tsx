'use client';

import Link from 'next/link';
import Plus from '../icons/Plus';

interface Props {
  onClick?: (e: React.MouseEvent<HTMLAnchorElement>) => void;
}

const AddPlaylistButton = ({ onClick }: Props) => {
  return (
    <Link
      href="/myplaylist/new"
      onClick={onClick}
      className="action-btn"
    >
      <Plus />
      <p>내 플리 추가</p>
    </Link>
  );
};

export default AddPlaylistButton;