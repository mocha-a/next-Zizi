interface Props{
  color?: string;
}

function Plus({ color = '#1A1A1A' }: Props) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="24" height="24">
      <line x1="20" y1="50" x2="80" y2="50" stroke={color} stroke-width="6" stroke-linecap="round"/>
      <line x1="50" y1="20" x2="50" y2="80" stroke={color} stroke-width="6" stroke-linecap="round"/>
    </svg>
  )
}

export default Plus