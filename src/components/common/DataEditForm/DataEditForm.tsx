import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import Button from '@mui/material/Button';
import dayjs from 'dayjs';
import { useMutation } from '@tanstack/react-query';
import { useNavigate, useSearchParams } from 'react-router-dom';
import axios from 'axios'; 
import { useSnackbar } from '../../context/SnackbarContext';
import './DataEditForm.css';

const initialState = {
    name: '',
    telephone: '',
    dateOfBirth: dayjs(''),
    email: '',
    address: '',
    city: '',
    state: '',
    zip: '',
    country: '',
    productName: '',
    productType: '',
    productCategory: '',
    productBrand: '',
    productPrice: 0,
    productModel: '',
    productPurchaseDate: dayjs(''),
    errors: {
        name: false,
        telephone: false,
        email: false,
        dateOfBirth: false,
        address: false,
        city: false,
        state: false,
        zip: false,
        country: false,
        productName: false,
        productType: false,
        productCategory: false,
        productBrand: false,
        productPrice: false,
        productModel: false,
        productPurchaseDate: false,
    }
};

type Action =
    | { type: 'SET_FIELD'; field: keyof typeof initialState; value: string | number | dayjs.Dayjs | boolean | null }
    | { type: 'SET_ERROR'; field: string; value: boolean }
    | { type: 'SET_FORM_VALID'; value: boolean }
    | { type: 'RESET_FORM' }
    | { type: 'POPULATE_FORM'; payload: typeof initialState };

const reducer = (state: typeof initialState, action: Action) => {
    switch (action.type) {
        case 'SET_FIELD':
            return { ...state, [action.field]: action.value };
        case 'SET_ERROR':
            return { ...state, errors: { ...state.errors, [action.field]: action.value } };
        case 'SET_FORM_VALID':
            return { ...state, formValid: action.value };
        case 'RESET_FORM':
            return initialState;
        case 'POPULATE_FORM':
            return { ...state, ...action.payload };
        default:
            return state;
    }
};

function DataEditForm() {
    
    const [state, dispatch] = React.useReducer(reducer, initialState);

    const navigate = useNavigate();

    const [searchParams] = useSearchParams();
    const id = searchParams.get('id'); // Capture the ID from the URL query param

    const { showSnackbar } = useSnackbar();

     // Fetch data by ID and populate the form fields
     React.useEffect(() => {
        if (id) {
            const fetchDataById = async () => {
                try {
                    const response = await axios.get(`http://localhost:5000/api/form/fetch-form-data/${id}`);
                    const data = response.data;

                    // Populate the form fields with the fetched data
                    dispatch({ type: 'POPULATE_FORM', payload: { ...data, dateOfBirth: dayjs(data.dateOfBirth), productPurchaseDate: dayjs(data.productPurchaseDate) } });
                } catch (error) {
                    console.error('Error fetching data by ID:', error);
                }
            };

            fetchDataById();
        }
    }, [id]);

    const mutation = useMutation({
        mutationFn: (updatedData: {
            _id: string | null;
            name: string;
            email: string;
            telephone: string;
            dateOfBirth: Date | null;
            address: string;
            city: string;
            state: string;
            zip: string;
            country: string;
            productName: string;
            productType: string;
            productCategory: string;
            productBrand: string;
            productPrice: number;
            productModel: string;
            productPurchaseDate: Date | null;
        }) => {
            return axios.put(`http://localhost:5000/api/form/update-form-data/${updatedData._id}`, updatedData);
        },
        onSuccess: (data) => {
            console.log('Form updated successfully:', data);
        },
        onError: (error) => {
            console.error('Error updating form:', error);
        }
    });

    const handleUpdate = () => {
        const updatedData = {
            _id: id,
            name: state.name,
            telephone: state.telephone,
            dateOfBirth: state.dateOfBirth ? state.dateOfBirth.toDate() : null,
            email: state.email,
            address: state.address,
            city: state.city,
            state: state.state,
            zip: state.zip,
            country: state.country,
            productName: state.productName,
            productType: state.productType,
            productCategory: state.productCategory,
            productBrand: state.productBrand,
            productPrice: state.productPrice,
            productModel: state.productModel,
            productPurchaseDate: state.productPurchaseDate ? state.productPurchaseDate.toDate() : null,
        };
        if (id) {
            mutation.mutate(updatedData, {
                onSuccess: () => {
                    showSnackbar('Form updated successfully!'); // Show success message
                    dispatch({ type: 'RESET_FORM' }); // Reset the form
                    navigate('/home'); // Redirect to the home page after submission
                },
                onError: (error) => {
                    console.error('Error submitting form:', error);
                },
            });
        } else {
            console.error('Error: ID is null');
        }
    };
    
    {/* Check if the form is valid */}
    const isFormValid = React.useMemo(() => {
        return Object.values(state).every((value) => value !== '' && value !== null);
    }, [state]);

    {/* Define the change handlers for each input field */}

    const handleChange = (field: keyof typeof initialState, value: string | number | dayjs.Dayjs | null) => {
        dispatch({ type: 'SET_FIELD', field, value });
        dispatch({ type: 'SET_ERROR', field, value: value === '' });
    };

    return (
        <React.Fragment>
            <Box
                component='form'
                sx={{ mt: 4, mb: 4 }}
                noValidate = {false}
                autoComplete='off'
            >
                <TextField
                    label='Name'
                    sx={{ mb: 4 }}
                    value={state.name}
                    required
                    variant='filled'
                    fullWidth
                    onChange={(e) => handleChange('name', e.target.value)}
                    error={state.errors.name}
                    helperText={state.errors.name ? 'Please enter the correct name' : ''} />
                <TextField
                    label='Telephone'
                    sx={{ mb: 4 }}
                    value={state.telephone}
                    required
                    variant='filled'
                    fullWidth
                    onChange={(e) => handleChange('telephone', e.target.value)}
                    error={state.errors.telephone}
                    helperText={state.errors.telephone ? 'Please enter the correct name' : ''} />
                <TextField
                    label='Email'
                    sx={{ mb: 4 }}
                    value={state.email}
                    required
                    variant='filled'
                    fullWidth
                    onChange={(e) => handleChange('email', e.target.value)}
                    error={state.errors.email}
                    helperText={state.errors.email ? 'Please enter the correct email' : ''} />
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                        label='Date of Birth'
                        value={state.dateOfBirth}
                        slotProps={{ 
                            textField: { 
                                variant: 'filled', 
                                fullWidth: true, 
                                required: true,
                                error: state.errors.dateOfBirth,
                                helperText: state.errors.dateOfBirth ? 'Please enter the correct date of birth' : '' 
                            } }}
                        sx={{ mb: 4 }}
                        onChange={(newValue) => handleChange('dateOfBirth', newValue)} />
                </LocalizationProvider>
                <TextField
                    label='Address'
                    sx={{ mb: 4 }}
                    value={state.address}
                    required
                    variant='filled'
                    fullWidth
                    onChange={(e) => handleChange('address', e.target.value)}
                    error={state.errors.address}
                    helperText={state.errors.address ? 'Please enter the correct address' : ''} />
                <TextField
                    label='City'
                    sx={{ mb: 4 }}
                    value={state.city}
                    required
                    variant='filled'
                    fullWidth
                    onChange={(e) => handleChange('city', e.target.value)}
                    error={state.errors.city}
                    helperText={state.errors.city ? 'Please enter the correct city' : ''} />
                <TextField
                    label='State'
                    sx={{ mb: 4 }}
                    value={state.state}
                    required
                    variant='filled'
                    fullWidth
                    onChange={(e) => handleChange('state', e.target.value)}
                    error={state.errors.state}
                    helperText={state.errors.state ? 'Please enter the correct state' : ''} />
                <TextField
                    label='Zip'
                    sx={{ mb: 4 }}
                    value={state.zip}
                    required
                    variant='filled'
                    fullWidth
                    onChange={(e) => handleChange('zip', e.target.value)}
                    error={state.errors.zip}
                    helperText={state.errors.zip ? 'Please enter the correct zip' : ''} />
                <TextField
                    label='Country'
                    sx={{ mb: 4 }}
                    value={state.country}
                    required
                    variant='filled'
                    fullWidth
                    onChange={(e) => handleChange('country', e.target.value)}
                    error={state.errors.country}
                    helperText={state.errors.country ? 'Please enter the correct country' : ''} />
                <TextField
                    label='Product Name'
                    sx={{ mb: 4 }}
                    value={state.productName}
                    required
                    variant='filled'
                    fullWidth
                    onChange={(e) => handleChange('productName', e.target.value)}
                    error={state.errors.productName}
                    helperText={state.errors.productName ? 'Please enter the correct product name' : ''} />
                <TextField
                    label='Product Type'
                    sx={{ mb: 4 }}
                    value={state.productType}
                    required
                    variant='filled'
                    fullWidth
                    onChange={(e) => handleChange('productType', e.target.value)}
                    error={state.errors.productType}
                    helperText={state.errors.productType ? 'Please enter the correct product type' : ''} />
                <TextField
                    label='Product Category'
                    sx={{ mb: 4 }}
                    value={state.productCategory}
                    required
                    variant='filled'
                    fullWidth
                    onChange={(e) => handleChange('productCategory', e.target.value)}
                    error={state.errors.productCategory}
                    helperText={state.errors.productCategory ? 'Please enter the correct product category' : ''} />
                <TextField
                    label='Product Brand'
                    sx={{ mb: 4 }}
                    value={state.productBrand}
                    required
                    variant='filled'
                    fullWidth
                    onChange={(e) => handleChange('productBrand', e.target.value)}
                    error={state.errors.productBrand}
                    helperText={state.errors.productBrand ? 'Please enter the correct product brand' : ''} />
                <TextField
                    label='Product Price'
                    sx={{ mb: 4 }}
                    value={state.productPrice}
                    required
                    variant='filled'
                    fullWidth
                    onChange={(e) => handleChange('productPrice', e.target.value)}
                    error={state.errors.productPrice}
                    helperText={state.errors.productPrice ? 'Please enter the correct product price' : ''} />
                <TextField
                    label='Product Model'
                    sx={{ mb: 4 }}
                    value={state.productModel}
                    required
                    variant='filled'
                    fullWidth
                    onChange={(e) => handleChange('productModel', e.target.value)}
                    error={state.errors.productModel}
                    helperText={state.errors.productModel ? 'Please enter the correct product model' : ''} />
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                        label='Product Purchase Date'
                        value={state.productPurchaseDate}
                        slotProps={{ 
                            textField: { 
                                variant: 'filled', 
                                fullWidth: true, 
                                required: true,
                                error: state.errors.productPurchaseDate,
                                helperText: state.errors.productPurchaseDate ? 'Please enter the correct product purchase date' : '' 
                            } }}
                        sx={{ mb: 4 }}
                        onChange={(newValue) => handleChange('productPurchaseDate', newValue)} />
                </LocalizationProvider>
                <div>
                    <Button 
                        onClick={handleUpdate} 
                        disabled={!isFormValid}
                        variant='contained'>Update</Button>
                </div>
            </Box>
        </React.Fragment>
    );
}

export default DataEditForm;
