'use client';

import React, { useState } from 'react'
import TabsContainer from '@/components/common/TabsContainer';
import ChartTabContent from './ChartTabContent';

function ChartTab() {
    const [ tabValue, setTabValue ] = useState(0);
    
    const tabs = [
        { label: '인기차트', content: <ChartTabContent tabType={'top'} /> },
        { label: '장르별', content: <ChartTabContent tabType={'genre'} /> },
      //{ label: '무드별', content: <ChartTabContent tabType={'mood'} /> },
    ];

  return (
    <TabsContainer tabs={tabs} tabValue={tabValue} setTabValue={setTabValue} fullWidth={true} width={true}/>
  )
}

export default ChartTab