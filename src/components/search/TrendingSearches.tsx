import React from 'react'

const TrendingSearches = () => {
  const top = [
    "케이팝 데몬 헌티스 OST",
    "여름이었다",
    "에스파",
    "싸이",
    "데이식스",
    "시작의 아이",
    "아이유",
    "케이팝 데몬 헌티스 OST",
    "여름이었다",
    "에스파"
  ]

  return (
    <div className='TrendingSearches-contanier'>
      <h3>인기 검색어 top 10.exe</h3>
      <ul>
        {top.map((item, i)=>
        <li key={i} className='trending'>
            <b className='num'>{1 + i}</b>
            <span>{item}</span>
        </li>
        )}
      </ul>
    </div>
  )
}

export default TrendingSearches