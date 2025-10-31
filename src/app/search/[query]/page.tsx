"use client"

import React from 'react'
import SearchLayout from '../SearchLayout'
import BasicTabs from '@/components/search/TapMenu'

import '../../../styles/search/search.scss'

const page = () => {
  return (
    <SearchLayout>
      <BasicTabs />
    </SearchLayout>
  )
}

export default page