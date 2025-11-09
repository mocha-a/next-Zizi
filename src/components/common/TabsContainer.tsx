// components/common/TabsContainer.tsx
'use client'; // Next.js에서 클라이언트 컴포넌트로 사용

import * as React from 'react';
import { styled } from '@mui/material/styles';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';

// tab 데이터 타입
interface TabItem {
  label: string;
  content: React.ReactNode; // 렌더링 가능한 모든 요소
}

// TabsContainer props 데이터 타입
interface TabsContainerProps {
  tabs: TabItem[]; // 탭 목록
  tabValue: number; // 선택된 탭 index
  setTabValue: (value: number) => void; // 탭 변경 함수
}

// 각 탭 패널 컴포넌트
function CustomTabPanel({
  children,
  value,
  index,
}: {
  children?: React.ReactNode;
  value: number;
  index: number;
}) {
  return (
    <div
      role="tabpanel"
      hidden={value !== index} // 현재 선택된 탭만 표시
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
    >
      {value === index && (
        <Box
          sx={{
            paddingTop: '20px',
            fontFamily: 'GmarketMedium',
            fontSize: '13px',
            color: '#1A1A1A',
          }}
        >
          {children} {/* 실제 탭 내용 렌더링 */}
        </Box>
      )}
    </div>
  );
}

const CustomTab = styled(Tab)({
  marginRight: '20px',
  fontSize: '13px',
  fontFamily: 'GmarketMedium',
  color: '#D9D9D9',
  '&.Mui-selected': {
    color: '#1A1A1A',
  },
});

// TabsContainer 컴포넌트
export default function TabsContainer({
  tabs,
  tabValue,
  setTabValue,
}: TabsContainerProps) {
  // 탭 클릭 시 호출되는 함수
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Box
        sx={{
          borderBottom: 1,
          borderColor: '#D9D9D9',
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        <Tabs
          value={tabValue} // 선택된 탭
          onChange={handleChange} // 탭 변경 이벤트
          aria-label="custom tabs"
          sx={{
            minHeight: 'auto',
            '& .MuiTab-root': {
              padding: '7px 8px',
              minHeight: 'auto',
            },
            '& .MuiTabs-indicator': {
              backgroundColor: '#058CD7', // 선택된 탭 밑줄 색
            },
          }}
        >
          {tabs.map((tab, index) => (
            <CustomTab
              key={index}
              label={tab.label}
              sx={{ minWidth: 'auto', px: 1 }}
            />
          ))}
        </Tabs>
      </Box>

      {/* 각 탭 패널 렌더링 */}
      {tabs.map((tab, index) => (
        <CustomTabPanel key={index} value={tabValue} index={index}>
          {tab.content} {/* 탭 내용 */}
        </CustomTabPanel>
      ))}
    </Box>
  );
}
