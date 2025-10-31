import MoreArrow from '@/components/icons/MoreArrow';
import React from 'react'

interface SectionHeaderProps {
  title: string;
}

const SectionHeader = ({ title }: SectionHeaderProps) => (
  <div className="section-header">
    <h2>{title}</h2>
    <MoreArrow />
  </div>
);

export default SectionHeader