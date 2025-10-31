import 'swiper/css'; // 기본 스타일

function Mood() {
    const moodData = [
      {
        tag: '여름',
        icon: '🌈'
      },
      {
        tag: '운동',
        icon: '⚽'
      },
      {
        tag: '드라이브',
        icon: '🚗'
      },
      {
        tag: '스트레스',
        icon: '💥'
      },
      {
        tag: '출퇴근',
        icon: '💼'
      },
      {
        tag: '추억소환',
        icon: '📹'
      },
      {
        tag: '집중할때',
        icon: '👓'
      },
      {
        tag: '비오는날',
        icon: '☔'
      }
    ];

  return (
    <div className="mood-container">
      <span>today is...</span>
      <span>{moodData[0].icon}</span>
      <b>{moodData[0].tag}</b>
    </div>
  )
}

export default Mood