'use client'

import React from 'react'

interface PageTitleProps {
  text: string
  className?: string
}

const PageTitle: React.FC<PageTitleProps> = ({ text, className = '' }) => {
  return <div className={`title ${className}`}>{text}</div>
}

export default PageTitle
