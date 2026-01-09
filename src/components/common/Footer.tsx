import React from 'react'
import Git from '../icons/Git'
import Figma from '../icons/Figma'

function Footer() {
  return (
    <div className='footer-container'>
        <div className='footer-icons'>
            <Git className='icons-git'/>
            <Figma className='icons-figma'/>
        </div>
        <p>사업자정보 | 개인정보처리방침</p>
        <span>© 2026 Zizi! - All beats reserved 💿...</span>
    </div>
  )
}

export default Footer