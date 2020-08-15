import React from 'react';
import classes from './BuildControl.css';
import { getLanguage } from '../../../../shared/utility';

const buildControl = (props) => {
    //
    const language = getLanguage();
    const lessText = {
        'EN': 'Less',
        'ES': 'Menos',
        'BR': 'Menos',
        'FR': 'Moins',
        'IT': 'Meno'
    }
    const moreText = {
        'EN': 'More',
        'ES': 'Más',
        'BR': 'Mais',
        'FR': 'Plus',
        'IT': 'Di Più'
    }
    //
    return (
        <div className={classes.BuildControl} >
            <div className={classes.Label}>{props.label}</div>
            <button
                className={classes.Less}
                onClick={props.removed}
                disabled={props.disabled} > {lessText[language]} </button>
            <button
                className={classes.More}
                onClick={props.added} > {moreText[language]} </button>
        </div>
    )
};

export default buildControl;