import * as React from 'react';
import Box from '@mui/material/Box';
import { BrowserRouter as Router, Navigate, Route, Routes } from 'react-router-dom';
import PageHeader from './components/shell/PageHeader/PageHeader';
import PageFooter from './components/shell/PageFooter/PageFooter';
import HomePage from './components/pages/HomePage/HomePage';
import AboutMePage from './components/pages/AboutMePage/AboutMePage';
import FormPage from './components/pages/FormPage/FormPage';
import BarChartPage from './components/pages/BarChartPage/BarChartPage';
import LineChartPage from './components/pages/LineChartPage/LineChartPage';
import PieChartPage from './components/pages/PieChartPage/PieChartPage';
import NotFoundPage from './components/pages/NotFoundPage/NotFoundPage';
import './App.css';

function App() {

  return (
    <React.Fragment>
      <PageHeader />
      <Box sx={{ width: '100%', height: '100vh', m: 5 }}>
        <Router>
          <Routes>
            {/* Define your routes here */}
            <Route path="/home" element={<HomePage />} />
            <Route path='/' element={<Navigate to="/home" />} />
            <Route path="/about-me" element={<AboutMePage />} />
            <Route path="/form" element={<FormPage />} />
            <Route path="/bar-chart" element={<BarChartPage />} />
            <Route path="/line-chart" element={<LineChartPage />} />
            <Route path="/pie-chart" element={<PieChartPage />} />
            <Route path="/not-found" element={<NotFoundPage />} />
            <Route path="*" element={<Navigate to="/notfound" />} />
          </Routes>
        </Router>
      </Box>
      <PageFooter />
    </React.Fragment>
  )
}

export default App
