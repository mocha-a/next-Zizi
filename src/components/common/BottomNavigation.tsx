'use client';

import * as React from 'react';
import { useRouter } from 'next/navigation';
import Box from '@mui/material/Box';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import HomeOn from '../icons/HomeOn';
import HomeOff from '../icons/HomeOff';
import ChartOn from '../icons/ChartOn';
import ChartOff from '../icons/ChartOff';
import SearchOn from '../icons/SearchOn';
import SearchOff from '../icons/SearchOff';
import MypageOn from '../icons/MypageOn';
import MypageOff from '../icons/MypageOff';

export default function SimpleBottomNavigation() {
  const [ value, setValue ] = React.useState(0);
  const router = useRouter();

  const click = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);

    switch (newValue) {
      case 0:
        router.push('/');
        break;
      case 1:
        router.push('/chart');
        break;
      case 2:
        router.push('/search');
        break;
      case 3:
        router.push('/mypage');
        break;
      default:
        break;
    }
  };

  return (
    <Box sx={{
      position: 'fixed',
      bottom: 0,
      left: '50%',
      transform: 'translateX(-50%)',
      width: '390px',
      boxShadow: '0 -4px 8px rgba(5, 140, 215, 0.2)',
      zIndex: 100, // 필요 시 다른 요소보다 위로
    }}>
      <BottomNavigation
        showLabels
        value={value}
        onChange={click}
        sx={{
            '& .MuiBottomNavigationAction-label': {
            fontFamily: 'GmarketSans, sans-serif',
            fontSize: '10px',
            color: 'rgba(5, 140, 215, 0.5)',              // 선택 안 됐을 때 글자색
            },
            '& .Mui-selected .MuiBottomNavigationAction-label': {
            fontSize: '11px',
            color: 'rgba(5, 140, 215, 1)',              // 선택됐을 때 글자색
            },
        }}
      >
        <BottomNavigationAction
        label="홈"
        icon={value === 0 ? <HomeOn /> : <HomeOff />}
        />
        <BottomNavigationAction
        label="차트"
        icon={value === 1 ? <ChartOn /> : <ChartOff />}
        />
        <BottomNavigationAction
        label="검색"
        icon={value === 2 ? <SearchOn /> : <SearchOff />}
        />
        <BottomNavigationAction
        label="내 Zizi"
        icon={value === 3 ? <MypageOn /> : <MypageOff />}
        />
      </BottomNavigation>
    </Box>
  );
}