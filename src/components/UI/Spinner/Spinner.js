import React from 'react';
import classes from './Spinner.css';
import { getLanguage } from '../../../shared/utility';

const spinner = () => {
    const textMessages = {
        'EN': 'Loading...',
        'ES': 'Cargando...',
        'BR': 'Carregando...',
        'FR': 'Chargement...',
        'IT': 'Caricamento in corso...'
    }
    return <div className={classes.Loader}>{textMessages[getLanguage]}</div>;
};

export default spinner;