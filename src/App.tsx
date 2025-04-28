import * as React from 'react';
import Box from '@mui/material/Box';
import Fab from '@mui/material/Fab';
import Snackbar from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { BrowserRouter as Router, Navigate, Route, Routes } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import PageHeader from './components/shell/PageHeader/PageHeader';
import PageFooter from './components/shell/PageFooter/PageFooter';
import BreadCrumbNav from './components/common/BreadCrumbNav/BreadCrumbNav';
import ScrollTop from './components/common/ScrollTop/ScrollTop';
import { useSnackbar } from './components/context/SnackbarContext';
import './App.css';

interface Props {
    window?: () => Window;
    children?: React.ReactElement<unknown>;
}

const queryClient = new QueryClient();

const HomePage = React.lazy(() => import('./components/pages/HomePage/HomePage'));
const AboutMePage = React.lazy(() => import('./components/pages/AboutMePage/AboutMePage'));
const DataEntryFormPage = React.lazy(() => import('./components/pages/DataEntryFormPage/DataEntryFormPage'));
const DataEditFormPage = React.lazy(() => import('./components/pages/DataEditFormPage/DataEditFormPage'));
const BarChartPage = React.lazy(() => import('./components/pages/BarChartPage/BarChartPage'));
const LineChartPage = React.lazy(() => import('./components/pages/LineChartPage/LineChartPage'));
const PieChartPage = React.lazy(() => import('./components/pages/PieChartPage/PieChartPage'));
const NotFoundPage = React.lazy(() => import('./components/pages/NotFoundPage/NotFoundPage'));

function App(props: Props) {

    const { snackbarState, hideSnackbar } = useSnackbar();

    const action = (
            <React.Fragment>
                <IconButton
                    size="small"
                    aria-label="close"
                    color="inherit"
                    onClick={hideSnackbar}
                >
                    <CloseIcon fontSize="small" />
                </IconButton>
            </React.Fragment>
    );

    return (
        <React.Fragment>
            <QueryClientProvider client={queryClient}>
                <Router>
                    <PageHeader />
                    <Box sx={{ maxWidth: '100%', minHeight: '100vh', m: 5 }}>
                        <BreadCrumbNav />
                        <Routes>
                        {/* Define your routes here */}
                        <Route path='/home' element={<HomePage />} />
                        <Route path='/' element={<Navigate to='/home' />} />
                        <Route path='/about-me' element={<AboutMePage />} />
                        <Route path='/form' element={<DataEntryFormPage />} />
                        <Route path='/edit-form' element={<DataEditFormPage />} />
                        <Route path='/bar-chart' element={<BarChartPage />} />
                        <Route path='/line-chart' element={<LineChartPage />} />
                        <Route path='/pie-chart' element={<PieChartPage />} />
                        <Route path='/not-found' element={<NotFoundPage />} />
                        <Route path='*' element={<Navigate to='/notfound' />} />
                        </Routes>
                    </Box>
                    <PageFooter />
                </Router>
                <Snackbar
                    open={snackbarState.open}
                    autoHideDuration={3000}
                    onClose={hideSnackbar}
                    message='Form updated successfully!'
                    action={action} />
            </QueryClientProvider>
            <ScrollTop {...props}>
                <Fab size='small' aria-label='scroll back to top'>
                    <KeyboardArrowUpIcon />
                </Fab>
            </ScrollTop>
        </React.Fragment>
    )
}

export default App
