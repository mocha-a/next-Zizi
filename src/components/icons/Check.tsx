interface Props {
  color?: string;
}

function Check({ color = '#1A1A1A' }: Props) {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" >
      <path d="M19 8L11 16L5 10.5" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default Check;