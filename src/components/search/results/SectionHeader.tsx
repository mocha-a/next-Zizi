import React from 'react';
import MoreArrow from '@/components/icons/MoreArrow';
import { useTabStore } from '@/store/tabStore';

interface Props {
  title: string;
  targetIndex?: number;
}

const SectionHeader = ({ title, targetIndex }: Props) => {
  const { setTabValue } = useTabStore();

  const onClick = () => {
    if (typeof targetIndex === 'number') setTabValue(targetIndex);
  };

  return (
    <div className="section-header" onClick={onClick}>
      <h2>{title}</h2>
      <MoreArrow />
    </div>
  );
};

export default SectionHeader;