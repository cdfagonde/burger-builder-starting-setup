import React from 'react';
import flag from '../../../../../assets/images/bandeira-france.png';
import classes from './Bandeira.css';

const spain = (props) => (
    <div className={classes.Bandeira} style={{ height: props.height }} >
        <img src={flag} alt="Français" onClick={ (lang) => props.clicked(lang)} />
    </div>
);

export default spain;