import React from 'react';
import Back from '../icons/Back';

// interface DetailHeaderProps {
//   liked: boolean
//   onToggleLike: () => void
// }

const DetailHeader = (/* {
  liked,
  onToggleLike,
}: DetailHeaderProps */) => {

  return (
    <div className="detailHeader">
      {/* 뒤로가기 */}
      <Back />

      {/* 오른쪽 액션 */}
      {/* <button onClick={onToggleLike}>
        {liked ? <HeartFill /> : <Heart />}
      </button> */}
    </div>
  )
}


export default DetailHeader