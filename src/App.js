import React from 'react';
import Router from './Router';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';

const App = () => {
    return (
        <LocalizationProvider dateAdapter={AdapterDateFns}>
            <Router />
        </LocalizationProvider>
    )
}
export default App;