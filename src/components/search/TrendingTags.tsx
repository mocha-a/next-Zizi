import React from 'react'
import TagBtn from '../common/TagBtn'

const TrendingTags = () => {
  const tag = [
    "편안한",
    "파티",
    "운동",
    "집중할때",
    "휴식",
    "여름",
    "사랑",
    "비오는 날",
    "추억여행",
    "분위기",
    "리듬",
    "드라이브"
  ]

  return (
    <div className='trendingTags-contanier'>
      <h3>핫한_분위기.zip</h3>
      <ul className='tag-ul'>
        {tag.map((item, i)=>
          <li key={i} className='trending-tag'>
            <div><TagBtn tagbtn={item}/></div>
          </li>
        )}
      </ul>
    </div>
  )
}

export default TrendingTags