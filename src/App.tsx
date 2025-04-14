import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { BrowserRouter as Router, Navigate, Route, Routes } from 'react-router-dom';
import PageHeader from './components/shell/PageHeader/PageHeader';
import PageFooter from './components/shell/PageFooter/PageFooter';
import './App.css'

function App() {

  return (
    <React.Fragment>
      <PageHeader />
      <Box sx={{ width: '100%', height: '100vh', m: 20}}>
        <Router>
          <Routes>
            {/* Define your routes here */}
            <Route path="/home" element={<Typography variant='h4'>Home Page</Typography>} />
            <Route path='/' element={<Navigate to="/home" />} />
            <Route path="/about-me" element={<Typography variant='h4'>About Page</Typography>} />
            <Route path="/form" element={<Typography variant='h4'>Data Entry Form</Typography>} />
            <Route path="/bar-chart" element={<Typography variant='h4'>Bar Chart</Typography>} />
            <Route path="/line-chart" element={<Typography variant='h4'>Line Chart</Typography>} />
            <Route path="/pie-chart" element={<Typography variant='h4'>Pie Chart</Typography>} />
            <Route path="/not-found" element={<Typography variant='h4'>404 Not Found</Typography>} />
            <Route path="*" element={<Navigate to="/notfound" />} />
          </Routes>
        </Router>
      </Box>
      <PageFooter />
    </React.Fragment>
  )
}

export default App
