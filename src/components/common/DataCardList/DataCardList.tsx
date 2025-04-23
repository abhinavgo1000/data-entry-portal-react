import * as React from 'react';
import Pagination from '@mui/material/Pagination';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import { useNavigate } from 'react-router-dom';
import DataAlertDialog from '../DataAlertDialog/DataAlertDialog';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import './DataCardList.css';
import ChartFormData from '../../../interfaces/ChartFormData';

function DataCardList() {
    const [page, setPage] = React.useState(1);
    const [limit, setLimit] = React.useState(10); // Default limit is 10

    const [dialogOpen, setDialogOpen] = React.useState(false);
    const [selectedProductName, setSelectedProductName] = React.useState('');

    const navigate = useNavigate();

    const fetchCardsData = async (page: number, limit: number) => {
        const response = await axios.get(`http://localhost:5000/api/form/fetch-form-data?page=${page}&limit=${limit}`);
        return response.data;
    };

    const { data, error, isFetching } = useQuery<{totalDocuments: number, totalPages: number, currentPage: number, data: ChartFormData[]}>({
        queryKey: ['cardsData', page, limit],
        queryFn: () => fetchCardsData(page, limit),
        staleTime: 5000, // Keeps data fresh for 5 seconds
    });

    const handlePageChange = (_event: React.ChangeEvent<unknown>, value: number) => {
        setPage(value);
    };

    const handleLimitChange = (event: SelectChangeEvent) => {
        setLimit(Number(event.target.value));
        setPage(1); // Reset to the first page
    };

    const handleEditClick = (id: string) => {
        navigate(`/edit-form?id=${id}`);
    };

    const handleDeleteClick = (cardData: ChartFormData) => {
        setSelectedProductName(cardData.productName);
        setDialogOpen(true);
    };

    const handleDialogRes = (res: boolean) => {
        setDialogOpen(false);
        if (res) {
            console.log('Entry deleted');
        } else {
            console.log('Delete action cancelled');
        }
    };

    const formatDate = (date: string | Date) => {
        const d = new Date(date);
        const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'short', day: '2-digit' };
        return d.toLocaleDateString(undefined, options);
    };

    const formatTelephone = (telephone: string) => {
        const cleaned = ('' + telephone).replace(/\D/g, '');
        const match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);
        if (match) {
            return `(${match[1]}) ${match[2]}-${match[3]}`;
        }
        return telephone;
    };

    if (isFetching) {
        return <Typography>Loading...</Typography>;
    }

    if (error) {
        return <Typography>Error fetching data</Typography>;
    }

    return (
        <React.Fragment>
            <Box sx={{ display: 'flex', justifyContent: 'flex-end', marginBottom: 2 }}>
                <FormControl sx={{ minWidth: 120 }} size='small'>
                    <InputLabel id='item-per-page'>Entries per page</InputLabel>
                    <Select
                        labelId='demo-simple-select-label'
                        id='demo-simple-select'
                        value={limit.toString()}
                        label='Age'
                        onChange={handleLimitChange}
                    >
                        <MenuItem value={5}>5</MenuItem>
                        <MenuItem value={10}>10</MenuItem>
                        <MenuItem value={25}>25</MenuItem>
                    </Select>
                </FormControl>
            </Box>
            {data?.data.map((cardData) => (
                <Card key={cardData._id} variant='outlined' sx={{ marginBottom: 2 }}>
                    <CardContent>
                        <Typography variant='h5'>{cardData.productName}</Typography>
                        <Typography variant='subtitle1' color='text.secondary'>{cardData.productCategory}</Typography>
                        <Typography variant='body1'>Submitted By: {cardData.name}</Typography>
                        <Typography variant='body1'>Contact Number: {formatTelephone(cardData.telephone)}</Typography>
                        <Typography variant='body1'>Purchased on: {cardData.productPurchaseDate ? formatDate(cardData.productPurchaseDate) : 'N/A'}</Typography>
                        <Typography variant='body1'>Price: ${cardData.productPrice}</Typography>
                        <Typography variant='body1'>Model: {cardData.productModel}</Typography>
                    </CardContent>
                    <CardActions>
                        <Tooltip title='Edit Entry'>
                            <IconButton onClick={() => handleEditClick(cardData._id)} aria-label='edit button'>
                                <EditIcon />
                            </IconButton>
                        </Tooltip>
                        <Tooltip title='Delete Entry'>
                            <IconButton 
                                onClick={() => handleDeleteClick(cardData)} 
                                aria-label='delete button'
                            >
                                <DeleteOutlineIcon />
                            </IconButton>
                        </Tooltip>
                    </CardActions>
                </Card>
            ))}
            <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: 2 }}>
                <Pagination
                    count={data?.totalPages || 1}
                    page={page}
                    onChange={handlePageChange}
                    color='primary'
                />
            </Box>
            <DataAlertDialog
                dialogOpen={dialogOpen}
                onDialogOpen={() => setDialogOpen(true)}
                onDialogRes={(res) => handleDialogRes(res)}
                dialogTitle='Delete Entry'
                dialogAgreeLabel='Delete'
                dialogDisagreeLabel='Cancel'
            >
                {selectedProductName
                    ? `Are you sure you want to delete the entry for "${selectedProductName}"?`
                    : 'Are you sure you want to delete this entry?'}
            </DataAlertDialog>
        </React.Fragment>
    );
}

export default DataCardList;
