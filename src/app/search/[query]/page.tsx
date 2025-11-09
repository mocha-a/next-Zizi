"use client"

import React from 'react'
import SearchLayout from '../SearchLayout'
import SearchTabs from '@/components/search/SearchTab'

import '../../../styles/search/search.scss'

const page = () => {
  return (
    <SearchLayout>
      <SearchTabs />
    </SearchLayout>
  )
}

export default page