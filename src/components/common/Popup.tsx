import '@/styles/common/popup.scss';

interface Props {
  showPopup: boolean;
  setShowPopup: React.Dispatch<React.SetStateAction<boolean>>;
  type: 'login' | 'delete' | 'logout' | 'exit';
  onConfirm?: () => void;
  onCancel?: () => void;
  className?: string;
}

interface PopupContent {
  txt: string;
  subtxt?: string;
  btntxt1: string;
  btntxt2: string;
  icon: React.ReactNode;
}

function Popup({ showPopup, setShowPopup, type, onConfirm, onCancel, className='' }: Props) {

  // type별 팝업 내용
   const popupContent: Record< Props['type'], PopupContent > = {
    login: {
      txt: `로그인하고 나만의 플리 만들기 - ! `,
      btntxt1: 'CANCEL',
      btntxt2: 'O K',
      icon: '🔓'
    },
    delete: {
      txt: '정말 삭제하시겠습니까?',
      btntxt1: '아니오',
      btntxt2: '예',
      icon: '⚠️'
    },
    logout: {
      txt: '정말 로그아웃하시겠습니까?',
      btntxt1: '아니오',
      btntxt2: '예',
      icon: '⚠️'
    },
    exit: {
      txt: '작성중인 내용이 있습니다. 나가시겠습니까?',
      subtxt: '변경사항은 저장되지 않습니다.',
      btntxt1: '아니오',
      btntxt2: '예',
      icon: '⚠️'
    }
  }

  // 팝업 배경 클릭 시 팝업 닫힘
  function closePopup(e: React.MouseEvent<HTMLDivElement>) {
    const target = e.target as HTMLElement;

    if(target.classList.contains('popup-box')) {
      setShowPopup(false);
    }
  }

  // 팝업이 닫혀있으면 랜더링 하지 않음.
  if (!showPopup) return null;

  return (
    <div className={className ? className : 'popup-box'} onClick={closePopup}>
      <div className='popup'>

        <div className='popup-cont'>
          <p className='popup-icon'>{popupContent[type]?.icon}</p>
          <p>
            {popupContent[type]?.txt}
            <span>{popupContent[type]?.subtxt}</span>
          </p>
        </div>

        <div className='popup-btns-box'>
          <button 
            className='btn2popup-btn' 
            onClick={() => {
              setShowPopup(false);
              if (onCancel) onCancel();
            }}>
            {popupContent[type]?.btntxt1}
          </button>
          <button
            className='btn1popup-btn'
            onClick={() => {
              if (onConfirm) onConfirm(); // callback 실행
          }}>
            {popupContent[type]?.btntxt2}
          </button>
        </div>

      </div>
    </div>
  )
}

export default Popup