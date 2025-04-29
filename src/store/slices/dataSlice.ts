import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface DataState {
    page: number;
    limit: number;
    dialogOpen: boolean;
    selectedProductName: string;
    selectedEntryId: string | null;
}

const initialState: DataState = {
    page: 1,
    limit: 10,
    dialogOpen: false,
    selectedProductName: '',
    selectedEntryId: null,
};

const dataSlice = createSlice({
    name: 'data',
    initialState,
    reducers: {
        setPage(state, action: PayloadAction<number>) {
            state.page = action.payload;
        },
        setLimit(state, action: PayloadAction<number>) {
            state.limit = action.payload;
            state.page = 1; // Reset to the first page
        },
        openDialog(state, action: PayloadAction<{ productName: string; entryId: string }>) {
            state.dialogOpen = true;
            state.selectedProductName = action.payload.productName;
            state.selectedEntryId = action.payload.entryId;
        },
        closeDialog(state) {
            state.dialogOpen = false;
        },
        resetSelected(state) {
            state.selectedProductName = '';
            state.selectedEntryId = null;
        },
    },
});

export const { setPage, setLimit, openDialog, closeDialog, resetSelected } = dataSlice.actions;

export default dataSlice.reducer;