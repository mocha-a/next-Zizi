'use client';

import React, { useEffect } from 'react'
import PageTitle from '@/components/common/PageTitle'
import ChartTab from '@/components/chart/ChartTab';
import { useTabStore } from '@/store/tabStore';

import '../../styles/chart/chart.scss';

export default function Page() {
  const { setTabValue } = useTabStore(); // playlist tab 관련 error 방지

  useEffect(() => {
    setTabValue(0);
  }, [setTabValue]);

  return (
    <div className='chart-container'>
      {/* page title */}
      <PageTitle text='차트'/>
      
      {/* tab 및 tabContents */}
      <ChartTab />
    </div>
  )
}