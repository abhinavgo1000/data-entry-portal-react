import * as React from 'react';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import { useLocation, useNavigate } from 'react-router-dom';
import './BreadCrumbNav.css';

function BreadCrumbNav() {

    const location = useLocation();
    const navigate = useNavigate();

    const pathnames = location.pathname.split('/').filter((x) => x);

    function handleClick(event: React.MouseEvent<HTMLAnchorElement, MouseEvent>, path: string) {
        event.preventDefault();
        navigate(path); // Navigate to the clicked breadcrumb path
    }

    const breadcrumbs = pathnames.map((value, index) => {
        const to = `/${pathnames.slice(0, index + 1).join('/')}`; // Construct the path for the breadcrumb

        return index === pathnames.length - 1 ? (
            // Current page (last breadcrumb) as plain text
            <Typography key={to} sx={{ color: 'text.primary' }}>
                {value.charAt(0).toUpperCase() + value.slice(1)} {/* Capitalize the breadcrumb */}
            </Typography>
        ) : (
            // Breadcrumb link for intermediate paths
            <Link
                underline="hover"
                key={to}
                color="inherit"
                href={to}
                onClick={(event) => handleClick(event, to)}
            >
                {value.charAt(0).toUpperCase() + value.slice(1)} {/* Capitalize the breadcrumb */}
            </Link>
        );
    });

    return (
        <Breadcrumbs
            separator={<NavigateNextIcon fontSize="small" />}
            aria-label="breadcrumb"
        >
            {/* Add a "Home" breadcrumb as the first link */}
            <Link
                underline="hover"
                color="inherit"
                href="/"
                onClick={(event) => handleClick(event, '/')}
            >
                Home
            </Link>
                {breadcrumbs}
        </Breadcrumbs>
    );
}

export default BreadCrumbNav;
