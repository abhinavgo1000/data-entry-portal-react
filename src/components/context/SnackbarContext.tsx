import * as React from 'react';

type SnackbarContextType = {
    snackbarState: { open: boolean; message: string };
    showSnackbar: (message: string) => void;
    hideSnackbar: () => void;
};

const SnackbarContext = React.createContext<SnackbarContextType | undefined>(undefined);

export const SnackbarProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [snackbarState, setSnackbarState] = React.useState({ open: false, message: '' });

    const showSnackbar = (message: string) => {
        setSnackbarState({ open: true, message });
    };

    const hideSnackbar = () => {
        setSnackbarState({ open: false, message: '' });
    };

    return (
        <SnackbarContext.Provider value={{ snackbarState, showSnackbar, hideSnackbar }}>
            {children}
        </SnackbarContext.Provider>
    );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useSnackbar = (): SnackbarContextType => {
    const context = React.useContext(SnackbarContext);
    if (!context) {
        throw new Error('useSnackbar must be used within a SnackbarProvider');
    }
    return context;
};
