import React from 'react';
import Burger from '../../Burger/Burger';
import Button from '../../UI/Button/Button';

import classes from './CheckoutSummary.css';
import { getLanguage } from '../../../shared/utility';

const checkoutSummary = (props) => {
    //
    const language = getLanguage();
    const cancelText = {
        'EN': 'CANCEL',
        'ES': 'CANCELAR',
        'BR': 'CANCELAR',
        'FR': 'ANNULER',
        'IT': 'ANNULLA'
    }
    const continueText = {
        'EN': 'CONTINUE',
        'ES': 'CONTINUAR',
        'BR': 'CONTINUAR',
        'FR': 'CONTINUER',
        'IT': 'CONTINUA',
    }
    const titleText = {
        'EN': 'Hope it tastes well!',
        'ES': 'Esperamos que te guste!',
        'BR': 'Tomara que você goste!',
        'FR': "J'espère que tu aimes!",
        'IT': 'Spero vi piaccia!'
    }

    //
    return (
        <div className={classes.CheckoutSummary}>
            <h1> {titleText[language]} </h1>
            <div style={{width: '100%', margin: 'auto'}}>
                <Burger ingredients={props.ingredients} />
            </div>
            <Button 
                btnType="Danger" 
                clicked={props.checkoutCancelled} > {cancelText[language]} </Button>
            <Button 
                btnType="Success" 
                clicked={props.checkoutContinued} > {continueText[language]} </Button>
        </div>
    );
}

export default checkoutSummary;