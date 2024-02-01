import { useState } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';


const createPromise = () => {
    let resolver;
    return [ new Promise(( resolve ) => {
        resolver = resolve
    }), resolver]
}

const ConfirmDialog = () => {
    const [ open, setOpen ] = useState(false);
    const [ resolver, setResolver ] = useState({ resolver: null })
    const [ title, setTitle ] = useState('')
    const [ label, setLabel ] = useState('')

    const getConfirmation = async (titleText, text) => {
        setTitle(titleText);
        setLabel(text);
        setOpen(true);
        const [promise, resolve] = await createPromise()
        setResolver({ resolve })
        return promise;
    }

    const onClick = async (status) => {
        setOpen(false);
        resolver.resolve(status)
    }

    const Confirmation = () => (
        <Dialog
            open={open}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">
                {title}
            </DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    {label}
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={() => onClick(false)} autoFocus>Cancel</Button>
                <Button onClick={() => onClick(true)}>OK</Button>
            </DialogActions>
        </Dialog>
    )

    return [getConfirmation, Confirmation]


}

export default ConfirmDialog;