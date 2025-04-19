import * as React from 'react';
import Box from '@mui/material/Box';
import Fab from '@mui/material/Fab';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { BrowserRouter as Router, Navigate, Route, Routes } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import PageHeader from './components/shell/PageHeader/PageHeader';
import PageFooter from './components/shell/PageFooter/PageFooter';
import HomePage from './components/pages/HomePage/HomePage';
import AboutMePage from './components/pages/AboutMePage/AboutMePage';
import DataEntryFormPage from './components/pages/DataEntryFormPage/DataEntryFormPage';
import DataEditFormPage from './components/pages/DataEditEditFormPage/DataEditFormPage';
import BarChartPage from './components/pages/BarChartPage/BarChartPage';
import LineChartPage from './components/pages/LineChartPage/LineChartPage';
import PieChartPage from './components/pages/PieChartPage/PieChartPage';
import NotFoundPage from './components/pages/NotFoundPage/NotFoundPage';
import ScrollTop from './components/common/ScrollTop/ScrollTop';
import './App.css';

interface Props {
  window?: () => Window;
  children?: React.ReactElement<unknown>;
}

const queryClient = new QueryClient();

function App(props: Props) {

  return (
    <React.Fragment>
      <QueryClientProvider client={queryClient}>
        <Router>
          <PageHeader />
          <Box sx={{ maxWidth: '100%', height: '100vh', m: 5 }}>
            <Routes>
              {/* Define your routes here */}
              <Route path="/home" element={<HomePage />} />
              <Route path='/' element={<Navigate to="/home" />} />
              <Route path="/about-me" element={<AboutMePage />} />
              <Route path="/form" element={<DataEntryFormPage />} />
              <Route path="/edit-form" element={<DataEditFormPage />} />
              <Route path="/bar-chart" element={<BarChartPage />} />
              <Route path="/line-chart" element={<LineChartPage />} />
              <Route path="/pie-chart" element={<PieChartPage />} />
              <Route path="/not-found" element={<NotFoundPage />} />
              <Route path="*" element={<Navigate to="/notfound" />} />
            </Routes>
          </Box>
          <PageFooter />
        </Router>
      </QueryClientProvider>
      <ScrollTop {...props}>
        <Fab size="small" aria-label="scroll back to top">
          <KeyboardArrowUpIcon />
        </Fab>
      </ScrollTop>
    </React.Fragment>
  )
}

export default App
