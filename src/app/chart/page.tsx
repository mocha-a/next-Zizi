import React from 'react'
import PageTitle from '@/components/common/PageTitle'
import ChartTab from '@/components/chart/ChartTab';
import Footer from '@/components/common/Footer';

import '../../styles/chart/chart.scss';

function page() {
  
  return (
    <div className='chart-container'>
      {/* page title */}
      <PageTitle text='차트'/>
      
      {/* tab 및 tabContents */}
      <ChartTab/>

      <div className='chart-footer'>
        <Footer/>
      </div>
    </div>
  )
}

export default page