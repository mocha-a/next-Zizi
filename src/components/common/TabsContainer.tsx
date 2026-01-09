'use client';

import * as React from 'react';
import { styled } from '@mui/material/styles';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import { useSearchStore } from '@/store/searchStore';

// tab 데이터 타입
interface TabItem {
  label: string;
  type?: string;
  content: React.ReactNode;
}

// TabsContainer props 데이터 타입
interface TabsContainerProps {
  tabs: TabItem[];
  tabValue: number;
  tabMarginRight?: string;
  fullWidth?: boolean;
  width?: boolean;
  setTabValue: (value: number) => void;
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
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
    >
      {value === index && (
        <Box
          sx={{
            paddingTop: '10px',
            fontFamily: 'GmarketMedium',
            fontSize: '13px',
            color: '#1A1A1A',
          }}
        >
          {children}
        </Box>
      )}
    </div>
  );
}

interface CustomTabProps {
  mr?: string;
}

// ✅ any 제거된 CustomTab
const CustomTab = styled(Tab)<CustomTabProps>(({ mr }) => ({
  marginRight: mr || '0px',
  fontSize: '13px',
  fontFamily: 'GmarketMedium',
  color: '#D9D9D9',
  '&.Mui-selected': {
    color: '#1A1A1A',
  },
}));

// TabsContainer 컴포넌트
export default function TabsContainer({
  tabs,
  tabValue,
  setTabValue,
  fullWidth,
  tabMarginRight = '0px',
  width = false,
}: TabsContainerProps) {
  const { searchQuery, allSearchResults } = useSearchStore();

  const handleChange = async (
    _event: React.SyntheticEvent,
    newValue: number
  ) => {
    setTabValue(newValue);
    const type = tabs[newValue].type;

    if (type && searchQuery) {
      await allSearchResults(searchQuery);
    }
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
          value={tabValue}
          onChange={handleChange}
          aria-label="custom tabs"
          variant={fullWidth ? 'fullWidth' : 'standard'}
          sx={{
            width: width ? '100%' : undefined,
            minHeight: 'auto',
            '& .MuiTab-root': {
              padding: '7px 8px',
              minHeight: 'auto',
            },
            '& .MuiTabs-indicator': {
              backgroundColor: '#058CD7',
            },
            '& .MuiTabs-flexContainer': {
              justifyContent: 'space-between',
            },
          }}
        >
          {tabs.map((tab, index) => (
            <CustomTab
              key={index}
              label={tab.label}
              mr={tabMarginRight}
              sx={{ minWidth: 'auto', px: 1 }}
            />
          ))}
        </Tabs>
      </Box>

      {tabs.map((tab, index) => (
        <CustomTabPanel key={index} value={tabValue} index={index}>
          {tab.content}
        </CustomTabPanel>
      ))}
    </Box>
  );
}