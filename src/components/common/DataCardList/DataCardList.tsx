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
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useSnackbar } from '../../context/SnackbarContext';
import './DataCardList.css';
import DataAlertDialog from '../DataAlertDialog/DataAlertDialog';
import ChartFormData from '../../../interfaces/ChartFormData';

const initialState = {
    page: 1,
    limit: 10,
    dialogOpen: false,
    selectedProductName: '',
    selectedEntryId: null as string | null,
};

type Action =
    | { type: 'SET_PAGE'; payload: number }
    | { type: 'SET_LIMIT'; payload: number }
    | { type: 'OPEN_DIALOG'; payload: { productName: string; entryId: string } }
    | { type: 'CLOSE_DIALOG' }
    | { type: 'RESET_SELECTED' };

const reducer = (state: typeof initialState, action: Action) => {
    switch (action.type) {
        case 'SET_PAGE':
            return { ...state, page: action.payload };
        case 'SET_LIMIT':
            return { ...state, limit: action.payload, page: 1 }; // Reset to the first page
        case 'OPEN_DIALOG':
            return {
                ...state,
                dialogOpen: true,
                selectedProductName: action.payload.productName,
                selectedEntryId: action.payload.entryId,
            };
        case 'CLOSE_DIALOG':
            return { ...state, dialogOpen: false };
        case 'RESET_SELECTED':
            return { ...state, selectedProductName: '', selectedEntryId: null };
        default:
            return state;
    }
};

function DataCardList() {
    
    const [state, dispatch] = React.useReducer(reducer, initialState);

    const navigate = useNavigate();

    const { showSnackbar } = useSnackbar();

    const fetchCardsData = async (page: number, limit: number) => {
        const response = await axios.get(`http://localhost:5000/api/form/fetch-form-data?page=${page}&limit=${limit}`);
        return response.data;
    };

    const { data, error, isFetching } = useQuery<{totalDocuments: number, totalPages: number, currentPage: number, data: ChartFormData[]}>({
        queryKey: ['cardsData', state.page, state.limit],
        queryFn: () => fetchCardsData(state.page, state.limit),
        staleTime: 5000, // Keeps data fresh for 5 seconds
    });

    const handlePageChange = (_event: React.ChangeEvent<unknown>, value: number) => {
        dispatch({ type: 'SET_PAGE', payload: value });
    };

    const handleLimitChange = (event: SelectChangeEvent) => {
        dispatch({ type: 'SET_LIMIT', payload: Number(event.target.value) });
    };

    const handleEditClick = (id: string) => {
        navigate(`/edit-form?id=${id}`);
    };

    const handleDeleteClick = (cardData: ChartFormData) => {
        dispatch({
            type: 'OPEN_DIALOG',
            payload: { productName: cardData.productName, entryId: cardData._id },
        });
    };

    const handleDialogRes = async (res: boolean) => {
        dispatch({ type: 'CLOSE_DIALOG' });
        if (res && state.selectedEntryId) {
            try {
                await axios.delete(`http://localhost:5000/api/form/delete-form-data/${state.selectedEntryId}`);
                console.log(`Entry with ID ${state.selectedEntryId} deleted successfully`);
                dispatch({ type: 'SET_PAGE', payload: 1 }); // Reset to the first page
                showSnackbar('Entry deleted successfully!');
            } catch (error) {
                console.error('Error deleting entry:', error);
            }
        } else {
            console.log('Delete action cancelled');
        }
        dispatch({ type: 'RESET_SELECTED' });
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
                        value={state.limit.toString()}
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
                    page={state.page}
                    onChange={handlePageChange}
                    color='primary'
                />
            </Box>
            <DataAlertDialog
                dialogOpen={state.dialogOpen}
                onDialogOpen={() => dispatch({ type: 'OPEN_DIALOG', payload: { productName: '', entryId: '' } })}
                onDialogRes={(res) => handleDialogRes(res)}
                dialogTitle='Delete Entry'
                dialogAgreeLabel='Delete'
                dialogDisagreeLabel='Cancel'
            >
                {state.selectedProductName
                    ? `Are you sure you want to delete the entry for "${state.selectedProductName}"?`
                    : 'Are you sure you want to delete this entry?'}
            </DataAlertDialog>
        </React.Fragment>
    );
}

export default DataCardList;
