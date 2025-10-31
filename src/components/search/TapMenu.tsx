import * as React from 'react';
import { styled } from '@mui/material/styles';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';

import AllResults from './results/AllResults';
import Tracks from './results/Tracks';
import Artists from './results/Artists';
import Albums from './results/Albums';
import Playlists from './results/Playlists';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ paddingTop: '10px', fontFamily: 'GmarketMedium', fontSize: '14px', color: '#1A1A1A' }}>{children}</Box>}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const CustomTab = styled(Tab)({
  marginRight:'20px',
  fontSize: '13px',
  fontFamily: 'GmarketMedium',
  color: '#D9D9D9', // 기본 글자색
  '&.Mui-selected': {
    color: '#1A1A1A', // 선택된 글자색
  },
});

export default function BasicTabs() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: '#D9D9D9', display: 'flex', justifyContent: 'center' }}>
        <Tabs 
          value={value} 
          onChange={handleChange} 
          aria-label="basic tabs example"
          sx={{
            minHeight: 'auto',
            '& .MuiTab-root': {
              padding: '7px 8px',
              minHeight: 'auto',
            },
            '& .MuiTabs-indicator': {
              backgroundColor: '#058CD7', // 밑줄 색상
            },
          }}
        >
          <CustomTab label="전체" {...a11yProps(0)} sx={{ minWidth: 'auto', px: 1 }} />
          <CustomTab label="곡" {...a11yProps(1)} sx={{ minWidth: 'auto', px: 1 }} />
          <CustomTab label="아티스트" {...a11yProps(2)} sx={{ minWidth: 'auto', px: 1 }} />
          <CustomTab label="앨범" {...a11yProps(3)} sx={{ minWidth: 'auto', px: 1 }} />
          <CustomTab label="플레이리스트" {...a11yProps(4)} sx={{ minWidth: 'auto', px: 1 }} />
        </Tabs>
      </Box>
      <CustomTabPanel value={value} index={0}>
        <AllResults />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        <Tracks />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={2}>
        <Artists />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={3}>
        <Albums />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={4}>
        <Playlists />
      </CustomTabPanel>
    </Box>
  );
}