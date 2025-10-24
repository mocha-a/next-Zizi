import 'swiper/css'; // 기본 스타일

function Mood() {
    const tags = [
      '여름',
      '운동',
      '드라이브',
      '스트레스',
      '출퇴근',
      '추억소환',
      '집중할때',
      '비오는날',
    ];

  return (
    <div className="mood-container">
      <span>today is...</span>
      <b>{tags[0]}</b>
    </div>
  )
}

export default Mood