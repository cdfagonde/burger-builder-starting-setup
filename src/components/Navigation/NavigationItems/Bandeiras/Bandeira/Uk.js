import React from 'react';
import flag from '../../../../../assets/images/bandeira-uk.png';
import classes from './Bandeira.css';

const uk = (props) => (
    <div className={classes.Bandeira} style={{ height: props.height }} >
        <img src={flag} alt="English" onClick={ (lang) => props.clicked(lang)} />
    </div>
);

export default uk;