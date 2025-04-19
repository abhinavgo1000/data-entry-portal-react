import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import './DataAlertDialog.css';

interface DataAlertDialogProps {
    dialogOpen?: boolean;
    onDialogOpen?: (res: boolean) => void;
    onDialogRes?: (res: boolean) => void;
    dialogTitle?: string;
    dialogAgreeLabel?: string;
    dialogDisagreeLabel?: string;
    children: React.ReactNode;
}

function DataAlertDialog({dialogTitle, dialogOpen, onDialogOpen, onDialogRes, dialogAgreeLabel, dialogDisagreeLabel, children}: DataAlertDialogProps) {

    return (
        <React.Fragment>
            <Dialog
                open={dialogOpen ?? false}
                onClose={() => onDialogOpen && onDialogOpen(false)}
                aria-labelledby='alert-dialog-title'
                aria-describedby='alert-dialog-description'
            >
                <DialogTitle id='alert-dialog-title'>
                    {dialogTitle}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id='alert-dialog-description'>
                        {children}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => onDialogRes && onDialogRes(false)}>
                        {dialogDisagreeLabel}
                    </Button>
                    <Button onClick={() => onDialogRes && onDialogRes(true)} autoFocus>
                        {dialogAgreeLabel}
                    </Button>
                </DialogActions>
            </Dialog>
        </React.Fragment>
    );
}

export default DataAlertDialog;
