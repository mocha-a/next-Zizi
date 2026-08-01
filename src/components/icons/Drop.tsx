function Drop({ className }: { className?: string }) {
  return (
    <svg width="9" height="7" viewBox="0 0 9 7" fill="none" xmlns="http://www.w3.org/2000/svg" className={`${className} drop`}>
      <path d="M8 0.999993L4.52479 5.48608L1 0.999993" fill="#1A1A1A"/>
      <path d="M8 0.999993L4.52479 5.48608L1 0.999993H8Z" stroke="#1A1A1A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

export default Drop;