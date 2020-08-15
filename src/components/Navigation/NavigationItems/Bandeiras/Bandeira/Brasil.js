import React from 'react';
import flag from '../../../../../assets/images/bandeira-brasil.png';
import classes from './Bandeira.css';

const brasil = (props) => (
    <div className={classes.Bandeira} style={{ height: props.height }} >
        <img src={flag} alt="Português do Brasil" onClick={ (lang) => props.clicked(lang)} />
    </div>
);

export default brasil;