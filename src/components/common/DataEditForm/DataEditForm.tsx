import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import Button from '@mui/material/Button';
import Snackbar, { SnackbarCloseReason } from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import dayjs, { Dayjs } from 'dayjs';
import { useMutation } from '@tanstack/react-query';
import { useNavigate, useSearchParams } from 'react-router-dom';
import axios from 'axios'; 
import './DataEditForm.css';

function DataEditForm() {
    
    {/* Define the mutation for submitting the form data */}
    const [name, setName] = React.useState('');
    const [telephone, setTelephone] = React.useState('');
    const [dateOfBirth, setDateOfBirth] = React.useState<Dayjs | null>(dayjs(''));
    const [email, setEmail] = React.useState('');
    const [address, setAddress] = React.useState('');
    const [city, setCity] = React.useState('');
    const [state, setState] = React.useState('');
    const [zip, setZip] = React.useState('');
    const [country, setCountry] = React.useState('');
    const [productName, setProductName] = React.useState('');
    const [productType, setProductType] = React.useState('');
    const [productCategory, setProductCategory] = React.useState('');
    const [productBrand, setProductBrand] = React.useState('');
    const [productPrice, setProductPrice] = React.useState(0);
    const [productModel, setProductModel] = React.useState('');
    const [productPurchaseDate, setProductPurchaseDate] = React.useState<Dayjs | null>(dayjs(''));

    {/* Define the error states of form fields */}
    const [nameError, setNameError] = React.useState(false);
    const [telephoneError, setTelephoneError] = React.useState(false);
    const [emailError, setEmailError] = React.useState(false);
    const [dateOfBirthError, setDateOfBirthError] = React.useState(false);
    const [addressError, setAddressError] = React.useState(false);
    const [cityError, setCityError] = React.useState(false);
    const [stateError, setStateError] = React.useState(false);
    const [zipError, setZipError] = React.useState(false);
    const [countryError, setCountryError] = React.useState(false);
    const [productNameError, setProductNameError] = React.useState(false);
    const [productTypeError, setProductTypeError] = React.useState(false);
    const [productCategoryError, setProductCategoryError] = React.useState(false);
    const [productBrandError, setProductBrandError] = React.useState(false);
    const [productPriceError, setProductPriceError] = React.useState(false);
    const [productModelError, setProductModelError] = React.useState(false);
    const [productPurchaseDateError, setProductPurchaseDateError] = React.useState(false);

    const [formValid, setFormValid] = React.useState(false);

    const [snackbarOpen, setSnackbarOpen] = React.useState(false);

    const navigate = useNavigate();

    const [searchParams] = useSearchParams();
    const id = searchParams.get('id'); // Capture the ID from the URL query param

     // Fetch data by ID and populate the form fields
     React.useEffect(() => {
        if (id) {
            const fetchDataById = async () => {
                try {
                    const response = await axios.get(`http://localhost:5000/api/form/fetch-form-data/${id}`);
                    const data = response.data;

                    // Populate the form fields with the fetched data
                    setName(data.name);
                    setTelephone(data.telephone);
                    setDateOfBirth(data.dateOfBirth ? dayjs(data.dateOfBirth) : null);
                    setEmail(data.email);
                    setAddress(data.address);
                    setCity(data.city);
                    setState(data.state);
                    setZip(data.zip);
                    setCountry(data.country);
                    setProductName(data.productName);
                    setProductType(data.productType);
                    setProductCategory(data.productCategory);
                    setProductBrand(data.productBrand);
                    setProductPrice(data.productPrice);
                    setProductModel(data.productModel);
                    setProductPurchaseDate(data.productPurchaseDate ? dayjs(data.productPurchaseDate) : null);
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

    const resetForm = () => {
        setName('');
        setTelephone('');
        setDateOfBirth(dayjs(''));
        setEmail('');
        setAddress('');
        setCity('');
        setState('');
        setZip('');
        setCountry('');
        setProductName('');
        setProductType('');
        setProductCategory('');
        setProductBrand('');
        setProductPrice(0);
        setProductModel('');
        setProductPurchaseDate(dayjs(''));
        setFormValid(false); // Reset form validation
    };

    const handleUpdate = () => {
        const updatedData = {
            _id: id,
            name,
            email,
            telephone,
            dateOfBirth: dateOfBirth ? dateOfBirth.toDate() : null,
            address,
            city,
            state,
            zip,
            country,
            productName,
            productType,
            productCategory,
            productBrand,
            productPrice,
            productModel,
            productPurchaseDate : productPurchaseDate ? productPurchaseDate.toDate() : null
        };
        if (id) {
            mutation.mutate(updatedData);
        } else {
            console.error('Error: ID is null');
        }
        setSnackbarOpen(true);
        resetForm(); // Reset the form after submission
        navigate('/home'); // Redirect to the home page after submission
    };

    const handleSnackbarClose = (
        _event: React.SyntheticEvent | Event,
        reason?: SnackbarCloseReason,
    ) => {
        if (reason === 'clickaway') {
            return;
        }
        setSnackbarOpen(false);
    };

    const action = (
        <React.Fragment>
            <IconButton
                size="small"
                aria-label="close"
                color="inherit"
                onClick={handleSnackbarClose}
            >
                <CloseIcon fontSize="small" />
            </IconButton>
        </React.Fragment>
    );

    {/* Check if the form is valid */}
    const validateForm = React.useCallback(() => {
        const isValid =
            (name !== '') &&
            (telephone !== '') &&
            (email !== '') &&
            (dateOfBirth !== null) &&
            dateOfBirth.isValid() &&
            (address !== '') &&
            (city !== '') &&
            (state !== '') &&
            (zip !== '') &&
            (country !== '') &&
            (productName !== '') &&
            (productType !== '') &&
            (productCategory !== '') &&
            (productBrand !== '') &&
            (productPrice > 0) &&
            (productModel !== '') &&
            (productPurchaseDate !== null) &&
            productPurchaseDate.isValid();
        setFormValid(isValid);
    }, [
        name,
        telephone,
        email,
        dateOfBirth,
        address,
        city,
        state,
        zip,
        country,
        productName,
        productType,
        productCategory,
        productBrand,
        productPrice,
        productModel,
        productPurchaseDate
    ]);

    React.useEffect(() => {
        validateForm();
    }, [name, telephone, email, dateOfBirth, address, city, state, zip, country, productName, productType, productCategory, productBrand, productPrice, productModel, productPurchaseDate, validateForm]);

    {/* Define the change handlers for each input field */}

    const handleChangeName = (event: React.ChangeEvent<HTMLInputElement>) => {
        setName(event.target.value);
        if (event.target.validity.valid) {
            setNameError(false);
        } else {
            setNameError(true);
        }
        validateForm();
    };

    const handleChangeTelephone = (event: React.ChangeEvent<HTMLInputElement>) => {
        setTelephone(event.target.value);
        if (event.target.validity.valid) {
            setTelephoneError(false);
        } else {
            setTelephoneError(true);
        }
        validateForm();
    };

    const handleChangeEmail = (event: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(event.target.value);
        if (event.target.validity.valid) {
            setEmailError(false);
        } else {
            setEmailError(true);
        }
        validateForm();
    };

    const handleChangeDateOfBirth = (newValue: Dayjs | null) => {
        setDateOfBirth(newValue);
        if (newValue && newValue.isValid()) {
            setDateOfBirthError(false);
        } else {
            setDateOfBirthError(true);
        }
        validateForm();
    };

    const handleChangeAddress = (event: React.ChangeEvent<HTMLInputElement>) => {
        setAddress(event.target.value);
        if (event.target.validity.valid) {
            setAddressError(false);
        } else {
            setAddressError(true);
        }
        validateForm();
    };

    const handleChangeCity = (event: React.ChangeEvent<HTMLInputElement>) => {
        setCity(event.target.value);
        if (event.target.validity.valid) {
            setCityError(false);
        } else {
            setCityError(true);
        }
        validateForm();
    };

    const handleChangeState = (event: React.ChangeEvent<HTMLInputElement>) => {
        setState(event.target.value);
        if (event.target.validity.valid) {
            setStateError(false);
        } else {
            setStateError(true);
        }
        validateForm();
    };

    const handleChangeZip = (event: React.ChangeEvent<HTMLInputElement>) => {
        setZip(event.target.value);
        if (event.target.validity.valid) {
            setZipError(false);
        } else {
            setZipError(true);
        }
        validateForm();
    };

    const handleChangeCountry = (event: React.ChangeEvent<HTMLInputElement>) => {
        setCountry(event.target.value);
        if (event.target.validity.valid) {
            setCountryError(false);
        } else {
            setCountryError(true);
        }
        validateForm();
    };

    const handleChangeProductName = (event: React.ChangeEvent<HTMLInputElement>) => {
        setProductName(event.target.value);
        if (event.target.validity.valid) {
            setProductNameError(false);
        } else {
            setProductNameError(true);
        }
        validateForm();
    };

    const handleChangeProductType = (event: React.ChangeEvent<HTMLInputElement>) => {
        setProductType(event.target.value);
        if (event.target.validity.valid) {
            setProductTypeError(false);
        } else {
            setProductTypeError(true);
        }
        validateForm();
    };

    const handleChangeProductCategory = (event: React.ChangeEvent<HTMLInputElement>) => {
        setProductCategory(event.target.value);
        if (event.target.validity.valid) {
            setProductCategoryError(false);
        } else {
            setProductCategoryError(true);
        }
        validateForm();
    };

    const handleChangeProductBrand = (event: React.ChangeEvent<HTMLInputElement>) => {
        setProductBrand(event.target.value);
        if (event.target.validity.valid) {
            setProductBrandError(false);
        } else {
            setProductBrandError(true);
        }
        validateForm();
    };

    const handleChangeProductPrice = (event: React.ChangeEvent<HTMLInputElement>) => {
        setProductPrice(Number(event.target.value));
        if (event.target.validity.valid) {
            setProductPriceError(false);
        } else {
            setProductPriceError(true);
        }
        validateForm();
    };

    const handleChangeProductModel = (event: React.ChangeEvent<HTMLInputElement>) => {
        setProductModel(event.target.value);
        if (event.target.validity.valid) {
            setProductModelError(false);
        } else {
            setProductModelError(true);
        }
        validateForm();
    };

    const handleChangeProductPurchaseDate = (newValue: Dayjs | null) => {
        setProductPurchaseDate(newValue);
        if (newValue && newValue.isValid()) {
            setProductPurchaseDateError(false);
        } else {
            setProductPurchaseDateError(true);
        }
        validateForm();
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
                    value={name}
                    required
                    variant='filled'
                    fullWidth
                    onChange={handleChangeName}
                    error={nameError}
                    helperText={nameError ? 'Please enter the correct name' : ''} />
                <TextField
                    label='Telephone'
                    sx={{ mb: 4 }}
                    value={telephone}
                    required
                    variant='filled'
                    fullWidth
                    onChange={handleChangeTelephone}
                    error={telephoneError}
                    helperText={nameError ? 'Please enter the correct name' : ''} />
                <TextField
                    label='Email'
                    sx={{ mb: 4 }}
                    value={email}
                    required
                    variant='filled'
                    fullWidth
                    onChange={handleChangeEmail}
                    error={emailError}
                    helperText={emailError ? 'Please enter the correct email' : ''} />
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                        label='Date of Birth'
                        value={dateOfBirth}
                        slotProps={{ 
                            textField: { 
                                variant: 'filled', 
                                fullWidth: true, 
                                required: true,
                                error: dateOfBirthError,
                                helperText: dateOfBirthError ? 'Please enter the correct date of birth' : '' 
                            } }}
                        sx={{ mb: 4 }}
                        onChange={handleChangeDateOfBirth} />
                </LocalizationProvider>
                <TextField
                    label='Address'
                    sx={{ mb: 4 }}
                    value={address}
                    required
                    variant='filled'
                    fullWidth
                    onChange={handleChangeAddress}
                    error={addressError}
                    helperText={addressError ? 'Please enter the correct address' : ''} />
                <TextField
                    label='City'
                    sx={{ mb: 4 }}
                    value={city}
                    required
                    variant='filled'
                    fullWidth
                    onChange={handleChangeCity}
                    error={cityError}
                    helperText={cityError ? 'Please enter the correct city' : ''} />
                <TextField
                    label='State'
                    sx={{ mb: 4 }}
                    value={state}
                    required
                    variant='filled'
                    fullWidth
                    onChange={handleChangeState}
                    error={stateError}
                    helperText={stateError ? 'Please enter the correct state' : ''} />
                <TextField
                    label='Zip'
                    sx={{ mb: 4 }}
                    value={zip}
                    required
                    variant='filled'
                    fullWidth
                    onChange={handleChangeZip}
                    error={zipError}
                    helperText={zipError ? 'Please enter the correct zip' : ''} />
                <TextField
                    label='Country'
                    sx={{ mb: 4 }}
                    value={country}
                    required
                    variant='filled'
                    fullWidth
                    onChange={handleChangeCountry}
                    error={countryError}
                    helperText={countryError ? 'Please enter the correct country' : ''} />
                <TextField
                    label='Product Name'
                    sx={{ mb: 4 }}
                    value={productName}
                    required
                    variant='filled'
                    fullWidth
                    onChange={handleChangeProductName}
                    error={productNameError}
                    helperText={productNameError ? 'Please enter the correct product name' : ''} />
                <TextField
                    label='Product Type'
                    sx={{ mb: 4 }}
                    value={productType}
                    required
                    variant='filled'
                    fullWidth
                    onChange={handleChangeProductType}
                    error={productTypeError}
                    helperText={productTypeError ? 'Please enter the correct product type' : ''} />
                <TextField
                    label='Product Category'
                    sx={{ mb: 4 }}
                    value={productCategory}
                    required
                    variant='filled'
                    fullWidth
                    onChange={handleChangeProductCategory}
                    error={productCategoryError}
                    helperText={productCategoryError ? 'Please enter the correct product category' : ''} />
                <TextField
                    label='Product Brand'
                    sx={{ mb: 4 }}
                    value={productBrand}
                    required
                    variant='filled'
                    fullWidth
                    onChange={handleChangeProductBrand}
                    error={productBrandError}
                    helperText={productBrandError ? 'Please enter the correct product brand' : ''} />
                <TextField
                    label='Product Price'
                    sx={{ mb: 4 }}
                    value={productPrice}
                    required
                    variant='filled'
                    fullWidth
                    onChange={handleChangeProductPrice}
                    error={productPriceError}
                    helperText={productPriceError ? 'Please enter the correct product price' : ''} />
                <TextField
                    label='Product Model'
                    sx={{ mb: 4 }}
                    value={productModel}
                    required
                    variant='filled'
                    fullWidth
                    onChange={handleChangeProductModel}
                    error={productModelError}
                    helperText={productModelError ? 'Please enter the correct product model' : ''} />
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                        label='Product Purchase Date'
                        value={productPurchaseDate}
                        slotProps={{ 
                            textField: { 
                                variant: 'filled', 
                                fullWidth: true, 
                                required: true,
                                error: productPurchaseDateError,
                                helperText: productPurchaseDateError ? 'Please enter the correct product purchase date' : '' 
                            } }}
                        sx={{ mb: 4 }}
                        onChange={handleChangeProductPurchaseDate} />
                </LocalizationProvider>
                <div>
                    <Button 
                    onClick={handleUpdate} 
                    disabled={!formValid}
                    variant='contained'>Update</Button>
                </div>
                <Snackbar
                    open={snackbarOpen}
                    autoHideDuration={3000}
                    onClose={handleSnackbarClose}
                    message='Form updated successfully!'
                    action={action} />
            </Box>
        </React.Fragment>
    );
}

export default DataEditForm;
