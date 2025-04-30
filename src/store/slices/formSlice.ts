import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import dayjs from 'dayjs';

interface FormState {
    name: string;
    telephone: string;
    dateOfBirth: dayjs.Dayjs | null;
    email: string;
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
    productPurchaseDate: dayjs.Dayjs | null;
    errors: Record<string, boolean>;
}

const initialState: FormState = {
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
    },
};

const formSlice = createSlice({
    name: 'form',
    initialState,
    reducers: {
        setField(state, action: PayloadAction<{ field: keyof FormState; value: FormState[keyof FormState] }>) {
            (state[action.payload.field] as typeof action.payload.value) = action.payload.value;
        },
        setError(state, action: PayloadAction<{ field: string; value: boolean }>) {
            state.errors[action.payload.field] = action.payload.value;
        },
        resetForm() {
            return initialState;
        },
    },
});

export const { setField, setError, resetForm } = formSlice.actions;

export default formSlice.reducer;
