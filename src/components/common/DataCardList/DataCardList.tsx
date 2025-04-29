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
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useSnackbar } from '../../context/SnackbarContext';
import './DataCardList.css';
import DataAlertDialog from '../DataAlertDialog/DataAlertDialog';
import ChartFormData from '../../../interfaces/ChartFormData';
import { RootState } from '../../../store/store';
import { setPage, setLimit, openDialog, closeDialog, resetSelected } from '../../../store/slices/dataSlice';

const API_BASE_URL = import.meta.env.VITE_REACT_APP_API_BASE_URL;

function DataCardList() {

    const dispatch = useDispatch();
    const { page, limit, dialogOpen, selectedProductName, selectedEntryId } = useSelector(
        (state: RootState) => state.data
    );

    const navigate = useNavigate();

    const { showSnackbar } = useSnackbar();

    const fetchCardsData = async (page: number, limit: number) => {
        const response = await axios.get(`${API_BASE_URL}/api/form/fetch-form-data?page=${page}&limit=${limit}`);
        return response.data;
    };

    const { data, error, isFetching } = useQuery<{totalDocuments: number, totalPages: number, currentPage: number, data: ChartFormData[]}>({
        queryKey: ['cardsData', page, limit],
        queryFn: () => fetchCardsData(page, limit),
        staleTime: 5000, // Keeps data fresh for 5 seconds
    });

    const handlePageChange = (_event: React.ChangeEvent<unknown>, value: number) => {
        dispatch(setPage(value));
    };

    const handleLimitChange = (event: SelectChangeEvent) => {
        dispatch(setLimit(Number(event.target.value)));
    };

    const handleEditClick = (id: string) => {
        navigate(`/edit-form?id=${id}`);
    };

    const handleDeleteClick = (cardData: ChartFormData) => {
        dispatch(openDialog({ productName: cardData.productName, entryId: cardData._id }));
    };

    const handleDialogRes = async (res: boolean) => {
        dispatch(closeDialog());
        if (res && selectedEntryId) {
            try {
                await axios.delete(`${API_BASE_URL}/api/form/delete-form-data/${selectedEntryId}`);
                console.log(`Entry with ID ${selectedEntryId} deleted successfully`);
                dispatch(setPage(1)); // Reset to the first page
                showSnackbar('Entry deleted successfully!');
            } catch (error) {
                console.error('Error deleting entry:', error);
            }
        } else {
            console.log('Delete action cancelled');
        }
        dispatch(resetSelected());
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
                onDialogOpen={() => dispatch({ type: 'OPEN_DIALOG', payload: { productName: '', entryId: '' } })}
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
